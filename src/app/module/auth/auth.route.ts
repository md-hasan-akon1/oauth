
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { USER_ROLE } from '../../utils/constant';
import auth from '../../middlewares/auth';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User2 } from './auth.model';
// 1. Use the GoogleStrategy with Passport for Google OAuth
passport.use(new GoogleStrategy({
  clientID: "", // Google Client ID from env
  clientSecret: "", // Google Client Secret from env
  callbackURL:""
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // 2. Check if the user already exists in the database
    let existingUser = await User2.findOne({ googleId: profile.id });
 
    if (existingUser) {
      // 3. If user exists, pass user to done() function
      return done(null, existingUser);
    }
console.log(profile);
    // 4. If user doesn't exist, create a new user in the database
    // const newUser = new User2({
    //   googleId: profile.id,
    //   email: profile.emails[0].value,
    //   name: profile.displayName,
    //   profilePic: profile.photos[0].value
    // });

    // 5. Save the new user to the database
    // await newUser.save();
    // return done(null, newUser);
  } catch (error) {
    // return done(error, null);
  }
}));

// 6. Serialize the user to store in the session
passport.serializeUser((user: any, done) => {
  done(null, user.id); // Store the user ID in the session
});

// 7. Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User2.findById(id); // Find the user by ID
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});



const router = express.Router();

router.post(
  '/login',
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  AuthControllers.refreshToken,
);

router.post(
  '/forget-password',

  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',

  AuthControllers.resetPassword,
);
router.get(
  '/google-login',
  passport.authenticate('google', {
    scope: ['profile', 'email'] // Request access to user's profile and email
  }),
  AuthControllers.googleOAuth,
);


// 2. Callback route where Google will redirect after login
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login', // Redirect to login on failure
  successRedirect: '/' // Redirect to homepage on success
}));

export const AuthRoutes = router;

