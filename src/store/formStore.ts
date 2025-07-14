import { TemplateType } from "@/constants/formTemplates";
import { create } from "zustand";

interface FormStore {
  currTemplate: TemplateType | null;
  setCurrTemplate: (template: TemplateType | null) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  currTemplate: null,
  setCurrTemplate: (template) => set({ currTemplate: template }),
}));
