<script lang="ts">
    import { Avatar, CodeBlock } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient.js';


    let event_data: any[] = [];
    // console.log("Club:",event_data);
    
    async function fetchPosts() {
        const { data, error } = await supabase
            .from('posts')
            .select('*');
        
        if (error) {
            console.error('Error fetching events:', error);
        } else {
            event_data = data;
            console.log(event_data)
        }
    }

    onMount(fetchPosts);

</script>
    <h1 class="text-3xl ml-5 font-bold">Posts</h1>
    <button class="button ml-5 mt-4 mr-50 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{() => goto('/createpost')}">+</button>

    <div class="w-full-10 text-token grid grid-cols-1 md:grid-cols-1 gap-10 m-10">
    {#each event_data as item (item.id)}
    <a class="card card-hover overflow-hidden" href="/elements/cards">
        <header>
        <img src={item.image_url} class="bg-black/50 w-full aspect-[21/9]" alt="Post" />
        </header>
        <div class="p-4 space-y-4">
        <h3 class="h3" data-toc-ignore>{item.name}</h3>
        <h5 class = "h5">{item.content}</h5>
        </div>
        <hr class="opacity-50" />
        <footer class="p-4 flex justify-start items-center space-x-4">
        <!-- <Avatar src={item.avatar} width="w-8" /> -->
        <div class="flex-auto flex justify-between items-center">
            <h6 class="font-bold" data-toc-ignore>By {item.author}</h6>
            <small>On {new Date(item.date).toLocaleDateString()}</small>
        </div>
        </footer>
    </a>
{/each}
   
</div>
