import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>

      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          
                    <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action">
          
            Create Product
          </NavLink>

          <NavLink
            to="/dashboard/admin/get-product"
            className="list-group-item list-group-item-action">
          
            Products
          </NavLink>

          <NavLink
            to="/dashboard/admin/manage-orders"
            className="list-group-item list-group-item-action">
          
            Manage Orders
          </NavLink>
          
        </div>
      </div>

    </>
  );
};

export default AdminMenu;