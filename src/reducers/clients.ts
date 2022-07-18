import { Client } from "types/Client";

// Initial State
export type ClientsStateProps = {
  error?: any;
  clients?: Client[];
  success?: boolean;
  loading: boolean;
};

const initialState : ClientsStateProps = {
  loading: false,
}

// actions
export const GET_ALL_CLIENT_REQUEST = 'GET_ALL_CLIENT_REQUEST';
export const GET_ALL_CLIENT_SUCCESS = 'GET_ALL_CLIENT_SUCCESS';
export const GET_ALL_CLIENT_FAILED = 'GET_ALL_CLIENT_FAILED';

export const CREATE_CLIENT_REQUEST = 'CREATE_CLIENT_REQUEST';
export const CREATE_CLIENT_SUCCESS = 'CREATE_CLIENT_SUCCESS';
export const CREATE_CLIENT_FAILED = 'CREATE_CLIENT_FAILED';

export const UPDATE_CLIENT_REQUEST = 'UPDATE_CLIENT_REQUEST';
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
export const UPDATE_CLIENT_FAILED = 'UPDATE_CLIENT_FAILED';

export const DELETE_CLIENT_REQUEST = 'DELETE_CLIENT_REQUEST';
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
export const DELETE_CLIENT_FAILED = 'DELETE_CLIENT_FAILED';

export const CLEAN_CLIENT_SUCCESS = 'CLEAN_CLIENT_SUCCESS';
export const CLEAN_CLIENT_ERROR = 'CLEAN_CLIENT_ERROR';

export const reducer = (state = initialState, action: { type: string; payload: any }) : ClientsStateProps => {
  const { type, payload } = action;

	switch (type) {
    // REQUEST
    case GET_ALL_CLIENT_REQUEST:
    case CREATE_CLIENT_REQUEST:
    case UPDATE_CLIENT_REQUEST:
    case DELETE_CLIENT_REQUEST:
    {
      return {
        ...state,
        loading: true
      };
    }

    // SUCCESS
    case GET_ALL_CLIENT_SUCCESS:
    {
      const { clients } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        clients
      }
    }

    case CREATE_CLIENT_SUCCESS:{
      const { success, client } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        success,
        clients: [ ...state.clients!, client ]
      }
    }
    
    case UPDATE_CLIENT_SUCCESS:
      const { client: updatedClient, success } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        success,
        clients: state.clients?.map((client) => client.id == updatedClient.id ? updatedClient : client)
      }

    case DELETE_CLIENT_SUCCESS:{
      const { id, success } = payload;

      console.log(success);

      return {
        ...state,
        loading: false,
        error: null,
        success,
        clients: state.clients?.filter((client) => client.id != id)
      }
    }
    // FAILED 
    case GET_ALL_CLIENT_FAILED:
    case CREATE_CLIENT_FAILED:
    case UPDATE_CLIENT_FAILED:
    case DELETE_CLIENT_FAILED: {
      const {error} = payload;

      return {
        ...state,
        loading: false,
        error
      }
    }

    // CLEAN
    case CLEAN_CLIENT_SUCCESS:{
     
      return {
        ...state,
        success: undefined
      };
    }

    case CLEAN_CLIENT_ERROR:{
      return {
        ...state,
        error:null
      }
    }

    default:{
      return state;
    }
  }
}

// actions creators

// GET ALL
export const getAllClientRequest = (accessToken: string) => ({
  type: GET_ALL_CLIENT_REQUEST,
  payload: {
    accessToken
  }
});

export const getAllClientSuccess = (clients: Client[]) => ({
  type: GET_ALL_CLIENT_SUCCESS,
  payload: {
    clients
  }
});

export const getAllClientFailed = (error: any) => ({
  type: GET_ALL_CLIENT_FAILED,
  payload: {
    error
  }
});

// CREATE

export const createClientRequest = (client: Client, accessToken: string) => ({
  type: CREATE_CLIENT_REQUEST,
  payload: {
    client,
    accessToken
  }
});

export const createClientSuccess = (client:Client, success: boolean) => ({
  type: CREATE_CLIENT_SUCCESS,
  payload: {
    success,
    client
  }
});

export const createClientFailed = (error: any) => ({
  type: CREATE_CLIENT_FAILED,
  payload: {
    error
  }
});

// UPDATE

export const updateClientRequest = (client: Client, accessToken: string) => ({
  type: UPDATE_CLIENT_REQUEST,
  payload: {
    client,
    accessToken
  }
});

export const updateClientSuccess = (client: Client, success: boolean) => ({
  type: UPDATE_CLIENT_SUCCESS,
  payload: {
    client,
    success
  }
});

export const updateClientFailed = (error: any) => ({
  type: UPDATE_CLIENT_FAILED,
  payload: {
    error
  }
})

// DELETE

export const deleteClientRequest = (id: number, accessToken: string) => ({
  type: DELETE_CLIENT_REQUEST,
  payload: {
    id,
    accessToken
  }
});

export const deleteClientSuccess = (id: number, success: boolean) => ({
  type: DELETE_CLIENT_SUCCESS,
  payload: {
    id,
    success
  }
});

export const deleteClientFailed = (error: any) => ({
  type: DELETE_CLIENT_FAILED,
  payload: {
    error
  }
})


// CLEAN
export const cleanErrorFromClients = () => ({
  type: CLEAN_CLIENT_ERROR
})


// CLEAN
export const cleanSuccessFromClients = () => ({
  type: CLEAN_CLIENT_SUCCESS
});
