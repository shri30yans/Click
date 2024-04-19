<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { goto } from '$app/navigation';

	let eventName = '';
	let eventTagline = '';
	let imageUrl = '';
	let eventDate = '';
	let eventHost = '';


	async function handleCreateProject() {
		// Call the CreateEvent function in the database and pass the required parameters
		try {
			await supabase.from('projects').insert([
				{ name: eventName, tagline: eventTagline, image_url: imageUrl, date: eventDate,  host: eventHost }
			]);
			// Redirect to the events page after successful creation
			goto('/projects');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="flex items-center justify-center h-full">
	<form>
		<!-- Event Details -->
		<div class="card bg-opacity-1 p-8 mr-4">
			<h2 class="text-3xl label mb-8">Event Details</h2>
			<label class="block mb-4">
				<span class="label p-2">Event Name</span>
				<input class="input mt-2" type="text" placeholder="Event Name" bind:value={eventName} required/>
			</label>
			<label class="block mb-4">
				<span class="label">Event Tagline</span>
				<input class="input mt-2" type="text" placeholder="Event Tagline" bind:value={eventTagline} required />
			</label>
			<label class="block mb-4">
				<span class="label">Event Host</span>
				<input class="input mt-2" type="text" placeholder="Event Host" bind:value={eventHost} required />
			</label>
			<label class="block mb-4">
				<span class="label">Image URL</span>
				<input class="input mt-2" type="text" placeholder="Image URL" bind:value={imageUrl} required />
			</label>
			<label class="block mb-4">
				<span class="label">Event Date</span>
				<input class="input mt-2" type="date" bind:value={eventDate} required />
			</label>
			<button class="button mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click={handleCreateProject}>Create Project</button>
		</div>
	</form>
</div>