<!-- <script>
	import PdfViewer from 'svelte-pdf';
</script>

<PdfViewer class = "h-50 w-50"url= 'https://raw.githubusercontent.com/vinodnimbalkar/svelte-pdf/369db2f9edbf5ab8c87184193e1404340729bb3a/public/sample.pdf' /> -->
<script>
    import { onMount } from 'svelte';
	import PdfViewer from 'svelte-pdf';

    
    let selectedOption = 'option1'; // Default option
    let pdfUrl = '';
  
    const options = [
      { value: 'option1', label: 'Option 1', url: 'https://raw.githubusercontent.com/vinodnimbalkar/svelte-pdf/369db2f9edbf5ab8c87184193e1404340729bb3a/public/sample.pdf' },
      { value: 'option2', label: 'Option 2', url: 'https://example.com/option2.pdf' },
      // Add more options as needed
    ];


  
    function handleChange(event) {
      selectedOption = event.target.value;
      pdfUrl = options.find(option => option.value === selectedOption).url;
    }
  
    onMount(() => {
      // Initialize PDF URL with default option
      pdfUrl = options.find(option => option.value === selectedOption).url;
    });
  </script>
  

  
<label class="label">
	<h1>Select a file to view.</h1>
    <select class="select" bind:value={selectedOption} on:change={handleChange}>
        {#each options as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
</label>
				
  
  {#if pdfUrl}
    <div class ="p-50">
        <PdfViewer class="h-50 w-50 p-50" url={pdfUrl} />
    </div>
    {:else}
    <p>Loading...</p>
  {/if}
  