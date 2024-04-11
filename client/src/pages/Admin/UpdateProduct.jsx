import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";

import axios from "axios";
//import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
//const { Option } = Select;

const UpdateProduct = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

   //get single product
   const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/auth/product/get-product/${params.id}`
      );
      setName(data.product.name);

      setDescription(data.product.description);
      setPrice(data.product.price);
          } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);



 
  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo && productData.append("photo", photo);
            
      
      const { data } = axios.put(
        `/api/auth/product/update-product/${params.id}`,
        productData
      );
      if (data?.success) {
    alert(data?.message);
      } else {
        alert("Product Updated Successfully");
        navigate("/dashboard/admin/get-product");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };


    //delete a product
    const handleDelete = async () => {
        try {
          let answer = window.prompt("Are You Sure want to delete this product ? ");
          if (!answer) return;
          const { data } = await axios.delete(
            `/api/auth/product/delete-product/${params.id}`
          );
          alert("Product Deleted Succfully");
          navigate("/dashboard/admin/get-product");
        } catch (error) {
          console.log(error);
          alert("Something went wrong");
        }
      };



  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
             
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>

              <div className="mb-3">
                <button className="btn btn-danger"
                  onClick={handleDelete}
                >
                  DELETE PRODUCT
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;