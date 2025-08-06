// Main UserData interface
export interface UserData {
  role: "provider" | "company" | "individual" | string;
  _id: string;
  personalInformation?: PersonalInformation;
  companyInformation?: CompanyInformation;
  addressInformation?: AddressInformation;
  bankInformation?: BankInformation;
  requiredDocuments?: RequiredDocumentsData;
  email?: string;
  // add other top-level fields if any
}

// Nested data interfaces

export interface PersonalInformation {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture?: string | null;
  recoveryEmail?: string;
  job?: string;
}

export interface CompanyInformation {
  companyName?: string;
  companyDescription?: string;
  companyWebsite?: string;
  crNumber?: string;
  yearsExperience?: string | number;
  expertise?: string;
  industry?: string;
  services?: Service[];
}

export interface AddressInformation {
  country?: string;
  city?: string;
  street?: string;
  POBox?: string;
}

export interface BankInformation {
  bankName?: string;
  bankCountry?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  IBNNumber?: string;
  swiftBank?: string;
}

export interface RequiredDocumentsData {
  companyProfile: string;
  crDocument: string;
  establishmentContract: string;
  certificate: string;
  otherDocuments: string;
}

export interface Service {
  _id: string;
  value: string;
  label: string;
  name: string;
  // other service fields if any
}

// Props interfaces for each tab component

export interface PersonalDataTabProps {
  userData: PersonalInformation;
  onCancel: () => void;
  onSave: (data: any) => void;
  isViewer?: boolean;
}

export interface CompanyDataTabProps {
  userData: CompanyInformation;
  onCancel: () => void;
  onSave: (data: any) => void;
  isViewer?: boolean;
}

export interface OrganizationDataProps {
  userData: CompanyInformation;
  onCancel: () => void;
  onSave: (data: any) => void;
  isViewer?: boolean;
}

export interface AddressDataProps {
  userData: AddressInformation;
  onCancel: () => void;
  onSave: (data: any) => void;
  isViewer?: boolean;
}

export interface BankDataProps {
  userData: BankInformation;
  onCancel: () => void;
  onSave: (data: any) => void;
  isViewer?: boolean;
}

export interface RequiredDocuments {
  userData: RequiredDocumentsData;
  onCancel: () => void;
  onSave: (data: any) => void;
  isViewer?: boolean;
}

export interface SecurityDataProps {
  email?: string;
}
