export default interface User {
  id?: number;
  fullname: string;
  username: string;
  email: string;
  password?: string;
}

export const createEmptyUserObject = (): User => {
  return { fullname: "", username: "", email: "", password: "" };
};

export const createEmptyUserObjectWithoutPassword = (): User => {
  return { fullname: "", username: "", email: "" };
};
