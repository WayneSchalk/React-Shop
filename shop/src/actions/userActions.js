import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "user_login_request",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: "user_login_success",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "user_login_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "user_logout" });
  dispatch({ type: "order_list_my_reset" });
  dispatch({ type: "user_details_reset" });
  dispatch({ type: "user_list_reset" });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "user_register_request",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: "user_register_success",
      payload: data,
    });

    dispatch({
      type: "user_login_success",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "user_register_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "user_details_request",
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

    const { data } = await axios.get(
      `/api/users/${id}`,

      config
    );

    dispatch({
      type: "user_details_success",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "user_details_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "user_update_profile_request",
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

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: "user_update_profile_success",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "user_update_profile_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const ListUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "user_list_request",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: "user_list_success",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "user_list_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "user_delete_request",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: "user_delete_success",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "user_delete_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "user_update_request",
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

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: "user_update_success",
      payload: data,
    });

    dispatch({
      type: "user_details_success",
    });
  } catch (error) {
    dispatch({
      type: "user_update_fail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
