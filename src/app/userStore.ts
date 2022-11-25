import create from "zustand";
import { devtools } from "zustand/middleware";

const userStore = (set: any) => ({
  users: [],
  addUser: (user: any) => {
    set((state: any) => ({
      users: [user, ...state.users],
    }));
  },
  editUser: (user: any) => {
    set((state: any) => ({
      users: state.users.map((u: any) => (u.id === user.id ? user : u)),
    }));
  },
  removeUser: (id: any) => {
    set((state: any) => ({
      users: state.users.filter((user: any) => user.id !== id),
    }));
  },
});

const useUserStore = create(devtools(userStore));

export default useUserStore;
