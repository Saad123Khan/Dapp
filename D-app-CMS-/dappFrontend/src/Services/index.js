import axios from "axios";


const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL: `${baseURL}/api/`,
    withCredentials: false,
    headers: {
      Accept: "application/json"
  },
    timeout: 60 * 1000,
  });
  
 
 //Interceptor
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            const message = error?.response?.data?.message;
            error.message = message ?? error.message
            if (error?.response?.data?.errors)
                error.errors = error?.response?.data?.errors;
            return Promise.reject(error)
        })

    const headers = {
        "Content-Type": "multipart/form-data",
    };

    const auth = async (body) => await api.post(`user`,body);   
   
    //Returning all the API
    return {
      auth,
       };
};

const apis = createBackendServer("http://localhost:5000");

export default apis;