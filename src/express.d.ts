import { User } from "./model/user.m";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
