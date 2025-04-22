export const config = {
  api: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  nodeEnv: process.env.NODE_ENV,
  
  jwt: {
  access: {
    secret:process.env.JWT_ACCESS_SECRET,
    expiresIn:process.env.JWT_ACCESS_EXPIRES_IN,
  },
  refresh: {
    secret:process.env.JWT_REFRESH_SECRET,
    expiresIn:process.env.JWT_REFRESH_EXPIRES_IN,
  },
}
};
