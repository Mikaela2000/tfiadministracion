import axios from "axios";
import { 
  REGISTER,
  POST_NEW_CLIENT,
  GET_ALL_CLIENTS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  DELETE_CLIENT,
  POST_NEW_INTERACTION,
  GET_ALL_INTERACTIONS,
  UPDATE_INTERACTION,
  UPDATE_CLIENT,
  DELETE_INTERACTION,
  POST_NEW_COMPRA,
  GET_ALL_COMPRAS,
  POST_NEW_CUENTACORRIENTE,
  GET_ALL_CUENTASCORRIENTES,
  CLEAR_INTERACTIONS,
  ENABLED_USER,
  GET_ALL_USERS,
  GET_USER,
  ROLE_USER,
  GET_CLIENT,
  UPDATE_USER,
  CLEAR_CLIENTS,
  APPLY_FILTERS,
  POST_NEW_REPORTE,
  GET_ALL_REPORTES,
  ESTADO_REPORTE

} from "./actionTypes";


const url = `http://localhost:3001`; //URL GENERAL


export function createReporte(values,userId ) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/employee/reporte/${userId}`, values);
      return dispatch({
        type: POST_NEW_REPORTE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function getAllReportes() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/employee/reporte`); 
      return dispatch({
        type: GET_ALL_REPORTES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const changeEstadoReporte = (reporteId,userId, estado) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/employee/reporte/${reporteId}/${userId}`, { estado });

      return dispatch({
        type: ESTADO_REPORTE,
        payload: { reporteId, userId, estado }, 
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function applyFilters(FilterByClient, FilterByClientDni) {
  return {
      type: APPLY_FILTERS,
      payload: {
          FilterByClient,  
          FilterByClientDni,  
      },
  };
}



export function register(userData) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/admin/registers`, userData);
      console.log("action", userData);
     
      dispatch({
        type: REGISTER,
        payload: res.data,
      });

      return Promise.resolve(res.data); // Return a resolved promise with the response data
    } catch (error) {
      console.log(error.message);
      return Promise.reject(error); // Return a rejected promise with the error
    }
  };
}


export function getAllUsers() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/admin/users`); 
      console.log(res)
      return dispatch({
        type: GET_ALL_USERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllClients() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/employee/client`); 
      return dispatch({
        type: GET_ALL_CLIENTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function newPostClient(id,values) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/employee/client/${id}`, values);
      console.log("datos clientes", values)
      return dispatch({
        type: POST_NEW_CLIENT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

//Cambia el estado del usuario del campo enabled, para habilitarlo o deshabilitarlo
export const changeEnabledUser = (id, enabled) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/admin/user/enabled/${id}`, { enabled });

      return dispatch({
        type: ENABLED_USER,
        payload: { id, enabled },  // Se debe pasar el ID y el nuevo estado 'enabled'
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeRoleUser = (id, role) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/admin/user/role/${id}`, { role });

      return dispatch({
        type: ROLE_USER,
        payload: { id, role }, 
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUser = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/employee/info/${id}`); //get User

      return dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getClient = (name) => {
  return async function (dispatch) {
    try {
      // Cambia la URL para utilizar el nombre en lugar del ID
      const res = await axios.get(`${url}/employee/client/info/${name}`);
      console.log("traigo estos datos", res.data)

      return dispatch({
        type: GET_CLIENT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};




export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${url}/public/login`, { email, password });
      const { user, token } = res.data; // Desestructura el usuario y el token de la respuesta
      console.log("soy el usuario", res.data);

      // Verificar si el backend indicó que el usuario está bloqueado


      // Guarda el token y el id del usuario en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id); // Guarda el id del usuario

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, userId: user.id },
      });
    } catch (error) {

      dispatch({
        type: LOGIN_FAIL,
        payload: error.response ? error.response.data.error : error.error, // Manejo de errores del backend
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
      localStorage.removeItem("token"); // Elimina el token del almacenamiento local
      localStorage.removeItem("userId"); // Si guardas userId, también elimínalo
      dispatch({ type: "LOGOUT" }); // Despacha una acción de cierre de sesión
  };
};

export function deleteClient(id) {
  return async function (dispatch) {
      try {

          const res = await axios.delete(`${url}/employee/client/${id}`);
         console.log(res)
 
          return dispatch({
              type: DELETE_CLIENT,
              payload: res.data, 
          });
      } catch (error) {
          console.error(error.message);
      }
  };
}

export function createInteraction(userId, clientId, values) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/employee/interaction/${userId}/${clientId}`, values);
      return dispatch({
        type: POST_NEW_INTERACTION,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function updateInteraction( interactionId, userId, values) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/employee/interaction/${interactionId}/${userId}`, values);
      return dispatch({
        type: UPDATE_INTERACTION,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function updateClient( clientnId, values) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/employee/client/${clientnId}`, values);
      return dispatch({
        type: UPDATE_CLIENT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function deleteInteraction(id) {
  return async function (dispatch) {
      try {

          const res = await axios.delete(`${url}/employee/interaction/${id}`);

       
          return dispatch({
              type: DELETE_INTERACTION,
              payload: res.data, 
          });
      } catch (error) {
          console.error(error.message);
      }
  };
}

export function getAllInteractionByIdClient(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/employee/interaction/${id}`); 
      return dispatch({
        type: GET_ALL_INTERACTIONS,
        payload: res.data,
      });
    } catch (error) {
      console.error("Response data:", error.response.data);
    }
  };
}

export function newPostCompra(id,values) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/public/compra/${id}`, values);
      return dispatch({
        type: POST_NEW_COMPRA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllCompraByIdClient(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/public/compra/${id}`); 
      return dispatch({
        type: GET_ALL_COMPRAS,
        payload: res.data,
      });
    } catch (error) {
      console.error("Response data:", error.response.data);
    }
  };
}

export function newPostCuentaCorriente(id,values) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/public/cuenta/${id}`, values);
      console.log("datos cuenta", values)
      return dispatch({
        type: POST_NEW_CUENTACORRIENTE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllCuentaCorrienteByIdClient(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/public/cuenta/${id}`); 
      return dispatch({
        type: GET_ALL_CUENTASCORRIENTES,
        payload: res.data,
      });
    } catch (error) {
      console.error("Response data:", error.response.data);
    }
  };
}

export const clearInteractions = () => {
    return {
        type: CLEAR_INTERACTIONS,
    };
};

export const clearClients = () => {
  return {
      type: CLEAR_CLIENTS,
  };
};
export function updateUser(id,values) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/employee//user/update/${id}`, values);
      console.log("datos clientes", values)
      return dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const clearAuthError = () => ({
  type: "CLEAR_AUTH_ERROR",
});