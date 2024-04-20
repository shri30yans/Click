<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabaseClient.js';

    let event_data: any[] = [];
    let filteredData: any[] = [];
    let searchQuery = '';  // Variable to store the user's search query

    // Function to fetch projects from the database
    async function fetchProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select('*');
        
        if (error) {
            console.error('Error fetching projects:', error);
        } else {
            event_data = data;
            // Initialize filteredData with all projects initially
            filteredData = data;
        }
    }

    // Function to filter projects based on the search query
    function searchProjects() {
        // Filter projects based on the search query (case-insensitive)
        filteredData = event_data.filter(project =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Fetch projects when the component mounts
    onMount(fetchProjects);
</script>

<h1 class="text-3xl ml-4 mt-2 font-bold">Projects</h1>
<button class="button ml-4 mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{() => goto('/createproject')}">+</button>

<!-- Search bar for filtering projects -->
<div class="my-4 flex items-center">
    <input
        type="text"
        class="input mr-2" 
        placeholder="Search projects by name..."
        bind:value={searchQuery}
        on:input={searchProjects}
    />
</div>

<div class="w-full-10 text-token grid grid-cols-4 md:grid-cols-4 gap-10 m-10">
    {#each filteredData as item (item.id)}
    <a class="card card-hover overflow-hidden" href="/">
        <header>
            <img src={item.image_url} class="bg-black/50 w-full aspect-[21/9]" alt="Post" />
        </header>
        <div class="p-4 space-y-4">
            <h3 class="h3" data-toc-ignore>{item.name}</h3>
            <h6 class="h6" data-toc-ignore>{item.content}</h6>
        </div>
        <hr class="opacity-50" />
        <footer class="p-4 flex justify-start items-center space-x-4">
            <div class="flex-auto flex justify-between items-center">
                <h6 class="font-bold" data-toc-ignore>By {item.author}</h6>
                <small>On {new Date(item.date).toLocaleDateString()}</small>
            </div>
        </footer>
    </a>
    {/each}
</div>