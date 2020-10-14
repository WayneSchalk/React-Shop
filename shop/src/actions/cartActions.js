import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const data = await axios.get(`/api/products/${id}`);

  dispatch({
    type: "cart_add_item",
    payload: {
      product: data.data._id,
      name: data.data.name,
      image: data.data.image,
      price: data.data.price,
      countInStock: data.data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const RemoveFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: "cart_remove_item", payload: id });

  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: "cart_save_shipping_address", payload: data });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: "cart_save_payment_method_address", payload: data });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
