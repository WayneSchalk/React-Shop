export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: "" },
  action
) => {
  switch (action.type) {
    case "cart_add_item":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case "cart_remove_item":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case "cart_save_shipping_address":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "cart_save_payment_method_address":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
