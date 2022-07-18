// axios 
import axios, { AxiosError, AxiosResponse } from "axios";

// type
import { Client } from "types/Client";
import { getCookie } from "utils/cookies/cookies";

// DOMAIN API
const { REACT_APP_API_DOMAIN: API_DOMAIN} = process.env;

export class ClientService {
  
  // GET ALL CLIENT
  async all(accessToken:string) {
    try {
      const endpoint = `${API_DOMAIN}/clients`;

      const { data: { data, success, message } } = await axios.get(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});


      const clients: Client[] = data.map(({ attribute, relationships }: any) => {
        const client: Client = { ...attribute };

        const { city, state } = relationships;

        client.id_city = city.data.id;
        client.id_state = state.data.id;

        return client;
      });


      return {
        clients,
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

  // CREATE CLIENT
  async create(client: Client, accessToken:string){
    try {
      const endpoint = `${API_DOMAIN}/clients`;

      const { data: { success, data } } = await axios.post(endpoint, 
        client, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});

      const newClient: Client = { ...data.attribute };

      const { city, state } = data.relationships;

      newClient.id_city = city.data.id;
      newClient.id_state = state.data.id;


      return {
        success,
        newClient
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

  // UPDATE CLIENT
  async update(client: Client, accessToken:string) {
    try {
      const endpoint = `${API_DOMAIN}/clients/${client.id}`;

      const { data: { success, data } } = await axios.put(endpoint, 
        client, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});

      const { attribute, relationships: { city, state } } = data;

      const updatedClient: Client = { ...attribute, id_city: city.data.id, id_state: state.data.id }; 

      return {
        success,
        updatedClient
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
      const endpoint = `${API_DOMAIN}/clients/${id}`;

      const { data: { success } } = await axios.delete(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
        data: {
          userid: getCookie('userid')
        }
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