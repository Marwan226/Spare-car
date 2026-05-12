// backend/routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ============= Middleware: Verify JWT =============
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "غير مصرح - لا يوجد توكن",
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

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "توكن غير صالح",
    });
  }
};

// ============= Get User Profile =============
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// ============= Update User Profile =============
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const {
      displayName,
      firstName,
      lastName,
      phone,
      address,
      dateOfBirth,
      gender,
    } = req.body;

    const updateData = {};
    if (displayName) updateData.displayName = displayName;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (gender) updateData.gender = gender;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...updateData,
        profileCompleted: true,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      message: "تم تحديث الملف الشخصي بنجاح",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث الملف الشخصي",
      error: error.message,
    });
  }
});

// ============= Delete Account =============
router.delete("/account", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: "تم حذف الحساب بنجاح",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف الحساب",
    });
  }
});

// ============= Get All Users (Admin only - اختياري) =============
router.get("/all", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب المستخدمين",
    });
  }
});

module.exports = router;
