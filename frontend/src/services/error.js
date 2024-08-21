import { writable } from 'svelte/store';

export const error = writable(null);

export function setError(errorData) {
    error.set(errorData);
}

export function clearError() {
    error.set(null);
}