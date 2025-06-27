export interface FormField {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  type: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  errorMsg?: string;
}

export interface FormStepData {
  [stepIndex: number]: FormField[];
}

export interface TypeFormData {
  formTitle: string;
  steps: number;
  formData: FormStepData;
}

export interface RoleData {
  placeholder: string;
  types: {
    [typeName: string]: TypeFormData;
  };
}

export interface RegisterFormData {
  title: string;
  roles: {
    [roleName: string]: RoleData;
  };
}
