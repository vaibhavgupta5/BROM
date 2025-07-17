import { TemplateType } from "@/constants/formTemplates";
import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authSore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface FormStore {
  currTemplate: TemplateType | null;
  setCurrTemplate: (template: TemplateType | null) => void;
  getFormById: (formId: string) => Promise<TemplateType | null | undefined>;
  createForm: (data: TemplateType) => Promise<TemplateType | null | undefined>;
  saveTemplate: (template: TemplateType) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const getFirebaseUserId = async (): Promise<string | null | undefined> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user ? user.uid : null);
    });
  });
};

export const useFormStore = create<FormStore>((set) => ({
  currTemplate: null,

  setCurrTemplate: (template) => set({ currTemplate: template }),

  getFormById: async (formId) => {
    if (!formId) return null;

    try {
      let userId = useAuthStore.getState().user?.id;

      if (!userId) {
        const firebaseUserId = await getFirebaseUserId();
        userId = firebaseUserId === null ? undefined : firebaseUserId;
      }

      if (!userId) {
        console.error("No user is logged in");
        return null;
      }

      const response = await axios.post("/api/getTemplate", {
        formId,
        userId,
      });

      const template: TemplateType = response.data;
      set({ currTemplate: template });
      return template;

    } catch (error) {
      console.error("Error fetching form:", error);
      return null;
    }
  },
  createForm: async (data) => {
    if (!data || !data.title || !data.fields || data.fields.length === 0) {
      console.error("Invalid form data");
      return null;
    }

    try {
      let userId = useAuthStore.getState().user?.id;

      if (!userId) {
        const firebaseUserId = await getFirebaseUserId();
        userId = firebaseUserId === null ? undefined : firebaseUserId;
      }

      if (!userId) {
        console.error("No user is logged in");
        return null;
      }

      const response = await axios.post("/api/createTemplate", {
        ...data,
        userId,
      });

      const newTemplate: TemplateType = response.data;
      set({ currTemplate: newTemplate });
      return newTemplate;

    } catch (error) {
      console.error("Error creating form:", error);
      return null;
    }
  },
  saveTemplate: async (template) => {
    if (!template || !template.title || !template.fields || template.fields.length === 0 || !template.id) {
      console.error("Invalid template data");
      return;
    }

    try {
      set({ isLoading: true });
      const response = await axios.patch("/api/updateTemplate", template);
      set({ currTemplate: response.data });
      set({ isLoading: false });
    } catch (error) {
      console.error("Error saving template:", error);
    }
  },
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
