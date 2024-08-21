import { writable } from 'svelte/store';
import { setError, clearError } from './error';

export const user = writable(null);

export function clearUser() {
    user.set(null);
};

export function getUser() {
    let currentUser;
    user.subscribe(value => currentUser = value)();
    return currentUser;
}

export async function fetchUser() {
    try {
        const response = await fetch("/api/user");
        if (response.ok) {
            const data = await response.json();
            user.set(data.user);
            clearError();
        } else {
            user.set(null);
            const errorData = await response.json();
            setError(errorData.error);
        }
    } catch (err) {
        setError("Failed to fetch user");
    }
}