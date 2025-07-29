import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =  import.meta.env.MODE === "development" ?"http://localhost:5001":"/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const responce = await axiosInstance.get("/auth/check");
      set({ authUser: responce.data });

      get().connectSocket();
    } catch (err) {
      console.error("Error checking authentication:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const responce = await axiosInstance.post("/auth/signup", data);
      set({ authUser: responce.data });
      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating account");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
      get().disconnectSocket();
    } catch (err) {
      console.error("Error logging out:", err);
      toast.error(err.response?.data?.message || "Error logging out");
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const responce = await axiosInstance.post("/auth/login", data);
      set({ authUser: responce.data });
      toast.success("Logged in successfully!");
      get().connectSocket();
    } catch (err) {
      console.error("Error logging in:", err);
      toast.error(err.response?.data?.message || "Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const responce = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: responce.data });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.response?.data?.message || "Error updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    console.log("connectSocket function called");
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL , {
      query: {
        userId : authUser._id,
      }
    });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("Received online users:", userIds);
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
