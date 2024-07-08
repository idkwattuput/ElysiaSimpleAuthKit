import jwt from "jsonwebtoken";

const verifyJWT = (bearer: string) => {
  console.log("middleware called");
  try {
    const token = bearer.split(" ")[1];
    return jwt.verify(token, Bun.env.ACCESS_TOKEN_SECRET!);
  } catch (error) {
    return false;
  }
};

export default verifyJWT;
