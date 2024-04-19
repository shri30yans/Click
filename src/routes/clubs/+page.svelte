
<script lang="ts">
    import { Avatar, CodeBlock } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { getAllClubs,createClub } from '../../db/db_funcs';
    import { goto } from '$app/navigation';
    // let club_data: any[] = [];

    let club_data:any[] = [
  {
    "id": 1,
    "image": "https://th.bing.com/th/id/OIP.G1Ku5bhbw_sidIS5_pCHswHaHa?rs=1&pid=ImgDetMain",
    "title": "TECH CLUB",
    "subtitle": "HSP!",
    "content":"Step into the world of HSP, the premier tech club igniting innovation. Dive into the latest trends and advancements in technology, from AI to cybersecurity. Join us in shaping the future through hands-on projects, workshops, and networking opportunities. Let's explore the limitless possibilities of technology together!",
   
  },
  {
    "id": 2,
    "image": "https://th.bing.com/th/id/R.50f48c5f9453dc04fcf69384ebdb6781?rik=2nCupy6n4w%2bPsw&riu=http%3a%2f%2fwww.tvt.fr%2fvar%2ftvt%2fstorage%2fimages%2fmedia%2fimages%2factualites%2flogo_weal.png%2f149956-1-fre-FR%2flogo_weal.png_bloc_line.png&ehk=xd6r3lrkdbb0thOFjVi%2bAgroecTn%2f0WBMtC1B7sHjxU%3d&risl=&pid=ImgRaw&r=0",
    "title": "HEALTH-TECH CLUB",
    "subtitle": "WEAL",
    "content":"Join Weal, our health-tech club pioneering innovation in healthcare. Explore the latest advancements and solutions, from wearables to telemedicine platforms, to drive positive change. Revolutionize healthcare with us through innovation and collaboration!",
    
  },
  {
    "id": 3,
    "image": "https://i.pinimg.com/originals/01/19/de/0119deba21831077fd4e21e3d6020e88.jpg",
    "title": "Empowering Communities, Preserving Nature",
    "subtitle": " H.E.L.P. CLUB",
    "content":"Welcome to Help Club, where we empower communities and raise awareness for nature preservation. Join us in our mission to make a difference through community service projects and environmental initiatives. Together, let's create a brighter future for both people and the planet!",
   
  }
]

//     onMount(async () => {
//         const response = await fetch('/path/to/your/json/file.json');
//         club_data = await response.json();
//   });


</script>
  <button class="button align-right mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{() => goto('/createclub')}">+</button>

    <div class="w-full-10 text-token grid grid-cols-4 md:grid-cols-4 gap-10 m-10">
    <!-- {#each club_data as item (item.id)}
    <a class="card card-hover overflow-hidden" href="/elements/cards">
        <header>
        <img src={item.image} class="bg-black/50 w-full aspect-[21/9]" alt="Post" />
        </header>
        <div class="p-4 space-y-4">
        <h6 class="h6" data-toc-ignore>{item.title}</h6>
        <h3 class="h3" data-toc-ignore>{item.subtitle}</h3>
        <article>
            <p>{item.content}</p>
        </article>
        </div>
        <hr class="opacity-50" />
    </a>
{/each} -->
   
</div>