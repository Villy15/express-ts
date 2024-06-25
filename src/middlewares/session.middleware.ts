import session from 'express-session';

const sessionConfig = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
  name: 'itsecwb-session', // This will be unique per-host.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for production, 'lax' for other environments
    httpOnly: false,
  },
});

export default sessionConfig;
