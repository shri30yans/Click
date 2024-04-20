


<script lang="ts">  
	// Messaging
	import {sendMessage, chat,loadChat} from '../../db/db_funcs';
	import {onMount} from 'svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { goto } from '$app/navigation';
	const avatar_id = 2; // Generate a random number between 0 and 49

	// Chat
	import { AppShell} from '@skeletonlabs/skeleton';
	import { Avatar, CodeBlock } from '@skeletonlabs/skeleton';

	// Types
	interface Person {
		id: number;
		avatar: number;
		name: string;
	}

	let elemChat: HTMLElement;
	const lorem = "random stuff";

	// Navigation List
	const channels: Person[] = [
		{ id: 0, avatar: 14, name: 'General' },
		{ id: 1, avatar: 40, name: 'Channel1' },
		{ id: 2, avatar: 31, name: 'Channel2' }
	];
	let currentPersonId: number = 0;
	let currentMessage = '';

	// For some reason, eslint thinks ScrollBehavior is undefined...
	// eslint-disable-next-line no-undef
	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function getCurrentTimestamp(): string {
		return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	async function addMessage(): Promise<void> {		
		const { data: { user } } = await supabase.auth.getUser()
		if (!user) {
			// No user is logged in, redirect to the login page
			goto('/login');
			return;
		}
		await loadChat();

		sendMessage(user.email,user.email,currentMessage);
		currentMessage = '';
		// Smooth scroll to bottom
		// Timeout prevents race condition
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}

	function onPromptKeydown(event: KeyboardEvent): void {
		if (['Enter'].includes(event.code)) {
			event.preventDefault();
			addMessage();
		}
	}

	// When DOM mounted, scroll to bottom
	onMount(() => {
		scrollChatBottom();
		loadChat();
	});
	
</script>


<AppShell>
	<svelte:fragment slot="default">
		<section class="card h-full">
			<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[20%_1fr] ">
				<!-- Navigation -->
				<div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
					<!-- Header -->
					<header class="border-b border-surface-500/30 p-4">
						<input class="input" type="search" placeholder="Search..." />
					</header>
					<!-- List -->
					<div class="p-4 space-y-4 overflow-y-auto">
						<small class="opacity-50">Contacts</small>
						<div class="flex flex-col space-y-1">
							{#each channels as person}
								<button
									type="button"
									class="btn w-full flex items-center space-x-4 {person.id === currentPersonId
										? 'variant-filled-primary'
										: 'bg-surface-hover-token'}"
									on:click={() => (currentPersonId = person.id)}
								>
									<Avatar src="https://i.pravatar.cc/?img={person.avatar}" width="w-8" />
									<span class="flex-1 text-start">
										{person.name}
									</span>
								</button>
							{/each}
						</div>
					</div>
					<!-- Footer -->
					<!-- <footer class="border-t border-surface-500/30 p-4">(footer)</footer> -->
				</div>
				<!-- Chat -->
				<div class="lg:grid grid-row-[1fr_auto] h-full">
					<!-- Conversation -->
					<section bind:this={elemChat} class="h-[80vh] p-4 overflow-y-auto space-y-4">
						<!-- {#each messageFeed as bubble} -->
						{#each $chat as {created_at, id, username, message}, key}
							{#key key}
								<div class="grid grid-cols-[auto_1fr] gap-2">
									<Avatar src="https://i.pravatar.cc/?img={avatar_id}" width="w-12" />
									<div class="card p-4 variant-soft rounded-tl-none space-y-2">
										<header class="flex justify-between items-center">
											<p class="font-bold">{username}</p>
											<small class="opacity-50">{created_at}</small>
										</header>
										<p>{message}</p>
									</div>
								</div>
							{/key}
						{/each}
					</section>
					<!-- Prompt -->
					<section class="border-t border-surface-500/30 p-4">
						<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
							<button class="input-group-shim">+</button>
							<textarea
								bind:value={currentMessage}
								class="bg-transparent border-0 ring-0"
								name="prompt"
								id="prompt"
								placeholder="Write a message..."
								rows="1"
								on:keydown={onPromptKeydown}
							/>
							<button class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'} on:click={addMessage}>
								<i class="fa-solid fa-paper-plane" />Send
							</button>
						</div>
					</section>
				</div>
			</div>
		</section>
	</svelte:fragment>

</AppShell>
