import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userRepository from '../data/repositories/userRepository';

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'firstName',
      passwordField: 'password',
      passReqToCallback: true },
    async ({ body: { email } }, done) => {
      try {
        // eslint-disable-next-line no-console
        console.log(email);
        return await userRepository.getByEmail(email)
          ? done({ status: 401, message: 'Email is already taken.' }, null)
          : done(null, { email });
      } catch (err) {
        return done(err);
      }
    }
  )
);
