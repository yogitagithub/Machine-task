import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateProduct from "./pages/Admin/CreateProduct";
import GetProduct from "./pages/Admin/GetProduct";
import ManageOrders from "./pages/Admin/ManageOrders";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <>
      <Routes>
       <Route path="/" element={<HomePage />} /> 
       <Route path="/cart" element={<CartPage />} /> 


         <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>

          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/get-product" element={<GetProduct />} />
          <Route path="admin/update-product/:id" element={<UpdateProduct />} /> 
          <Route path="admin/manage-orders" element={<ManageOrders />} />


        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />

              </Routes>
    </>
  );
}
export default App;