const mongoSanitize = require("express-mongo-sanitize");

const setupNoSQLSecurity = (app) => {
  // 1. تنظيف تلقائي لمنع الـ Operator Injection ($ و .)
  app.use(
    mongoSanitize({
      replaceWith: "_",
    })
  );

  // 2. فلتر مخصص لمنع إرسال Objects بدل Strings (إجباري للحقول النصية)
  app.use((req, res, next) => {
    const isObject = (val) =>
      val != null && typeof val === "object" && !Array.isArray(val);

    const dataSources = [req.body, req.query, req.params];

    for (let source of dataSources) {
      if (source) {
        for (let key in source) {
          if (isObject(source[key])) {
            return res.status(400).json({
              status: "error",
              message: ` Forbidden: NoSQL Object Injection detected in [${key}]`,
            });
          }
        }
      }
    }
    next();
  });
};

module.exports = setupNoSQLSecurity;
