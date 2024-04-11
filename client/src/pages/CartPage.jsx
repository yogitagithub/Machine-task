import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const incrementQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: item.quantity + 1 } 
      : item
    );
    setCart(updatedCart);
    //localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const decrementQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    //localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = (total + item.price);
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };


  //remove item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
      <div className="container">
        <div className="row">
           <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">


              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/auth/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">

                  <h2>{p.name}</h2>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>

                  <div>
        
                Quantity: 
                {/* {p.quantity} */}
            
                <button
                  className="btn btn-sm btn-secondary mx-1"
                   onClick={() => incrementQuantity(p._id)}
                >
                  +
                </button>
                
                <button
                  className="btn btn-sm btn-secondary mx-1"
                  onClick={() => decrementQuantity(p._id)}
                >
                  -
                </button>
              </div>

                  <button
                    className="btn btn-danger"
                     onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}


          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} 
                 </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                     onClick={() => navigate("/dashboard/user")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                     onClick={() => navigate("/dashboard/user")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
          </div> 


        
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;