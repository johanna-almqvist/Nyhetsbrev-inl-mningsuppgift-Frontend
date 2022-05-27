import axios from "axios";
import { INewUser } from "../pages/Join";
import { ILoginUser } from "../pages/Start";
const baseUrl = "http://localhost:3010/api/";

export async function CreateUser(newUser: INewUser): Promise<any> {
  let response = await axios.post(`${baseUrl}users`, newUser);
  return response.data;
}
export interface ILoggedInUser {
  email: string;
  password: string;
  _id: string;
  subscribe: boolean;
}
export async function Login(login: ILoginUser): Promise<ILoggedInUser> {
  let response = await axios.post(`${baseUrl}users/login`, login);
  console.log("du är inloggad", response);
  return response.data;
}
export async function UpdateUser(login: ILoggedInUser): Promise<ILoggedInUser> {
  let response = await axios.put(`${baseUrl}users`, login);
  console.log("du är inloggad", response);
  return response.data;
}
