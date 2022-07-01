// axios 
import axios, { AxiosError, AxiosResponse } from "axios";

// type
import { Customer } from "types/Customer";

// DOMAIN API
const { REACT_APP_API_DOMAIN: API_DOMAIN} = process.env;

export class CustomerService {
  
  // GET ALL CUSTOMER
  async all(accessToken:string) {
    try {
      const endpoint = `${API_DOMAIN}/customers`;

      const { data: { data, success, message } } = await axios.get(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});


      const customers: Customer[] = data.map(({ attribute, relationships }: any) => {
        const customer: Customer = { ...attribute };

        const { city, state } = relationships;

        customer.id_city = city.data.id;
        customer.id_state = state.data.id;

        return customer;
      });


      return {
        customers,
        success,
        message
      }

    } catch (error) {
      if (error instanceof AxiosError) {
				const { status, data: { data, success, message } } = error.response as AxiosResponse;

        if(status == 404) {
          throw error;
        }
        
      }
    }
  }

  // CREATE CUSTOMER
  async create(customer: Customer, accessToken:string){
    try {
      const endpoint = `${API_DOMAIN}/customers`;

      const { data: { success } } = await axios.post(endpoint, 
        customer, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});

      return {
        success,
      }

    } catch (error) {
      if (error instanceof AxiosError) {
				const { status, data: { data, success, message } } = error.response as AxiosResponse;

        if(status == 404) {
          if(message.includes('Validation Error')) {
            throw {
              message,
              success,
              paths: data,
              code: status
            };
  
          }
        }
        
      }
    }
  }

  // UPDATE CUSTOMER
  async update(customer: Customer, accessToken:string) {
    try {
      const endpoint = `${API_DOMAIN}/customers/${customer.id}`;

      const { data: { success, data } } = await axios.put(endpoint, 
        customer, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});

      const { attribute, relationships: { city, state } } = data;

      const updatedCustomer: Customer = { ...attribute, id_city: city.data.id, id_state: state.data.id }; 

      return {
        success,
        updatedCustomer
      }

    } catch (error) {
      if (error instanceof AxiosError) {
				const { status, data: { data, success, message } } = error.response as AxiosResponse;

        if(status == 404) {
          if(message.includes('Validation Error')) {
            throw {
              message,
              success,
              paths: data,
              code: status
            };
  
          }
        }
        
      }
    }
  }

  // DELETE CUSTOMER
  async remove(id: number, accessToken: string) {
    try {
      const endpoint = `${API_DOMAIN}/customers/${id}`;

      const { data: { success } } = await axios.delete(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});

    

      return {
        success
      }

    } catch (error) {
      if (error instanceof AxiosError) {
				const { status, data: { data, success, message } } = error.response as AxiosResponse;

        console.log(error);

        if(status == 404) {
          
        }
        
      }
    }
  }


}