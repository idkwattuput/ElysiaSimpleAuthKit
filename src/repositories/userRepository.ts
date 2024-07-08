import { PrismaClient } from "@prisma/client";
import { RegisterData } from "../types/user";
const prisma = new PrismaClient();

const findUserByEmail = async (email: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: email },
  });
  return isUserExist;
};

const findUserById = async (id: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      full_name: true,
      email: true,
      created_at: true,
    },
  });
  return isUserExist;
};

const findUserByToken = async (token: string) => {
  const isUserExist = await prisma.user.findFirst({
    where: { refresh_token: token },
  });
  return isUserExist;
};

const saveUser = async (registerData: RegisterData) => {
  const newUser = await prisma.user.create({
    data: registerData,
    select: {
      id: true,
      full_name: true,
      email: true,
      created_at: true,
    },
  });
  return newUser;
};

const saveToken = async (id: string, token: string) => {
  await prisma.user.update({
    where: { id: id },
    data: {
      refresh_token: token,
    },
  });
};

const updateUser = async (id: string, updateData: RegisterData) => {
  const updateUser = await prisma.user.update({
    where: { id: id },
    data: updateData,
    select: {
      id: true,
      full_name: true,
      email: true,
      created_at: true,
    },
  });
  return updateUser;
};

const deleteUser = async (id: string) => {
  await prisma.user.delete({ where: { id: id } });
};

export {
  findUserByEmail,
  findUserById,
  findUserByToken,
  saveUser,
  saveToken,
  updateUser,
  deleteUser,
};
