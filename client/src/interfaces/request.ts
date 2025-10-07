export interface RequestDataType {
  title: string;
  serviceId: string;
  description: string;
  requestFiles: File[] | null;
  offerDeadline: string;
  projectDeadline: string;
  projectStartDate: string;
  budget: string;
  [key: string]: string | File[] | null;
}
