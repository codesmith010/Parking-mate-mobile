import * as SecureStore from "expo-secure-store";
async function getToken() {
  let result = await SecureStore.getItemAsync("userToken");
  if (result) {
    const token = result.toString();
    // alert("🔐 Here's your value 🔐 \n" + result);
    return token;
  } else {
    return;
    // alert("No values stored under that key.");
  }
}
export default getToken;
