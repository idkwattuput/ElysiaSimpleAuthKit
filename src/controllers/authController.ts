import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginData, RegisterData } from "../types/user";
import {
  findUserByEmail,
  findUserByToken,
  saveToken,
  saveUser,
} from "../repositories/userRepository";

const login = async (set: any, body: LoginData) => {
  try {
    const isUserExist = await findUserByEmail(body.email);
    if (!isUserExist) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const isPasswordCorrect = bcrypt.compare(
      body.password,
      isUserExist.password,
    );
    if (!isPasswordCorrect) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const accessToken = jwt.sign(
      { full_name: isUserExist.full_name, email: isUserExist.email },
      Bun.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "30s" },
    );
    const refreshToken = jwt.sign(
      { full_name: isUserExist.full_name, email: isUserExist.email },
      Bun.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1d" },
    );

    await saveToken(isUserExist.id, refreshToken);
    set.headers["Set-Cookie"] =
      `refreshToken=${refreshToken};  httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000`;
    return { message: accessToken };
  } catch (error) {
    set.status = 500;
    console.error(error);
    return error;
  }
};

const register = async (set: any, body: RegisterData) => {
  try {
    const isUserExist = await findUserByEmail(body.email);
    if (isUserExist) {
      set.status = 400;
      return { error: "User already exist" };
    }

    body.password = await bcrypt.hash(body.password, 12);

    const newUser = await saveUser(body);
    set.status = 201;
    return { message: newUser };
  } catch (error) {
    set.status = 500;
    console.error(error);
    return error;
  }
};

const getAccessTokenByRefreshToken = async (set: any, cookies: any) => {
  try {
    console.log(cookies);
    if (!cookies.refreshToken) {
      set.status = 401;
      return { error: "Need to login back" };
    }

    const refreshToken = cookies.refreshToken.value;

    const isUserExist = await findUserByToken(refreshToken);
    if (!isUserExist) {
      set.status = 403;
      return { error: "Forbidden" };
    }

    jwt.verify(refreshToken, Bun.env.REFRESH_TOKEN_SECRET!);

    const accessToken = jwt.sign(
      { full_name: isUserExist.full_name, email: isUserExist.email },
      Bun.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "30s" },
    );
    return { message: accessToken };
  } catch (error) {
    set.status = 500;
    console.error(error);
    return error;
  }
};

export { login, register, getAccessTokenByRefreshToken };
