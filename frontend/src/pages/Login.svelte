<script>
    import { error } from "../services/stores.js";
    import { login } from "../services/auth.js";
    import { navigate } from "svelte-routing";

    let email = "";
    let password = "";

    const formLogin = async () => {
        await login(email, password);
        navigate("/");
    };
</script>

<div class="login-form">
    <h2>Login</h2>
    {#if $error}
        <p class="error">{$error}</p>
    {/if}
    <form on:submit|preventDefault={formLogin}>
        <input type="email" bind:value={email} placeholder="E-mail" required />
        <input
            type="password"
            bind:value={password}
            placeholder="Password"
            required
        />
        <button type="submit">Login</button>
    </form>
</div>

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
