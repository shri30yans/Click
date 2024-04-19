<script lang="ts">
    import { Avatar, CodeBlock } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient.js';


    let event_data: any[] = [];
    // console.log("Club:",event_data);
    
    async function fetchProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select('*');
        
        if (error) {
            console.error('Error fetching events:', error);
        } else {
            event_data = data;
            console.log(event_data)
        }
    }

    onMount(fetchProjects);

</script>
    <h1 class="text-3xl font-bold">Projects</h1>
  <button class="button align-right mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{() => goto('/createproject')}">+</button>

    <div class="w-full-10 text-token grid grid-cols-4 md:grid-cols-4 gap-10 m-10">
    {#each event_data as item (item.id)}
    <a class="card card-hover overflow-hidden" href="/elements/cards">
        <header>
        <img src={item.image_url} class="bg-black/50 w-full aspect-[21/9]" alt="Post" />
        </header>
        <div class="p-4 space-y-4">
        <h6 class="h6" data-toc-ignore>{item.name}</h6>
        <h3 class="h3" data-toc-ignore>{item.tagline}</h3>
        <article>
            <p>{item.tagline}</p>
        </article>
        </div>
        <hr class="opacity-50" />
        <footer class="p-4 flex justify-start items-center space-x-4">
        <!-- <Avatar src={item.avatar} width="w-8" /> -->
        <div class="flex-auto flex justify-between items-center">
            <h6 class="font-bold" data-toc-ignore>By {item.host}</h6>
            <small>On {new Date(item.date).toLocaleDateString()}</small>
        </div>
        </footer>
    </a>
{/each}
   
</div>
