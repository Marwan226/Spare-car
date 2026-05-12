// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ============= Helper Function: Generate JWT =============
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ============= Google OAuth Routes =============
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/register?error=google_auth_failed`,
    session: false,
  }),
  async (req, res) => {
    try {
      console.log("✅ Google OAuth Success - User:", req.user.email);

      const token = generateToken(req.user);

      console.log("✅ Token generated:", token.substring(0, 20) + "...");

      // Redirect to frontend with token
      const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${token}&provider=google`;
      console.log("✅ Redirecting to:", redirectUrl);

      res.redirect(redirectUrl);
    } catch (error) {
      console.error("❌ OAuth callback error:", error);
      res.redirect(
        `${process.env.FRONTEND_URL}/register?error=token_generation_failed`
      );
    }
  }
);

// ============= Facebook OAuth Routes =============

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=fb_failed`,
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      // التوجيه لصفحة النجاح التي أكدت وجودها
      res.redirect(
        `${process.env.FRONTEND_URL}/auth/success?token=${token}&provider=facebook`
      );
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL}/login?error=token_error`);
    }
  }
);

router.get("/facebook/callback", (req, res, next) => {
  passport.authenticate("facebook", (err, user, info) => {
    if (err) {
      console.error("❌ Facebook OAuth Error:", err);
      return res.redirect(
        `${
          process.env.FRONTEND_URL
        }/login?error=facebook_auth_failed&message=${encodeURIComponent(
          err.message
        )}`
      );
    }

    if (!user) {
      console.error("❌ No user returned from Facebook");
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=facebook_auth_failed&message=no_user_returned`
      );
    }

    try {
      console.log("✅ Facebook OAuth Success - User:", user.email);
      const token = generateToken(user);
      console.log("✅ Token generated");

      res.redirect(
        `${process.env.FRONTEND_URL}/auth/success?token=${token}&provider=facebook`
      );
    } catch (error) {
      console.error("❌ Token generation error:", error);
      res.redirect(
        `${process.env.FRONTEND_URL}/login?error=token_generation_failed`
      );
    }
  })(req, res, next);
});

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.FRONTEND_URL}/register?error=facebook_auth_failed`,
    session: false,
  }),
  async (req, res) => {
    try {
      console.log("✅ Facebook OAuth Success - User:", req.user.email);

      const token = generateToken(req.user);

      console.log("✅ Token generated");

      res.redirect(
        `${process.env.FRONTEND_URL}/auth/success?token=${token}&provider=facebook`
      );
    } catch (error) {
      console.error("❌ Facebook OAuth callback error:", error);
      res.redirect(
        `${process.env.FRONTEND_URL}/register?error=token_generation_failed`
      );
    }
  }
);

// ============= Microsoft OAuth Routes =============
router.get(
  "/microsoft",
  passport.authenticate("microsoft", {
    prompt: "select_account",
  })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: `${process.env.FRONTEND_URL}/register?error=microsoft_auth_failed`,
    session: false,
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.redirect(
        `${process.env.FRONTEND_URL}/auth/success?token=${token}&provider=microsoft`
      );
    } catch (error) {
      res.redirect(
        `${process.env.FRONTEND_URL}/register?error=token_generation_failed`
      );
    }
  }
);

// ============= Traditional Register (Email/Password) =============
router.post("/register", async (req, res) => {
  try {
    const { email, password, displayName, firstName, lastName, phone } =
      req.body;

    // Validation
    if (!email || !password || !displayName) {
      return res.status(400).json({
        success: false,
        message: "الرجاء إدخال جميع الحقول المطلوبة",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "البريد الإلكتروني مستخدم بالفعل",
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      displayName,
      firstName,
      lastName,
      phone,
      provider: "local",
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "تم إنشاء الحساب بنجاح",
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إنشاء الحساب",
      error: error.message,
    });
  }
});

// ============= Traditional Login (Email/Password) =============
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "الرجاء إدخال البريد الإلكتروني وكلمة المرور",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    // Update last login
    await user.updateLastLogin();

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تسجيل الدخول",
      error: error.message,
    });
  }
});

// ============= Logout =============
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "حدث خطأ أثناء تسجيل الخروج",
      });
    }
    res.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح",
    });
  });
});

// ============= Verify Token =============
router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "لا يوجد توكن",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "توكن غير صالح",
    });
  }
});

module.exports = router;
