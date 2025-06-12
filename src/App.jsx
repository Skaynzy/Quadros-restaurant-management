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

const App = () => {
  return (
    <Router>
      <Routes>
        
        
        {/* landing page */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="about" element={<About/>}/>
          <Route path="contacts" element={<Contacts/>}/>
          <Route path="product-details" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />  
        </Route>
          {/* admin routes */}
        <Route element= {<Layoutver2/>}>
          <Route element= {<AdminPanel/>}>
            <Route path="dashboard" element={<DashBoredPage />} />
            <Route path="manage-accounts" element={<ManageAccountsPage />} />
            <Route path="manage-products" element={<ManageProductsPage />} />
          </Route>
        {/* staff routes*/}
          <Route path="staff/order-management" element={<StaffUIPage />} />
          <Route path="rider/order-management" element={<RiderPage/>}/>
        {/* login route*/}
        
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
