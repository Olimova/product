import jwt from "jsonwebtoken";
import { config } from "./src/config/index";

// Access token yaratish funksiyasi
const jwtAccessTokenGenerator = (payload) => {
  return jwt.sign(payload, config.jwt.access.secret, {
    expiresIn: config.jwt.access.expiresIn,
  });
};

// Refresh token yaratish funksiyasi
const jwtRefreshTokenGenerator = (payload) => {
  return jwt.sign(payload, config.jwt.refresh.secret, {
    expiresIn: config.jwt.refresh.expiresIn,
  });
};

// Access tokenni tekshirish funksiyasi
const jwtAccessTokenVerify = (refreshToken) => {
  return jwt.verify(refreshToken, config.jwt.access.secret);
};

// Refresh tokenni tekshirish funksiyasi
const jwtRefreshTokenVerify = (refreshToken) => {
  return jwt.verify(refreshToken, config.jwt.refresh.secret);
};
const payload = {
    userId:22342,
    userType:1,
    roleId:1,
    roleType:2,
    staffId:623,
    isSuperadmin:true,
    login:"Xamidullo",
}

const accessToken=jwtAccessTokenGenerator(payload)

console.log(accessToken);
