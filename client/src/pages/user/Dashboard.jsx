import React, { useState, useEffect } from "react";
//import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../../context/cart";
//import { Link } from "react-router-dom";



const GetProduct = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/auth/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  
  return (
    <Layout>
      <div className="row">
        
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <div
                                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/auth/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">{p.price}</p>
                  </div>

                  <div className="mb-3">
                <button className="btn btn-primary"
                   onClick = {() => { 
                    setCart([...cart,p])
                    localStorage.setItem("cart",
                  JSON.stringify([...cart, p])
                );
alert('Item added to cart');
                  }}>
                
                ADD TO CART
                </button>
              </div>


                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </Layout>
  );
};

export default GetProduct;