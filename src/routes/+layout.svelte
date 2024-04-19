<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, AppRail } from '@skeletonlabs/skeleton';

	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { supabase } from '../lib/supabaseClient';

    onMount(async () => {
        const user = supabase.auth.getUser();

        if (!user) {
            // No user is logged in, redirect to the login page
            goto('/login');
        }
    });
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-55 p-5">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class ="h-20">
			<svelte:fragment slot="lead">
				<strong class="text-4xl uppercase">Click</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/shri30yans?tab=repositories"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<a
				class="btn btn-sm variant-ghost-surface"
				href="https://github.com/shri30yans?tab=repositories"
				target="_blank"
				rel="noreferrer"
			>
				User
			</a>
			<a
				class="btn btn-sm variant-ghost-surface"
				href="/login"
			>
				Login
			</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul class="text-1xl">
				<li><a href="/">Home</a></li>
				<li><a href="/clubs">Clubs</a></li>
				<li><a href="/events">Events</li>
				<li><a href="/chat">Chat</a></li>
				<li><a href="/media">Media</a></li>
				<li><a href="/projects">Projects</a></li>
			</ul>
		</nav>
		<!-- --- -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
