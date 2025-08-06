import { create } from "zustand";
import { registerFormData } from "../data/registerFormData";
// 🔷 Create the Zustand store
const useFormStore = create((set, get) => ({
    role: "",
    type: "",
    step: 0,
    roleFormData: {},
    setRole: (role) => set({ role }),
    setType: (type) => set({ type }),
    setStep: (step) => set({ step }),
    increaseStep: () => {
        const { role, type, step } = get();
        const currentTypeData = registerFormData.roles[role]?.types[type];
        if (!currentTypeData)
            return;
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
    updateFormPage: (role, type, data) => set((state) => ({
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
