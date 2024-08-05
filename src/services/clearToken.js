import * as SecureStore from "expo-secure-store";

async function clearToken() {
  try {
    await SecureStore.deleteItemAsync("userToken");
    console.log("Token cleared successfully");
  } catch (error) {
    console.error("Error clearing token:", error);
  }
}
export default clearToken;
// Call the clearToken function wherever you need to clear the key
