
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Layout from "./components/Layout";
import Layoutver2 from "./components/Layout-ver2";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import PurchasePage from "./pages/PurchasePage";
import ForgotPassword from "./pages/ForgotPassword";
import LoginPage from "./pages/LoginPage";
import DashBoredPage from "./pages/DashBoredPage";
import ManageAccountsPage from "./pages/ManageAccountsPage";
import StaffUIPage from "./pages/StaffUIPage";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import AdminPanel from "./components/AdminPanel";
import HomePage from "./components/HomePage";
import ManageProductsPage from "./pages/ManageProductsPage";
import RiderPage from "./pages/RiderPage";
import ProtectedRoute from "./components/RouteProtect";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes - landing page (accessible to unauthenticated users and customers, blocked for admin, staff, rider) */}
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']} allowUnauthenticated={true}>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="products" 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']} allowUnauthenticated={true}>
                <ProductPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="about" 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']} allowUnauthenticated={true}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route 
            path="contacts" 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']} allowUnauthenticated={true}>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route 
            path="product-details" 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']} allowUnauthenticated={true}>
                <ProductDetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="cart" 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']} allowUnauthenticated={true}>
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']}>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="purchase" 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']} allowUnauthenticated={true}>
                <PurchasePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="forgot-password" 
            element={
              <ProtectedRoute blockRoles={['admin', 'staff', 'rider']} allowUnauthenticated={true}>
                <ForgotPassword />
              </ProtectedRoute>
            } 
          />  
        </Route>

        {/* Auth routes */}
        <Route path="login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route element={<Layoutver2/>}>
          {/* Admin routes */}
          <Route element={<AdminPanel/>}>
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashBoredPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="manage-accounts" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageAccountsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="manage-products" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageProductsPage />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Staff routes */}
          <Route 
            path="staff/order-management" 
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <StaffUIPage />
              </ProtectedRoute>
            } 
          />

          {/* Rider routes */}
          <Route 
            path="rider/order-management" 
            element={
              <ProtectedRoute allowedRoles={['rider']}>
                <RiderPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;