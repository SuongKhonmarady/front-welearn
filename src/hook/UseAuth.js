import { getUser } from "../context/user/UserAction";

export default async function UseAuth() {
  try {
    const res = await getUser();
    return res !== undefined;
  } catch (error) {
    console.error("Error checking user authentication:", error);
    return false;
  }
}
