import axios from "axios";

export const listProducts = (keyword = "", pageNumber = "") => async (dispatch) => {
  try {
    dispatch({ type: "product_list_request" });
    const data = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
    dispatch({ type: "product_list_success", payload: data });
  } catch (error) {
    dispatch({
      type: "product_list_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "product_details_request" });
    const data = await axios.get(`/api/products/${id}`);
    dispatch({ type: "product_details_success", payload: data });
  } catch (error) {
    dispatch({
      type: "product_details_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "product_delete_request",
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: "product_delete_success",
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "product_delete_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "product_create_request",
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, {}, config);

    dispatch({
      type: "product_create_success",
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "product_create_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "product_update_request",
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: "product_update_success",
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "product_update_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "product_create_review_request",
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      config
    );

    dispatch({
      type: "product_create_review_success",
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "product_create_review_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "product_top_rated_request" });
    const data = await axios.get('/api/products/top');
    dispatch({ type: "product_top_rated_success", payload: data });
  } catch (error) {
    dispatch({
      type: "product_top_rated_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
         }
};