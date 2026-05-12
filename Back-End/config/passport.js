// backend/config/passport.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  // ============= Serialize/Deserialize User =============
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // ============= Google Strategy =============
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "http://localhost:5000/api/auth/google/callback",
        scope: ["public_profile"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("🔍 Google Profile received:", {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
          });

          // Check if user exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            console.log("✅ Existing user found:", user.email);
            // Update last login
            await user.updateLastLogin();
            return done(null, user);
          }

          // Check if email exists with different provider
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            console.log("✅ Linking Google to existing user:", user.email);
            // Link Google account to existing user
            user.googleId = profile.id;
            user.photoURL = user.photoURL || profile.photos[0]?.value;
            await user.save();
            return done(null, user);
          }

          // Create new user
          console.log("🆕 Creating new user...");
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            photoURL: profile.photos[0]?.value,
            provider: "google",
            isEmailVerified: true,
            lastLogin: new Date(),
          });

          console.log("✅ User created successfully:", user.email);
          done(null, user);
        } catch (error) {
          console.error("❌ Google OAuth error:", error);
          done(error, null);
        }
      }
    )
  );

  // ============= Facebook Strategy =============
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    console.log("✅ Facebook OAuth is enabled");

    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL:
            process.env.FACEBOOK_CALLBACK_URL ||
            "http://localhost:5000/api/auth/facebook/callback",
          profileFields: ["id", "emails", "name", "displayName", "photos"],
          enableProof: true,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // محاولة الحصول على الإيميل أو استخدام ID الفيسبوك كبديل مؤقت
            const email =
              (profile.emails && profile.emails[0].value) ||
              `${profile.id}@facebook.com`;

            let user = await User.findOne({
              $or: [{ facebookId: profile.id }, { email: email }],
            });

            if (user) {
              user.facebookId = profile.id; // ربط الحساب إذا وجد بالإيميل
              await user.save();
              return done(null, user);
            }

            // إنشاء مستخدم جديد
            user = await User.create({
              facebookId: profile.id,
              email: email,
              displayName: profile.displayName || "Facebook User",
              provider: "facebook",
              isEmailVerified: true,
            });

            return done(null, user);
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );
  } else {
    console.log("⚠️ Facebook OAuth is NOT configured");
  }

  //*Extract all details from facebook user profile
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email =
        (profile.emails && profile.emails[0].value) ||
        `${profile.id}@facebook.com`;

      let user = await User.findOne({
        $or: [{ facebookId: profile.id }, { email: email }],
      });

      if (user) {
        // تحديث الصورة والاسم حتى لو المستخدم موجود
        user.photoURL = profile.photos?.[0]?.value || user.photoURL;
        user.displayName = profile.displayName || user.displayName;
        await user.save();
        return done(null, user);
      }

      user = await User.create({
        facebookId: profile.id,
        email: email,
        displayName: profile.displayName,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        photoURL: profile.photos?.[0]?.value,
        provider: "facebook",
        isEmailVerified: true,
      });

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  };

  // ============= Microsoft Strategy =============
  if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
    passport.use(
      new MicrosoftStrategy(
        {
          clientID: process.env.MICROSOFT_CLIENT_ID,
          clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
          callbackURL: process.env.MICROSOFT_CALLBACK_URL,
          scope: ["user.read"],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ microsoftId: profile.id });

            if (user) {
              await user.updateLastLogin();
              return done(null, user);
            }

            const email = profile.emails?.[0]?.value;
            if (email) {
              user = await User.findOne({ email });
              if (user) {
                user.microsoftId = profile.id;
                await user.save();
                return done(null, user);
              }
            }

            user = await User.create({
              microsoftId: profile.id,
              email: email || profile.emails?.[0]?.value,
              displayName: profile.displayName,
              firstName: profile.name?.givenName,
              lastName: profile.name?.familyName,
              provider: "microsoft",
              isEmailVerified: true,
              lastLogin: new Date(),
            });

            done(null, user);
          } catch (error) {
            done(error, null);
          }
        }
      )
    );
  }
};
