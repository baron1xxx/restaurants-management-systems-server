import passport from 'passport';

export default passport.authenticate('google', { session: false });
