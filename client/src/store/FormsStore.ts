import { create } from "zustand";
import { registerFormData } from "../data/registerFormData";
import { multiSelectType } from "../interfaces/registerSignup";

// 🔷 Define the structure of your form data
export interface RoleFormData {
  [role: string]: {
    [type: string]: {
      [field: string]: string | multiSelectType[];
    };
  };
}

// 🔷 State interface
interface FormState {
  role: string;
  type: string;
  step: number;
  roleFormData: RoleFormData;
}

// 🔷 Actions interface
interface FormActions {
  setRole: (role: string) => void;
  setType: (type: string) => void;
  updateFieldValue: (
    role: string,
    type: string,
    fieldName: string,
    value: string | multiSelectType[]
  ) => void;

  updateFormPage: (
    role: string,
    type: string,
    data: Record<string, string>
  ) => void;

  getFormValues: (
    role: string,
    type: string
  ) => Record<string, string | multiSelectType[]>;
  resetForm: (role: string, type: string) => void;
  setStep: (step: number) => void;
  increaseStep: () => void;
  decreaseStep: () => void;
  getStep: () => number;
}

// 🔷 Create the Zustand store
const useFormStore = create<FormState & FormActions>((set, get) => ({
  role: "",
  type: "",
  step: 1,
  roleFormData: {},

  setRole: (role) => set({ role }),
  setType: (type) => set({ type }),

  setStep: (step) => set({ step }),
  increaseStep: () => {
    const { role, type, step } = get();
    console.log(role, type, step);
    const currentTypeData = registerFormData.roles[role]?.types[type];
    console.log("moving...", currentTypeData);

    if (!currentTypeData) return;

    const maxStep = currentTypeData.steps;
    if (step < maxStep - 1) {
      set({ step: step + 1 });
    }
  },

  isLastStep: () => {
    const { role, type, step } = get();
    const currentTypeData = registerFormData.roles[role]?.types[type];
    return step === currentTypeData?.steps - 1;
  },

  decreaseStep: () => set((state) => ({ step: Math.max(state.step - 1, 0) })),
  getStep: () => get().step,

  updateFieldValue: (role, type, fieldName, value) => {
    set((state) => ({
      roleFormData: {
        ...state.roleFormData,
        [role]: {
          ...(state.roleFormData[role] || {}),
          [type]: {
            ...(state.roleFormData[role]?.[type] || {}),
            [fieldName]: value,
          },
        },
      },
    }));
  },

  updateFormPage: (role, type, data) =>
    set((state) => ({
      roleFormData: {
        ...state.roleFormData,
        [role]: {
          ...(state.roleFormData[role] || {}),
          [type]: {
            ...(state.roleFormData[role]?.[type] || {}),
            ...data,
          },
        },
      },
    })),

  getFormValues: (role, type) => {
    return get().roleFormData?.[role]?.[type] || {};
  },

  resetForm: (role, type) => {
    set({ step: 0 });
    set((state) => ({
      roleFormData: {
        ...state.roleFormData,
        [role]: {
          ...(state.roleFormData[role] || {}),
          [type]: {},
        },
      },
    }));
  },
}));

export default useFormStore;
