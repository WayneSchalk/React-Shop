export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "user_login_request":
      return { loading: true };
    case "user_login_success":
      return { loading: false, userInfo: action.payload };
    case "user_login_fail":
      return { loading: false, error: action.payload };
    case "user_logout":
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "user_register_request":
      return { loading: true };
    case "user_register_success":
      return { loading: false, userInfo: action.payload.data, success: true };
    case "user_register_fail":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const userDetailsReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case "user_details_request":
      return { ...state, loading: true };
    case "user_details_success":
      return { loading: false, user: action.payload };
    case "user_details_fail":
      return { loading: false, error: action.payload };
    case "user_details_reset":
      return { user: [] };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "user_update_profile_request":
      return { loading: true };
    case "user_update_profile_success":
      return { loading: false, success: true, userInfo: action.payload };
    case "user_update_profile_fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "user_list_request":
      return { loading: true };
    case "user_list_success":
      return { loading: false, users: action.payload };
    case "user_list_fail":
      return { loading: false, error: action.payload };
    case "user_list_reset":
      return { users: [] };

    default:
      return state;
  }
};
export const userDeleteReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case "user_delete_request":
      return { loading: true };
    case "user_delete_success":
      return { loading: false, success: true };
    case "user_delete_fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userUpdateReducer = (
  state = { user: {}, success: false },
  action
) => {
  switch (action.type) {
    case "user_update_request":
      return { success: false, loading: true };
    case "user_update_success":
      return { success: true, loading: false };
    case "user_update_fail":
      return { loading: false, error: action.payload };
    case "user_update_reset":
      return { user: {} };
    default:
      return state;
  }
};
