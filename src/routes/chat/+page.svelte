


<script lang="ts">  
	// Messaging
	import {sendMessage} from '../../db/db_funcs';
	import {onMount} from 'svelte';
  
	let messageFeed: MessageFeed[] = [];

	// Chat
	import { AppShell} from '@skeletonlabs/skeleton';
	import { Avatar, CodeBlock } from '@skeletonlabs/skeleton';

	// Types
	interface Person {
		id: number;
		avatar: number;
		name: string;
	}
	interface MessageFeed {
		id: number;
		host: boolean;
		avatar: number;
		name: string;
		timestamp: string;
		message: string;
		color: string;
	}

	let elemChat: HTMLElement;
	const lorem = "random stuff";

	// Navigation List
	const channels: Person[] = [
		{ id: 0, avatar: 14, name: 'General' },
		{ id: 1, avatar: 40, name: 'Channel1' },
		{ id: 2, avatar: 31, name: 'Channel2' },
		{ id: 3, avatar: 56, name: 'Channel3' },
		{ id: 4, avatar: 24, name: 'Channel4' },
	];
	let currentPersonId: number = 0;

	// Messages
	// let messageFeed: MessageFeed[] = [
	// 	{
	// 		id: 0,
	// 		host: true,
	// 		avatar: 48,
	// 		name: 'Jane',
	// 		timestamp: 'Yesterday @ 2:30pm',
	// 		message: lorem,
	// 		color: 'variant-soft-primary'
	// 	},
	// 	{
	// 		id: 1,
	// 		host: false,
	// 		avatar: 14,
	// 		name: 'Michael',
	// 		timestamp: 'Yesterday @ 2:45pm',
	// 		message: lorem,
	// 		color: 'variant-soft-primary'
	// 	},
	// 	{
	// 		id: 2,
	// 		host: true,
	// 		avatar: 48,
	// 		name: 'Jane',
	// 		timestamp: 'Yesterday @ 2:50pm',
	// 		message: lorem,
	// 		color: 'variant-soft-primary'
	// 	},
	// 	{
	// 		id: 3,
	// 		host: false,
	// 		avatar: 14,
	// 		name: 'Michael',
	// 		timestamp: 'Yesterday @ 2:52pm',
	// 		message: lorem,
	// 		color: 'variant-soft-primary'
	// 	},
	// 	{
	// 		id: 3,
	// 		host: false,
	// 		avatar: 14,
	// 		name: 'Michael',
	// 		timestamp: 'Yesterday @ 2:52pm',
	// 		message: lorem,
	// 		color: 'variant-soft-primary'
	// 	},
	// 	{
	// 		id: 3,
	// 		host: false,
	// 		avatar: 14,
	// 		name: 'Michael',
	// 		timestamp: 'Yesterday @ 2:52pm',
	// 		message: lorem,
	// 		color: 'variant-soft-primary'
	// 	},
	// 	{
	// 		id: 3,
	// 		host: false,
	// 		avatar: 14,
	// 		name: 'Michael',
	// 		timestamp: 'Yesterday @ 2:52pm',
	// 		message: lorem,
	// 		color: 'variant-soft-primary'
	// 	}
	// ];
	let currentMessage = '';

	// For some reason, eslint thinks ScrollBehavior is undefined...
	// eslint-disable-next-line no-undef
	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function getCurrentTimestamp(): string {
		return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	function addMessage(): void {
		const newMessage = {
			id: messageFeed.length,
			host: true,
			avatar: 48,
			name: 'Shriyans',
			timestamp: `Today @ ${getCurrentTimestamp()}`,
			message: currentMessage,
			color: 'variant-soft-primary'
		};
		sendMessage("userId","userName",currentMessage);
		// Update the message feed
		messageFeed = [...messageFeed, newMessage];
		// Clear prompt
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
						{#each messageFeed as bubble}
							{#if bubble.host === true}
								<div class="grid grid-cols-[auto_1fr] gap-2">
									<Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
									<div class="card p-4 variant-soft rounded-tl-none space-y-2">
										<header class="flex justify-between items-center">
											<p class="font-bold">{bubble.name}</p>
											<small class="opacity-50">{bubble.timestamp}</small>
										</header>
										<p>{bubble.message}</p>
									</div>
								</div>
							{:else}
								<div class="grid grid-cols-[1fr_auto] gap-2">
									<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
										<header class="flex justify-between items-center">
											<p class="font-bold">{bubble.name}</p>
											<small class="opacity-50">{bubble.timestamp}</small>
										</header>
										<p>{bubble.message}</p>
									</div>
									<Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
								</div>
							{/if}
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
