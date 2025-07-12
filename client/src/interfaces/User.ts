export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: "client" | "partner" | "admin";
}
