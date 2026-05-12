// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ============= Verify JWT Token =============
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "غير مصرح - لا يوجد توكن",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "الحساب غير نشط",
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "انتهت صلاحية الجلسة، الرجاء تسجيل الدخول مرة أخرى",
      });
    }

    res.status(401).json({
      success: false,
      message: "توكن غير صالح",
    });
  }
};

// ============= Optional Auth  =============
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (user && user.isActive) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // إذا فشل التحقق، نكمل بدون user
    next();
  }
};

// ============= Check Admin Role =============
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "غير مصرح",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "ليس لديك صلاحية للوصول",
    });
  }

  next();
};

module.exports = {
  verifyToken,
  optionalAuth,
  isAdmin,
};
