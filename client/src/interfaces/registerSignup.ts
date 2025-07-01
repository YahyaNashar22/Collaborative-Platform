export interface FormField {
  name: string;
  label: string;
  value: string | multiSelectType[];
  placeholder: string;
  type: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  errorMsg?: string;
  options?: { label: string; value: string; id?: string }[];
}

export interface FormStepData {
  formTitle: string;
  form: FormField[];
}

export interface TypeFormData {
  steps: number;
  formData: {
    [stepIndex: number]: FormStepData;
  };
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

export interface multiSelectType {
  id?: string;
  label: string;
  value: string;
}
