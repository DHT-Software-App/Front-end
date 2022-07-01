import { Customer } from "types/Customer";

// Initial State
export type CustomersStateProps = {
  error?: any;
  customers?: Customer[];
  success?: boolean;
  loading: boolean;
};

const initialState : CustomersStateProps = {
  loading: false,
}

// actions
export const GET_ALL_CUSTOMER_REQUEST = 'GET_ALL_CUSTOMER_REQUEST';
export const GET_ALL_CUSTOMER_SUCCESS = 'GET_ALL_CUSTOMER_SUCCESS';
export const GET_ALL_CUSTOMER_FAILED = 'GET_ALL_CUSTOMER_FAILED';

export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILED = 'CREATE_CUSTOMER_FAILED';

export const UPDATE_CUSTOMER_REQUEST = 'UPDATE_CUSTOMER_REQUEST';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILED = 'UPDATE_CUSTOMER_FAILED';

export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILED = 'DELETE_CUSTOMER_FAILED';

export const CLEAN_CUSTOMER_SUCCESS = 'CLEAN_CUSTOMER_SUCCESS';
export const CLEAN_CUSTOMER_ERROR = 'CLEAN_CUSTOMER_ERROR';

export const reducer = (state = initialState, action: { type: string; payload: any }) : CustomersStateProps => {
  const { type, payload } = action;

	switch (type) {
    // REQUEST
    case GET_ALL_CUSTOMER_REQUEST:
    case CREATE_CUSTOMER_REQUEST:
    case UPDATE_CUSTOMER_REQUEST:
    case DELETE_CUSTOMER_REQUEST:
    {
      return {
        ...state,
        loading: true
      };
    }

    // SUCCESS
    case GET_ALL_CUSTOMER_SUCCESS:
    {
      const { customers } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        customers
      }
    }

    case CREATE_CUSTOMER_SUCCESS:{
      const { success } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        success
      }
    }
    
    case UPDATE_CUSTOMER_SUCCESS:
      const { customer: updatedCustomer, success } = payload;

      return {
        ...state,
        loading: false,
        error: null,
        success,
        customers: state.customers?.map((customer) => customer.id == updatedCustomer.id ? updatedCustomer : customer)
      }

    case UPDATE_CUSTOMER_SUCCESS:
      const { id } = payload;
      
      return {
        ...state,
        loading: false,
        error: null,
        success,
        customers: state.customers?.filter((customer) => customer.id != id)
      }
    
    // FAILED 
    case GET_ALL_CUSTOMER_FAILED:
    case CREATE_CUSTOMER_FAILED:
    case UPDATE_CUSTOMER_FAILED:
    case DELETE_CUSTOMER_FAILED: {
      const {error} = payload;

      return {
        ...state,
        loading: false,
        error
      }
    }

    // CLEAN
    case CLEAN_CUSTOMER_SUCCESS:{
     
      return {
        ...state,
        success: undefined
      };
    }

    case CLEAN_CUSTOMER_ERROR:{
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
export const getAllCustomerRequest = (accessToken: string) => ({
  type: GET_ALL_CUSTOMER_REQUEST,
  payload: {
    accessToken
  }
});

export const getAllCustomerSuccess = (customers: Customer[]) => ({
  type: GET_ALL_CUSTOMER_SUCCESS,
  payload: {
    customers
  }
});

export const getAllCustomerFailed = (error: any) => ({
  type: GET_ALL_CUSTOMER_FAILED,
  payload: {
    error
  }
});

// CREATE

export const createCustomerRequest = (customer: Customer, accessToken: string) => ({
  type: CREATE_CUSTOMER_REQUEST,
  payload: {
    customer,
    accessToken
  }
});

export const createCustomerSuccess = (success: boolean) => ({
  type: CREATE_CUSTOMER_SUCCESS,
  payload: {
    success
  }
});

export const createCustomerFailed = (error: any) => ({
  type: CREATE_CUSTOMER_FAILED,
  payload: {
    error
  }
});

// UPDATE

export const updateCustomerRequest = (customer: Customer, accessToken: string) => ({
  type: UPDATE_CUSTOMER_REQUEST,
  payload: {
    customer,
    accessToken
  }
});

export const updateCustomerSuccess = (customer: Customer, success: boolean) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: {
    customer,
    success
  }
});

export const updateCustomerFailed = (error: any) => ({
  type: UPDATE_CUSTOMER_FAILED,
  payload: {
    error
  }
})

// DELETE

export const deleteCustomerRequest = (id: number, accessToken: string) => ({
  type: DELETE_CUSTOMER_REQUEST,
  payload: {
    id,
    accessToken
  }
});

export const deleteCustomerSuccess = (id: number, success: boolean) => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: {
    id,
    success
  }
});

export const deleteCustomerFailed = (error: any) => ({
  type: DELETE_CUSTOMER_FAILED,
  payload: {
    error
  }
})


// CLEAN
export const cleanErrorFromCustomers = () => ({
  type: CLEAN_CUSTOMER_ERROR
})


// CLEAN
export const cleanSuccessFromCustomers = () => ({
  type: CLEAN_CUSTOMER_SUCCESS
});
