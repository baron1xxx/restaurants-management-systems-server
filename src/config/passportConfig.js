import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import env from '../env';
import credentialRepository from '../data/repositories/credentialRepository';

passport.use('google',
  new GoogleStrategy(
    {
      clientID: env.app.auth.google.clientId,
      clientSecret: env.app.auth.google.clientSecret,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const {
        name: { givenName: firstName, familyName: lastName },
        photos: [{ value: imageUrl }],
        emails: [{ value: email }],
        id: password } = profile;

      const credential = await credentialRepository.getByEmail(email);
      if (credential) return done(null, credential.user);

      return done(null, { firstName, lastName, email, password, imageUrl });
    }
  ));
