"use client";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuthStore } from "@/store/authSore";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function LoginPage() {
  useEffect(() => {
    const user = useAuthStore.getState().user;
    if (user) {
      console.log("User is already logged in:", user);
    } else {
      console.log("No user is logged in");
    }
  }, []);

  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      useAuthStore.getState().register({
        provider: "google",
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
      });

      console.log("Signed in:", user.uid, user.displayName, user.email);


      // Optional: send user info to backend here
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>

      <button className="bg-red-500 text-white px-4 py-2 rounded ml-4" onClick={() => router.push("http://localhost:3000/dashboard/editForm/68781e325c58de27ae059960")}>
        redirect
      </button>
    </div>
  );
}
export default LoginPage;
