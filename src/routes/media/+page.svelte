<!-- media.svelte -->
<script lang="ts">
    import FileDropzone from "svelte-file-dropzone";
  
    // Explicitly specify the type of the files variable
    let files: FileList = new DataTransfer().files;
  
    function onChangeHandler(event: CustomEvent<FileList>): void {
      files = event.detail;
      console.log('Selected files:', files);
    }
  
    function handleSubmit(): void {
      console.log('Submitted files:', files);
      // You can send files to the server or perform any other action
    }
  </script>
  
  <h1 class="text-3xl">MEDIA</h1>
  <br>
  
  <FileDropzone on:file={onChangeHandler}>
    <p>Drag and drop files here or click to select</p>
  </FileDropzone>
      
  <button on:click={handleSubmit}>Submit</button>
  