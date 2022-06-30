// axios 
import axios, { AxiosError, AxiosResponse } from "axios";

// type
import { User } from "types/User";

// DOMAIN API
const { REACT_APP_API_DOMAIN: API_DOMAIN} = process.env;

export class AuthService {
  async sign(user: User) {
    try {
      const endpoint = `${API_DOMAIN}/login`;

      const { data } = await axios.post(endpoint, 
        user, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

      const { data: { token: accessToken }, message, success } = data;

      return {
        accessToken,
        message,
        success
      };

    } catch(error) {

      if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

        if(status == 404) {
          throw {
            message: 'Email or password incorrect',
            code: status
          };

        }
        
      }
    }
  }
}