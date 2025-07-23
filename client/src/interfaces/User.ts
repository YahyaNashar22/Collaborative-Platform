export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture: string;
  role: "client" | "provider" | "admin";
  banned: boolean;
  services: string[];
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  recoveryEmail: string;
  phone: string;
  job: string;
  profilePicture: string;
  accountType: string;
  role: string;
  availability: boolean;
  banned: boolean;
  services: {
    name: {
      type: string;
    };
    description: {
      type: string;
    };
    image: {
      type: string;
    };
  };
}
