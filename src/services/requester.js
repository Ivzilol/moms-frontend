const request = async (method, data) => {
    const url = "http://localhost:8080/v1";
    const options = {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
    };
  
    if (data) {
      options.body = JSON.stringify(data);
    }
  
    try {
      const response = await fetch(url, options);
  
      if (response.status === 401) {
        return Promise.reject("Unauthorized");
      }
  
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      return Promise.reject(error.message || error);
    }
  };
  
  export const loginRequest = request.bind(null, "POST");