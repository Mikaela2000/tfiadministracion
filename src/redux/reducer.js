import {
  GET_ALL_CLIENTS,
  POST_NEW_CLIENT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  DELETE_CLIENT,
  POST_NEW_INTERACTION,
  GET_ALL_INTERACTIONS,
  UPDATE_INTERACTION,
  DELETE_INTERACTION,
  POST_NEW_COMPRA,
  GET_ALL_COMPRAS,
  POST_NEW_CUENTACORRIENTE,
  GET_ALL_CUENTASCORRIENTES,
  ENABLED_USER,
  REGISTER,
  GET_ALL_USERS,
  ROLE_USER,
  GET_USER,
  GET_CLIENT,
  UPDATE_USER,
  UPDATE_CLIENT,
  APPLY_FILTERS,
  POST_NEW_REPORTE,
  GET_ALL_REPORTES,
  ESTADO_REPORTE,
  GET_ALL_CLIENT_DNI_FAIL,
} from "./actionTypes";

const initialState = {
  users: [],
  allUsers: [],
  clients: [],
  allClients: [],
  reportes: [],
  allReportes: [],
  user: {},
  client: {},
  token: localStorage.getItem("token") || null, // Inicializa con el token de localStorage si existe
  error: null,
  loading: false,
  interactions: [],
  allInteractions: [],
  compras: [],
  allCompras: [],
  cuentasCorrientes: [],
  allCuentasCorrientes: [],
  loggedIn: Boolean(localStorage.getItem("loggedIn")) || false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_CLIENT_DNI_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ESTADO_REPORTE:
      return {
        ...state,
        reportes: state.reportes.map((reporte) =>
          reporte.id === action.payload.id
            ? { ...reporte, estado: action.payload.estado }
            : reporte
        ),
      };

    case ENABLED_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, enabled: action.payload.enabled }
            : user
        ),
      };

    case APPLY_FILTERS:
      const { FilterByClient, FilterByClientDni } = action.payload;

      return {
        ...state,
        filteredClients: state.allClients.filter(client =>
          client.nombre.includes(FilterByClient) ||
          client.dni.includes(FilterByClientDni) // No es necesario convertir a minúsculas aquí
        )
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      }

    case ROLE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, role: action.payload.role }
            : user
        ),
      };

    case REGISTER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case GET_ALL_REPORTES:
      return {
        ...state,
        reportes: action.payload,
        allReportes: action.payload,
      };

    case POST_NEW_REPORTE:
      return {
        ...state,
        reportes: [...state.reportes, action.payload],
      };


    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_CLIENT:
      return {
        ...state,
        client: action.payload,
      };

    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        allClients: action.payload,
      };

    case GET_ALL_INTERACTIONS:
      return {
        ...state,
        interactions: action.payload,
        allInteractions: action.payload,
      };

    case GET_ALL_COMPRAS:
      return {
        ...state,
        compras: action.payload,
        allCompras: action.payload,
      };

    case GET_ALL_CUENTASCORRIENTES:
      return {
        ...state,
        cuentasCorrientes: action.payload,
        allCuentasCorrientes: action.payload,
      };

    case POST_NEW_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("loggedIn", true);
      return {
        ...state,
        loggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "CLEAR_AUTH_ERROR":
      return {
        ...state,
        error: null,
      };

    case LOGIN_FAIL:
      console.log("Error en login:", action.payload);
      return {
        ...state,
        token: null,
        user: null,
        error: action.payload,
      };

    case 'LOGOUT':
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        loggedIn: false,
      };

    case DELETE_CLIENT:
      const newClients = state.clients.filter(client => client.id !== action.payload.id);
      return {
        ...state,
        clients: newClients,
        allClients: newClients,
      };

    case POST_NEW_INTERACTION:
      return {
        ...state,
        interactions: [...state.interactions, action.payload],
      };

    case POST_NEW_COMPRA:
      return {
        ...state,
        compras: [...state.compras, action.payload],
      };

    case POST_NEW_CUENTACORRIENTE:
      return {
        ...state,
        cuentasCorrientes: [...state.cuentasCorrientes, action.payload],
      };

    case UPDATE_INTERACTION:
      const updatedInteractions = state.interactions.map(interaction =>
        interaction.id === action.payload.id ? action.payload : interaction
      );

    case UPDATE_CLIENT:
      const updatedClients = state.clients.map(client =>
        client.id === action.payload.id ? action.payload : client
      );
      return {
        ...state,
        clients: updatedClients,
      };

    case 'CLEAR_INTERACTIONS':
      return {
        ...state,
        interactions: [],
      };

    case 'CLEAR_CLIENTS':
      return {
        ...state,
        clients: [],
      };


    case DELETE_INTERACTION:
      const remainingInteractions = state.interactions.filter(interaction => interaction.id !== action.payload.id);
      return {
        ...state,
        interactions: remainingInteractions,
        allInteractions: remainingInteractions,
      };

    default:
      return state;
  }
};

export default rootReducer;
