export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "product_list_request":
      return { loading: true, products: [] };
    case "product_list_success":
      return { loading: false, products: action.payload.data.products, pages : action.payload.data.pages ,page: action.payload.data.page };
    case "product_list_fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case "product_details_request":
      return { loading: true, ...state };
    case "product_details_success":
      return { loading: false, product: action.payload.data };
    case "product_details_fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "product_delete_request":
      return { loading: true, ...state };
    case "product_delete_success":
      return { loading: false, success: true };
    case "product_delete_fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "product_create_request":
      return { loading: true, ...state };
    case "product_create_success":
      return { loading: false, success: true, product: action.payload };
    case "product_create_fail":
      return { loading: false, error: action.payload };
    case "product_create_reset":
      return {};
    default:
      return state;
  }
};
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "product_update_request":
      return { loading: true, ...state };
    case "product_update_success":
      return { loading: false, success: true, product: action.payload };
    case "product_update_fail":
      return { loading: false, error: action.payload };
    case "product_update_reset":
      return { product: {} };
    default:
      return state;
  }
};
export const productReviewCreateReducer = (state = {  }, action) => {
  switch (action.type) {
    case "product_create_review_request":
      return { loading: true, ...state };
    case "product_create_review_success":
      return { loading: false, success: true,  };
    case "product_create_review_fail":
      return { loading: false, error: action.payload };
    case "product_create_review_reset":
      return { };
    default:
      return state;
  }
}
export const productTopRatedReducer = (state = { products: []}, action) => {
  switch (action.type) {
    case "product_top_rated_request":
      return { loading: true, products: [] };
    case "product_top_rated_success":
      return { loading: false, products : action.payload.data  };
    case "product_top_rated_fail":
      return { loading: false, error: action.payload };
    case "product_top_rated_reset":
      return { };
    default:
      return state;
  }
};
