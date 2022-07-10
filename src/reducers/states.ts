import { State } from "types/State";

// Initial State
export type StatesStateProps = {
  error?: any;
  states?: State[];
  success?: boolean;
  loading: boolean;
};

const initialState : StatesStateProps = {
  loading: false,
}

// actions
export const GET_ALL_STATE_REQUEST = 'GET_ALL_STATE_REQUEST';
export const GET_ALL_STATE_SUCCESS = 'GET_ALL_STATE_SUCCESS';
export const GET_ALL_STATE_FAILED = 'GET_ALL_STATE_FAILED';

export const CREATE_STATE_REQUEST = 'CREATE_STATE_REQUEST';
export const CREATE_STATE_SUCCESS = 'CREATE_STATE_SUCCESS';
export const CREATE_STATE_FAILED = 'CREATE_STATE_FAILED';

export const UPDATE_STATE_REQUEST = 'UPDATE_STATE_REQUEST';
export const UPDATE_STATE_SUCCESS = 'UPDATE_STATE_SUCCESS';
export const UPDATE_STATE_FAILED = 'UPDATE_STATE_FAILED';

export const DELETE_STATE_REQUEST = 'DELETE_STATE_REQUEST';
export const DELETE_STATE_SUCCESS = 'DELETE_STATE_SUCCESS';
export const DELETE_STATE_FAILED = 'DELETE_STATE_FAILED';

export const CLEAN_STATE_SUCCESS = 'CLEAN_STATE_SUCCESS';
export const CLEAN_STATE_ERROR = 'CLEAN_STATE_ERROR';

export const reducer = (state = initialState, action: { type: string; payload: any }) : StatesStateProps => {
  const { type, payload } = action;

	switch (type) {
    // REQUEST
    case GET_ALL_STATE_REQUEST:
    case CREATE_STATE_REQUEST:
    case UPDATE_STATE_REQUEST:
    case DELETE_STATE_REQUEST:
    {
      return {
        ...state,
        loading: true
      };
    }

    // SUCCESS
    case GET_ALL_STATE_SUCCESS:
    {
      const { states } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        states
      }
    }

    case CREATE_STATE_SUCCESS:{
      const { success } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        success
      }
    }
    
    case UPDATE_STATE_SUCCESS:
      const { state: updatedState, success } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        success,
        states: state.states?.map((state) => state.id == updatedState.id ? updatedState : state)
      }

    case UPDATE_STATE_SUCCESS:
      const { id } = payload;
      
      return {
        ...state,
        loading: false,
        error: null,
        success,
        states: state.states?.filter((state) => state.id != id)
      }
    
    // FAILED 
    case GET_ALL_STATE_FAILED:
    case CREATE_STATE_FAILED:
    case UPDATE_STATE_FAILED:
    case DELETE_STATE_FAILED: {
      const {error} = payload;

      return {
        ...state,
        loading: false,
        error
      }
    }

    // CLEAN
    case CLEAN_STATE_SUCCESS:{
     
      return {
        ...state,
        success: undefined
      };
    }

    case CLEAN_STATE_ERROR:{
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
export const getAllStateRequest = (accessToken: string) => ({
  type: GET_ALL_STATE_REQUEST,
  payload: {
    accessToken
  }
});

export const getAllStateSuccess = (states: State[]) => ({
  type: GET_ALL_STATE_SUCCESS,
  payload: {
    states
  }
});

export const getAllStateFailed = (error: any) => ({
  type: GET_ALL_STATE_FAILED,
  payload: {
    error
  }
});

// CREATE

export const createStateRequest = (state: State, accessToken: string) => ({
  type: CREATE_STATE_REQUEST,
  payload: {
    state,
    accessToken
  }
});

export const createStateSuccess = (success: boolean) => ({
  type: CREATE_STATE_SUCCESS,
  payload: {
    success
  }
});

export const createStateFailed = (error: any) => ({
  type: CREATE_STATE_FAILED,
  payload: {
    error
  }
});

// UPDATE

export const updateStateRequest = (state: State, accessToken: string) => ({
  type: UPDATE_STATE_REQUEST,
  payload: {
    state,
    accessToken
  }
});

export const updateStateSuccess = (state: State, success: boolean) => ({
  type: UPDATE_STATE_SUCCESS,
  payload: {
    state,
    success
  }
});

export const updateStateFailed = (error: any) => ({
  type: UPDATE_STATE_FAILED,
  payload: {
    error
  }
})

// DELETE

export const deleteStateRequest = (id: number, accessToken: string) => ({
  type: DELETE_STATE_REQUEST,
  payload: {
    id,
    accessToken
  }
});

export const deleteStateSuccess = (id: number, success: boolean) => ({
  type: DELETE_STATE_SUCCESS,
  payload: {
    id,
    success
  }
});

export const deleteStateFailed = (error: any) => ({
  type: DELETE_STATE_FAILED,
  payload: {
    error
  }
})


// CLEAN
export const cleanErrorFromStates = () => ({
  type: CLEAN_STATE_ERROR
})


// CLEAN
export const cleanSuccessFromStates = () => ({
  type: CLEAN_STATE_SUCCESS
});