export interface RequestData {
  _id: string;
  title: string;
  description: string;
  budget: number;
  clientId: string;
  providerId: string[];
  serviceId: string;
  stage: number;
  status: string;
  document: string;
  offerDeadline: Date;
  projectDeadline: Date;
  createdAt: string;
  updatedAt: string;
  __v: number;
  client: Client[];
  provider: string[];
  providerIds: string[];
  serviceDetails: serviceDetails[];
  quotations: string[];
  approvedQuotations: string[];
  selectedQuotation: string;
}

export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: "client" | "provider" | "admin";
  job: string;
  profilePicture: string;
  banned: boolean;
}

export interface serviceDetails {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
