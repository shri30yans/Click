<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { goto } from '$app/navigation';

	let postTitle = '';
	let postContent = '';
	let postImageUrl = '';
	let postAuthor = '';


	async function handleCreatePost() {
		// Call the createPost function in the database and pass the required parameters
		try {
			await supabase.from('posts').insert([
				{ name: postTitle, content:postContent, image_url: postImageUrl, author: postAuthor }
			]);
			// Redirect to the posts page after successful creation
			goto('/posts');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="flex items-center justify-center h-full">
	<form>
		<!-- Post Details -->
		<div class="card bg-opacity-1 p-8 mr-4">
			<h2 class="text-3xl label mb-8">Post Details</h2>
			<label class="block mb-4">
				<span class="label p-2">Post Title</span>
				<input class="input mt-2" type="text" placeholder="Post Title" bind:value={postTitle} required/>
			</label>
			<label class="block mb-4">
				<span class="label">Post Content</span>
				<input class="input mt-2" type="text" placeholder="Post Description" bind:value={postContent} required />
			</label>
			<label class="block mb-4">
				<span class="label">Post Author</span>
				<input class="input mt-2" type="text" placeholder="Post Author" bind:value={postAuthor} required />
			</label>
			<label class="block mb-4">
				<span class="label">Image URL</span>
				<input class="input mt-2" type="text" placeholder="Image URL" bind:value={postImageUrl} required />
			</label>
			<button class="button mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click={handleCreatePost}>Create Post</button>
		</div>
	</form>
</div>