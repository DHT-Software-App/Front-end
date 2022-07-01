// axios 
import axios, { AxiosError, AxiosResponse } from "axios";
import { City } from "types/City";

// DOMAIN API
const { REACT_APP_API_DOMAIN: API_DOMAIN} = process.env;

export class CityService {
  // GET ALL CITY
  async all(accessToken:string) {
    try {
      const endpoint = `${API_DOMAIN}/cities`;

      const { data: { data, success, message } } = await axios.get(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
          'Authorization': `Bearer ${accessToken}`
				},
			});


      const cities: City[] = data.map(({ attribute, relationships }: any) => {
        const city: City = { ...attribute };

        const { state } = relationships;

        city.id_state = state.data.id;

        return city;
      });


      return {
        cities,
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