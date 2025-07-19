type FormField = {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  hasCurrency?: boolean;
  errorMessage?: string;
};

export const FormData: FormField[] = [
  {
    label: "Request Title",
    type: "text",
    placeholder: "Request Title",
    name: "title",
    required: true,
    maxLength: 100,
    minLength: 3,
  },
  {
    label: "Service Name",
    type: "searchableSelect",
    placeholder: "Service Name",
    name: "serviceName",

    required: true,
    maxLength: 50,
    minLength: 0,
  },
  {
    label: "Description",
    type: "textarea",
    placeholder: "Description",
    name: "description",

    required: false,
    maxLength: 1000,
    minLength: 10,
  },
  {
    label: "Attach document",
    type: "file",
    placeholder: "Attach document",
    name: "document",
    required: false,
  },
  {
    label: "Deadline for receiving offers",
    type: "date",
    placeholder: "Deadline for receiving offers",
    name: "offerDeadline",

    required: true,
  },
  {
    label: "Deadline for the project",
    type: "date",
    placeholder: "Deadline for the project",
    name: "projectDeadline",

    required: true,
  },
  {
    label: "Est Budget",
    type: "string",
    placeholder: "Est Budget",
    name: "budget",

    required: true,
    maxLength: 20,
    minLength: 1,

    hasCurrency: true,
  },
];
