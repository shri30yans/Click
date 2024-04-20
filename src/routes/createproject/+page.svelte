<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { goto } from '$app/navigation';

	let projectName = '';
	let projectContent = '';
	let imageUrl = '';
	let projectDate = '';
	let projectAuthor = '';

	async function handleCreateProject() {
		// Call the CreateProject function in the database and pass the required parameters
		try {
			await supabase.from('projects').insert([
				{ name: projectName, content: projectContent, image_url: imageUrl, author: projectAuthor }
			]);
			// Redirect to the projects page after successful creation
			goto('/projects');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="flex items-center justify-center h-full">
	<form>
		<!-- Project Details -->
		<div class="card bg-opacity-1 p-8 mr-4">
			<h2 class="text-3xl label mb-8">Project Details</h2>
			<label class="block mb-4">
				<span class="label p-2">Project Name</span>
				<input class="input mt-2" type="text" placeholder="Project Name" bind:value={projectName} required/>
			</label>
			<label class="block mb-4">
				<span class="label">Project Content</span>
				<input class="input mt-2" type="text" placeholder="Project Content" bind:value={projectContent} required />
			</label>
			<label class="block mb-4">
				<span class="label">Project Author</span>
				<input class="input mt-2" type="text" placeholder="Project Author" bind:value={projectAuthor} required />
			</label>
			<label class="block mb-4">
				<span class="label">Image URL</span>
				<input class="input mt-2" type="text" placeholder="Image URL" bind:value={imageUrl} required />
			</label>
			<button class="button mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click={handleCreateProject}>Create Project</button>
		</div>
	</form>
</div>
