<script lang="ts">
  
  let club_data:any[] = [
  {
    "id": 1,
    "image": "https://i.imgur.com/iMm4RIF.png?1",
    "title": "Open Sorcery.",
    "subtitle": "HSP",
    "link":"https://www.instagram.com/hsp.pesuecc/",
    "content":"Step into the world of HSP, the premier tech club igniting innovation. Dive into the latest trends and advancements in technology, from AI to cybersecurity. Join us in shaping the future through hands-on projects, workshops, and networking opportunities. Let's explore the limitless possibilities of technology together!",
  
  },
  {
    "id": 2,
    "image": "https://th.bing.com/th/id/R.50f48c5f9453dc04fcf69384ebdb6781?rik=2nCupy6n4w%2bPsw&riu=http%3a%2f%2fwww.tvt.fr%2fvar%2ftvt%2fstorage%2fimages%2fmedia%2fimages%2factualites%2flogo_weal.png%2f149956-1-fre-FR%2flogo_weal.png_bloc_line.png&ehk=xd6r3lrkdbb0thOFjVi%2bAgroecTn%2f0WBMtC1B7sHjxU%3d&risl=&pid=ImgRaw&r=0",
    "title": "The Health-Tech Revolution.",
    "subtitle": "WEAL",
    "link":"https://www.instagram.com/weal_pesu/",
    "content":"Join Weal, our health-tech club pioneering innovation in healthcare. Explore the latest advancements and solutions, from wearables to telemedicine platforms, to drive positive change. Revolutionize healthcare with us through innovation and collaboration!",
    
  },
  {
    "id": 3,
    "image": "https://i.pinimg.com/originals/01/19/de/0119deba21831077fd4e21e3d6020e88.jpg",
    "title": "Empowering Communities, Preserving Nature",
    "subtitle": " H.E.L.P. CLUB",
    "link": "https://www.instagram.com/humans_of_pes/",
    "content":"Welcome to Help Club, where we empower communities and raise awareness for nature preservation. Join us in our mission to make a difference through community service projects and environmental initiatives. Together, let's create a brighter future for both people and the planet!",
  
  },
  {
    "id": 4,
    "image": "https://i.pinimg.com/originals/9e/06/68/9e066856a48fead161c70b165c965ffb.jpg",
    "title": "Where the cosmos becomes your dance floor.",
    "subtitle": "EQUINOX",
    "link": "https://www.instagram.com/equinox.pes/",
    "content":"Equinox invites you to dance under the cosmos, where stellar beats and celestial vibes collide for an unforgettable experience. Join us in this intergalactic adventure where every night is a cosmic celebration."
  
  },
  {
    "id": 5,
    "image": "https://c8.alamy.com/comp/2RCHGRF/acm-logo-acm-letter-acm-letter-logo-design-intitials-acm-logo-linked-with-circle-and-uppercase-monogram-logo-acm-typography-for-technology-busine-2RCHGRF.jpg",
    "title": "Soar beyond limits.",
    "subtitle": "Avions",
    "link": "https://www.instagram.com/acmpesuecc/",
    "content":"Dive into the world of aircraft and drones with ACM Airborne. Experience the thrill of flight and innovation as we explore the skies together. Join us and reach new heights!",
  
  },
  {
    "id": 6,
    "image": "https://i.pinimg.com/originals/0b/12/e4/0b12e49c60d24608fb29178dadb4f47b.gif",
    "title": " Where the beat meets the street",
    "subtitle": "HASHTAG",
    "link": "https://www.instagram.com/pesu.hashtagcrew//",
    "content":"Where urban beats and street style collide for an unforgettable dance experience.",
  
  }
]
</script>
  <div class="w-full-10 text-token grid grid-cols-4 md:grid-cols-4 gap-10 m-10">
  {#each club_data as item (item.id)}
    <a class="card card-hover overflow-hidden" href="{item.link}">
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
  {/each}
 
</div>