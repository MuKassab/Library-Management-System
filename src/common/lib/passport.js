import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import passport from 'passport';
import { config } from '../config/env-variables.js';
import Users from '../../users/model/index.js';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

export const setupPassport = () => {
  passport.use(new JWTStrategy(jwtOptions, async (payload, done) => {
    const user = await Users.findByPk(payload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  }));
};
