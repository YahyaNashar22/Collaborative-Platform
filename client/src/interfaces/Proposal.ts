export interface Proposal {
  id: string;
  image: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  price: string;
  isConfirmed: boolean;
}

export interface proposalFormType {
  estimatedDeadline: string;
  amount: number;
  file: File;
  description: string;
}
