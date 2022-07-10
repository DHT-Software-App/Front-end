import { City } from "types/City";

// Initial State
export type CitiesStateProps = {
  error?: any;
  cities?: City[];
  success?: boolean;
  loading: boolean;
};

const initialState : CitiesStateProps = {
  loading: false,
}

// actions
export const GET_ALL_CITY_REQUEST = 'GET_ALL_CITY_REQUEST';
export const GET_ALL_CITY_SUCCESS = 'GET_ALL_CITY_SUCCESS';
export const GET_ALL_CITY_FAILED = 'GET_ALL_CITY_FAILED';

export const CREATE_CITY_REQUEST = 'CREATE_CITY_REQUEST';
export const CREATE_CITY_SUCCESS = 'CREATE_CITY_SUCCESS';
export const CREATE_CITY_FAILED = 'CREATE_CITY_FAILED';

export const UPDATE_CITY_REQUEST = 'UPDATE_CITY_REQUEST';
export const UPDATE_CITY_SUCCESS = 'UPDATE_CITY_SUCCESS';
export const UPDATE_CITY_FAILED = 'UPDATE_CITY_FAILED';

export const DELETE_CITY_REQUEST = 'DELETE_CITY_REQUEST';
export const DELETE_CITY_SUCCESS = 'DELETE_CITY_SUCCESS';
export const DELETE_CITY_FAILED = 'DELETE_CITY_FAILED';

export const CLEAN_CITY_SUCCESS = 'CLEAN_CITY_SUCCESS';
export const CLEAN_CITY_ERROR = 'CLEAN_CITY_ERROR';

export const reducer = (state = initialState, action: { type: string; payload: any }) : CitiesStateProps => {
  const { type, payload } = action;

	switch (type) {
    // REQUEST
    case GET_ALL_CITY_REQUEST:
    case CREATE_CITY_REQUEST:
    case UPDATE_CITY_REQUEST:
    case DELETE_CITY_REQUEST:
    {
      return {
        ...state,
        loading: true
      };
    }

    // SUCCESS
    case GET_ALL_CITY_SUCCESS:
    {
      const { cities } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        cities
      }
    }

    case CREATE_CITY_SUCCESS:{
      const { success } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        success
      }
    }
    
    case UPDATE_CITY_SUCCESS:
      const { city: updatedCity, success } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        success,
        cities: state.cities?.map((city) => city.id == updatedCity.id ? updatedCity : city)
      }

    case UPDATE_CITY_SUCCESS:
      const { id } = payload;
      
      return {
        ...state,
        loading: false,
        error: null,
        success,
        cities: state.cities?.filter((city) => city.id != id)
      }
    
    // FAILED 
    case GET_ALL_CITY_FAILED:
    case CREATE_CITY_FAILED:
    case UPDATE_CITY_FAILED:
    case DELETE_CITY_FAILED: {
      const {error} = payload;

      return {
        ...state,
        loading: false,
        error
      }
    }

    // CLEAN
    case CLEAN_CITY_SUCCESS:{
     
      return {
        ...state,
        success: undefined
      };
    }

    case CLEAN_CITY_ERROR:{
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
export const getAllCityRequest = (accessToken: string) => ({
  type: GET_ALL_CITY_REQUEST,
  payload: {
    accessToken
  }
});

export const getAllCitySuccess = (cities: City[]) => ({
  type: GET_ALL_CITY_SUCCESS,
  payload: {
    cities
  }
});

export const getAllCityFailed = (error: any) => ({
  type: GET_ALL_CITY_FAILED,
  payload: {
    error
  }
});

// CREATE

export const createCityRequest = (city: City, accessToken: string) => ({
  type: CREATE_CITY_REQUEST,
  payload: {
    city,
    accessToken
  }
});

export const createCitySuccess = (success: boolean) => ({
  type: CREATE_CITY_SUCCESS,
  payload: {
    success
  }
});

export const createCityFailed = (error: any) => ({
  type: CREATE_CITY_FAILED,
  payload: {
    error
  }
});

// UPDATE

export const updateCityRequest = (city: City, accessToken: string) => ({
  type: UPDATE_CITY_REQUEST,
  payload: {
    city,
    accessToken
  }
});

export const updateCitySuccess = (city: City, success: boolean) => ({
  type: UPDATE_CITY_SUCCESS,
  payload: {
    city,
    success
  }
});

export const updateCityFailed = (error: any) => ({
  type: UPDATE_CITY_FAILED,
  payload: {
    error
  }
})

// DELETE

export const deleteCityRequest = (id: number, accessToken: string) => ({
  type: DELETE_CITY_REQUEST,
  payload: {
    id,
    accessToken
  }
});

export const deleteCitySuccess = (id: number, success: boolean) => ({
  type: DELETE_CITY_SUCCESS,
  payload: {
    id,
    success
  }
});

export const deleteCityFailed = (error: any) => ({
  type: DELETE_CITY_FAILED,
  payload: {
    error
  }
})


// CLEAN
export const cleanErrorFromCities = () => ({
  type: CLEAN_CITY_ERROR
})


// CLEAN
export const cleanSuccessFromCities = () => ({
  type: CLEAN_CITY_SUCCESS
});