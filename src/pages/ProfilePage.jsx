import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, userRole, user } = useAuthStore(); // Add the state variables
  
  const handleLogout = () => {
    console.log('Before logout:', { isAuthenticated, userRole, user });
    logout();
    console.log('After logout:', useAuthStore.getState());
    navigate('/');
  };

  return (
    <main className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
      <div>
        <p>User: {user?.name}</p>
      </div>
    </main>
  );
};

export default ProfilePage;