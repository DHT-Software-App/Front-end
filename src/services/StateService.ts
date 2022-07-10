// axios 
import axios, { AxiosError, AxiosResponse } from "axios";
import { State } from "types/State";

// DOMAIN API
const { REACT_APP_API_DOMAIN: API_DOMAIN} = process.env;

export class StateService {
  // GET ALL STATE
  async all(accessToken:string) {
    try {
      const endpoint = `${API_DOMAIN}/states`;

      const { data: { data, success, message } } = await axios.get(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});


      const states: State[] = data.map(({ attribute }: any) => {
        const state: State = { ...attribute };
        return state;
      });

      return {
        states,
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
}