<script>
    import { onMount } from 'svelte';
    import PdfViewer from 'svelte-pdf';
  
    let selectedOption = 'option1'; // Default option
    let pdfUrl = '';
    let loading = false;
    let validUrl = true;
    let selectedFile = null;
  
    const options = [
      { value: 'option1', label: 'Sample PDF', url: 'https://pdf.ac/2u3mf0a' },
      { value: 'option2', label: 'Sample PDF 2', url: 'https://www.pdf995.com/samples/pdf.pdf' },
      // Add more options as needed
    ];
  
    function handleChange(event) {
      selectedOption = event.target.value;
      pdfUrl = options.find(option => option.value === selectedOption).url;
      validUrl = true; // Reset the validity flag
    }
  
    function handleFileInput(event) {
      const file = event.target.files[0];
      if (file) {
        selectedFile = file;
        pdfUrl = URL.createObjectURL(file);
        validUrl = true;
        checkUrlValidity();
      }
    }
  
    onMount(() => {
      // Initialize PDF URL with default option
      pdfUrl = options.find(option => option.value === selectedOption).url;
    });
  
    async function checkUrlValidity() {
      loading = true;
      try {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
          validUrl = false;
          pdfUrl = ''; // Clear the PDF URL if it's not valid
        }
      } catch (error) {
        validUrl = false;
        pdfUrl = ''; // Clear the PDF URL if an error occurs during fetch
      } finally {
        loading = false;
      }
    }
  </script>
  
  <label class="label">
  <h1>Select a file to view:</h1>
  <select class="select" bind:value={selectedOption} on:change={handleChange}>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  </label>
  
  <label class="label">
  <input type="file" accept=".pdf" on:change={handleFileInput} />
  </label>
  
  {#if loading}
  <p>Loading...</p>
  {:else if !validUrl}
  <p>Invalid URL. Please select another option.</p>
  {:else}
  <div class="p-50">
    <PdfViewer class="h-50 w-50 p-50" url={pdfUrl} />
  </div>
  {/if}