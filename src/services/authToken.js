import { BASE_URL } from "@env";
import axios from "axios";

const authToken = async (token) => {
  try {
    if (token) {
      // Include the token in the request headers
      axios.defaults.headers.common["Authorization"] = token;

      // Make a request to a protected route on your server
      const response = await axios.get(`${BASE_URL}/user/protected`);

      // If the request is successful, the token is valid
      if (response) {
        // console.log("Token is valid");
        return response.data;
      }
    }
  } catch (error) {
    console.error("Error occurred while checking token validity:", error);
  }
};

export default authToken;
