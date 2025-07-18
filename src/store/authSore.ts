import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

type registerData = {
  email: string;
  provider?: string;
  displayName?: string;
  uid?: string;
  name?: string;
};

interface AuthStore {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  setAuthentication: (
    isAuthenticated: boolean,
    user: AuthStore["user"]
  ) => void;
  logout: () => void;
  login: () => void;
  register: (data: registerData) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuthentication: (isAuthenticated, user) => set({ isAuthenticated, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      login: () => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            set({
              isAuthenticated: true,
              user: {
                id: user.uid,
                email: user.email || "",
                name: user.displayName || "",
              },
            });
            console.log(user);
          } else {
            console.log("No user logged in");
          }
        });
      },
      register: async (data) => {
        try {
          const response = await axios.post("/api/createUser", data);
          if (response.status !== 201) {
            throw new Error("Registration failed");
          }
          set({
            isAuthenticated: true,
            user: response.data.user,
          });
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),
    {
      name: "auth-storage", // storage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
