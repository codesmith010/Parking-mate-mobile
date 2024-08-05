import * as SecureStore from "expo-secure-store";
async function saveToken(key, value) {
  await SecureStore.setItemAsync(key, value);
}
export default saveToken;
