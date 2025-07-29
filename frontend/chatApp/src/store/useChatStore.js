import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
  messages: [],
  users : [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({isUserLoading: true});
    try{
      const responce = await axiosInstance.get("/message/users");
      set({users: responce.data});
      // toast.success("Users loaded successfully");
    }catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    }finally{
      set({isUserLoading: false});
    }
  },

  getMessages: async (userId) => {
    set({isMessagesLoading: true});
    try{
      const response = await axiosInstance.get(`/message/${userId}`);
      set({messages: response.data});
      // toast.success("Messages loaded successfully");
    }catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    }finally{
      set({isMessagesLoading: false});
    }
  },
   sendMessage: async(messageData) => {
    const {selectedUser , messages} = get();
    try {
      const responce = await axiosInstance.post(`message/send/${selectedUser._id}`, messageData);
      set({messages: [...messages, responce.data]});
    }catch(error){
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  },

  subscribeToMessages: () => {
      const {selectedUser} = get();
      if(!selectedUser) return;
      const socket = useAuthStore.getState().socket;

      socket.on("newMessage", (newMessage) => {
        if(newMessage.senderId !== selectedUser._id) return;
        set({
          messages: [...get().messages, newMessage],
        });
      });

  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    
  },
  // there should be some changes leter
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  
}));