import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      userRole: null,

      login: (role, userData = null) => set({ 
        isAuthenticated: true, 
        userRole: role,
        user: userData || { 
          name: role === 'admin' ? 'Admin User' : 
                role === 'staff' ? 'Staff User' : 
                role === 'rider' ? 'Rider User' : 'Regular User',
          email: `${role}@quadros.com` 
        }
      }),
      
      logout: () => set({ 
        isAuthenticated: false, 
        userRole: null, 
        user: null 
      }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;