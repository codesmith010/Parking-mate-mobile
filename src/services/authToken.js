import axios from "axios";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@env";
import getToken from "./getToken";

const authToken = async (token) => {
  try {
    console.log("TOKENLL: >>>>>>>>>>>. ", token);

    if (token) {
      // Include the token in the request headers
      axios.defaults.headers.common["Authorization"] = token;

      // Make a request to a protected route on your server
      const response = await axios.get(`${BASE_URL}/user/protected`);
      console.log("resll: ", response.data);

      // If the request is successful, the token is valid
      if (response) {
        console.log("Token is valid");
        return response.data;
      }
    }
  } catch (error) {
    console.error("Error occurred while checking token validity:", error);
  }
};

export default authToken;
