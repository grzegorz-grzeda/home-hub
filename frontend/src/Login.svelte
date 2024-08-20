<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    let username = "";
    let password = "";
    let error = writable(null);
    let user = writable(null);

    const login = async () => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: username, password: password }),
            });
            if (response.ok) {
                const response = await fetch("/api/user");
                if (!response.ok) {
                    const errorData = await response.json();
                    error.set(errorData.error);
                    return;
                } else {
                    user.set(await response.json());
                    error.set(null);
                }
            } else {
                const errorData = await response.json();
                error.set(errorData.error);
            }
        } catch (err) {
            error.set("Failed to login");
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });
            if (response.ok) {
                user.set(null);
            } else {
                const errorData = await response.json();
                error.set(errorData.error);
            }
        } catch (err) {
            error.set("Failed to logout");
        }
    };

    onMount(async () => {
        try {
            const response = await fetch("/api/user");
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                user.set(data.user);
            } else {
                const errorData = await response.json();
                error.set(errorData.error);
            }
        } catch (err) {
            error.set(`Failed to fetch session data ${err}`);
        }
    });
</script>

{#if $user}
    <p>Welcome, {$user.name}!</p>
    <button on:click={logout}>Logout</button>
{:else}
    <div class="login-form">
        <h2>Login</h2>
        {#if $error}
            <p class="error">{$error}</p>
        {/if}
        <form on:submit|preventDefault={login}>
            <input
                type="text"
                bind:value={username}
                placeholder="Username"
                required
            />
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    </div>
{/if}

<style>
    .login-form {
        max-width: 300px;
        margin: 0 auto;
        padding: 1em;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .login-form input {
        width: 100%;
        padding: 0.5em;
        margin: 0.5em 0;
    }

    .login-form button {
        width: 100%;
        padding: 0.5em;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .login-form button:hover {
        background-color: #0056b3;
    }

    .error {
        color: red;
        margin: 0.5em 0;
    }
</style>
