import getToken from "../getToken";
import { BASE_URL } from "@env";
import { ERRORS } from "../../labels/error";
import axios from "axios";

// export const API = async (params) => {
//   const instance = axios.create({
//     baseURL: BASE_URL,
//     headers: { "Content-Type": "application/json" },
//   });
//   const {
//     method,
//     endpoint = "",
//     baseURL = "",
//     payload = null,
//     isToken = true,
//     isFormData = false,
//     file = "",
//     headers = {},
//     toJSON = true,
//   } = params;
//   console.log("API CALLED: 2.5:nn ", payload);

//   // if (isToken) {
//   //   const token = await getToken();
//   //   config.headers.Authorization = `Bearer ${token}`;
//   // }

//   // if (!navigator.onLine) {
//   //   throw new Error(ERRORS.noInternet);
//   // }
//   try {
//     const response = await instance[method.toLowerCase()](
//       `/${endpoint}`,
//       payload
//     );
//     console.log("res getting is: ", response.data);
//     const ok = response.ok;
//     const headers = response.headers;

//     // if (response?.status === 401) {
//     //   return [false, {}];
//     // }

//     if (response?.status !== 500) {
//       response = await response.text();
//       response = response ? JSON.parse(response) : {};
//     } else {
//       console.log(`❌ API ERR1 [${endpoint}] =====> `, response);
//       response = {};
//     }

//     if (!ok) {
//       console.log(
//         `❌ API ERR2 [${endpoint}] =====> `,
//         JSON.stringify(response)
//       );
//     }

//     return [ok, response, headers];
//   } catch (error) {
//     console.log(`❌ API ERR3 [${endpoint}] =====> `, error);
//     throw error;
//   }
// };

export const API = async (params) => {
  let {
    method,
    endpoint = "",
    baseURL = "",
    payload = null,
    isToken = true,
    isFormData = false,
    file = "",
    headers = {},
    toJSON = true,
  } = params;

  method = method.toUpperCase();
  let body = null;
  let URL = `${BASE_URL}/${endpoint}`;

  if (baseURL) {
    URL = baseURL;
  }
  // console.log("my headers: ####", headers);
  if (isToken) {
    const token = await getToken();
    headers = { ...headers, Authorization: `${token}` };
  }

  if (isFormData) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    body = formData;
  } else if (file) {
    const req = new Request(file);
    const resp = await fetch(req);
    body = await resp.blob();
  } else {
    body = JSON.stringify(payload);
  }

  let options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },

    credentials: "include",
    body,
  };

  if (method === "GET") {
    delete options.body;
  }

  try {
    let response = await fetch(URL, options);
    const ok = response.ok;
    const headers = response.headers;

    if (toJSON === false) {
      return [ok, {}];
    }

    if (response?.status === 401) {
      return [false, {}];
    }

    if (response?.status !== 500) {
      response = await response.text();
      response = response ? JSON.parse(response) : {};
    } else {
      console.log(`❌ API ERR1 [${endpoint}] =====> `, response);
      response = {};
    }

    if (!ok) {
      console.log(
        `❌ API ERR2 [${endpoint}] =====> `,
        JSON.stringify(response)
      );
    }

    return [ok, response, headers];
  } catch (error) {
    console.log(`❌ API ERR3 [${endpoint}] =====> `, error);
    throw error;
  }
};
