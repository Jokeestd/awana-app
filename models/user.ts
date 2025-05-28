import { Club } from "./enums/club.enum";
import { UserRole } from "./enums/user-role.enum";

export interface User {
  name: string;
  club: Club;
  role: UserRole;
}