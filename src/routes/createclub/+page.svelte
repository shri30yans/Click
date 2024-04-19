<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { goto } from '$app/navigation';

	let clubName = '';
	let clubTagline = '';
	let imageUrl = '';

	async function handleCreateClub() {
		// Call the CreateClub function in the database and pass the required parameters
		try {
			await supabase.from('clubs').insert([
				{ name: clubName, tagline: clubTagline, image_url: imageUrl }
			]);
			// Redirect to the club page after successful creation
			goto('/clubs');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="flex items-center justify-center h-full">
	<form>
		<!-- Club Details -->
		<div class="card bg-opacity-1 p-8 mr-4">
			<h2 class="text-3xl label mb-8">Club Details</h2>
			<label class="block mb-4">
				<span class="label p-2">Name</span>
				<input class="input mt-2" type="text" placeholder="Club Name" bind:value={clubName} required/>
			</label>
			<label class="block mb-4">
				<span class="label">Tagline</span>
				<input class="input mt-2" type="text" placeholder="Club Tagline" bind:value={clubTagline} required />
			</label>
			<label class="block mb-4">
				<span class="label">Image URL</span>
				<input class="input mt-2" type="text" placeholder="Image URL" bind:value={imageUrl} required />
			</label>
			<button class="button mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{handleCreateClub}">Create Club</button>
		</div>
	</form>
</div>