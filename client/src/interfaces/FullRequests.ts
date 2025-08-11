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
  interestedBy: string[];
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

export interface Stage {
  _id: string;
  name: string;
  description: string;
  start: string;
  isUploadedFiles: boolean;
  projectFiles: File | "";
  end: string;
  status: "not_started" | "in_progress" | "completed";
}

export interface Project {
  _id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  amount: number;
  isRequestedFiles: boolean;
  isUploadedFiles: boolean;
  assignedStage: boolean;
  title: string;
  description: string;
  status: "in_progress" | "completed" | "pending" | string;
  projectDeadline: Date;
  projectEstimatedDeadline: Date;
  stages: Stage[];
  timelines: string[];
  availableHours: string[];
  currentTimeLine: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
