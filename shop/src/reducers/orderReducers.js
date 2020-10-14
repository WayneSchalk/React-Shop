export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "order_create_request":
      return { loading: false };
    case "order_create_success":
      return { loading: false, success: true, order: action.payload };
    case "order_create_fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case "order_details_request":
      return { ...state, loading: true };
    case "order_details_success":
      return { loading: false, order: action.payload };
    case "order_details_fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case "order_pay_request":
      return { loading: true };
    case "order_pay_success":
      return { loading: false, success: true };
    case "order_pay_fail":
      return { loading: false, error: action.payload };
    case "order_pay_reset":
      return {};
    default:
      return state;
  }
};
export const orderListMyreducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "order_list_my_request":
      return { loading: true };
    case "order_list_my_success":
      return { orders: action.payload, loading: false };
    case "order_list_my_fail":
      return { loading: false, error: action.payload };
    case "order_list_my_reset":
      return { orders: [] };

    default:
      return state;
  }
};
export const getOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "order_list_request":
      return { loading: true };
    case "order_list_success":
      return { orders: action.payload, loading: false };
    case "order_list_fail":
      return { loading: false, error: action.payload };
    case "order_list_reset":
      return { orders: [] };

    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case "order_deliver_request":
      return { loading: true };
    case "order_deliver_success":
      return { loading: false, success: true };
    case "order_deliver_fail":
      return { loading: false, error: action.payload };
    case "order_deliver_reset":
      return {};
    default:
      return state;
  }
};