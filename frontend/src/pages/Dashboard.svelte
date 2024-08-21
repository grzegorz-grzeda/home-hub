<script>
    import { beforeUpdate } from "svelte";
    import { redirectToPageIfUnauthenticated } from "../guards/authenticationGuard";

    beforeUpdate(() => {
        redirectToPageIfUnauthenticated("/login");
    });
</script>

<h1>Dashboard</h1>
<p>This is the dashboard</p>
