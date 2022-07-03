export default interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export const createEmptyUserObject = (): User => {
  return { fullname: "", username: "", email: "", password: "" };
};
