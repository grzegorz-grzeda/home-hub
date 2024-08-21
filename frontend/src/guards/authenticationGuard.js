import { isSessionActive } from "../services/auth.js";
import { navigate } from "svelte-routing";

export async function redirectToPageIfUnauthenticated(pageAddress) {
    if (!(await isSessionActive())) {
        console.log("User is not authenticated. Redirecting to login page.");
        navigate(pageAddress);
        return false;
    }
    return true;
}