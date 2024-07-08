import verifyJWT from "../middleware/verifyJWT";
import {
  deleteUser,
  findUserById,
  updateUser,
} from "../repositories/userRepository";
import { RegisterData } from "../types/user";

const getUser = async (set: any, bearer: string, params: { id: string }) => {
  try {
    if (!verifyJWT(bearer)) {
      set.status = 403;
      return { error: "Forbidden" };
    }

    const user = await findUserById(params.id);
    if (!user) {
      set.status = 404;
      return { error: "User not found" };
    }
    return user;
  } catch (error) {
    set.status = 500;
    console.error(error);
    return error;
  }
};

const update = async (
  set: any,
  bearer: string,
  params: { id: string },
  body: RegisterData,
) => {
  try {
    if (!verifyJWT(bearer)) {
      set.status = 403;
      return { error: "Forbidden" };
    }

    const user = await findUserById(params.id);
    if (!user) {
      set.status = 404;
      return { error: "User not found" };
    }
    const updatedUser = await updateUser(params.id, body);
    return updatedUser;
  } catch (error) {
    set.status = 500;
    console.error(error);
    return error;
  }
};

const remove = async (set: any, bearer: string, params: { id: string }) => {
  try {
    if (!verifyJWT(bearer)) {
      set.status = 403;
      return { error: "Forbidden" };
    }

    const user = await findUserById(params.id);
    if (!user) {
      set.status = 404;
      return { error: "User not found" };
    }
    await deleteUser(params.id);
  } catch (error) {
    set.status = 500;
    console.error(error);
    return error;
  }
};

export { getUser, update, remove };
