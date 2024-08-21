<script>
	import { onMount } from "svelte";
	import { logout, session, isSessionActive } from "./services/auth.js";
	import { Router, Link, Route, navigate } from "svelte-routing";
	import Home from "./pages/Home.svelte";
	import Login from "./pages/Login.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import NotFound from "./pages/NotFound.svelte";

	onMount(async () => {
		await isSessionActive();
	});
	function logoutFromApp() {
		logout();
		navigate("/login");
	}
</script>

<Router>
	<nav>
		<Link to="/">Home</Link>
		{#if $session}
			<Link to="/dashboard">Dashboard</Link>
			<a href="/logout" on:click|preventDefault={logoutFromApp}>Logout</a>
		{:else}
			<Link to="/login">Login</Link>
		{/if}
	</nav>
	<div class="main">
		<Route path="/" component={Home} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/login" component={Login} />
		<Route path="*" component={NotFound} />
	</div>
</Router>

<style>
	nav {
		display: flex;
		gap: 1rem;
	}
	.main {
		margin-top: 1rem;
		max-width: 800px;
		margin: 0 auto;
	}
</style>
