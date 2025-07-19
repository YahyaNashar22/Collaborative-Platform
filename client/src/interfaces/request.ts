export interface RequestDataType {
  title: string;
  serviceId: string;
  description: string;
  document: File | null;
  offerDeadline: string;
  projectDeadline: string;
  budget: string;
  [key: string]: string | File | null;
}
