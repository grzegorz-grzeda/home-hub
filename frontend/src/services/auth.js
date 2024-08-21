import { setError, clearError } from "./error.js";
import { fetchUser, clearUser } from "./user.js";
import { writable } from "svelte/store";

export const session = writable(false);

export function getSession() {
    let currentSession;
    session.subscribe(value => currentSession = value)();
    return currentSession;
}

export async function login(email, password) {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        });
        if (response.ok) {
            session.set(true);
            fetchUser();
        } else {
            session.set(false);
            clearUser();
            const errorData = await response.json();
            setError(errorData.error);
        }
    } catch (err) {
        session.set(false);
        clearUser();
        setError("Failed to login");
    }
};

export async function logout() {
    try {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        });
        if (response.ok) {
            clearUser();
            session.set(false);
        } else {
            const errorData = await response.json();
            setError(errorData.error);
        }
    } catch (err) {
        setError("Failed to logout");
    }
};

export async function isSessionActive() {
    console.log("Checking session");
    try {
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
            session.set(false);
            clearUser();
            const errorData = await response.json();
            setError(errorData.error);
            return false;
        }
        session.set(true);
        fetchUser();
        return true;
    } catch (err) {
        setError("Failed to check session");
        return false;
    }
}