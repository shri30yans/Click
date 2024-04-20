<!-- Importing scripts should be done in the HTML file, not here -->

<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { goto } from '$app/navigation';
	
    // @ts-ignore
    let registerForm;
    let regEmail = '';
    let regPassword = '';
    let regSRN = '';
    let registerError = '';

    async function handleRegister() {
        if (!registerForm.checkValidity()) {
            console.log('Form inputs are invalid');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: regEmail,
            password: regPassword,
        });

        if (error) {
            registerError = error.message; // Store the error message
            console.log(error.message);
        } else {
            // Registration successful
            console.log('Registration successful');
            // Optionally, you can redirect to another page after successful registration
            goto('/login'); // Redirect to the signup success page
        }
    }
</script>

<div class="flex items-center justify-center h-full">
    <form bind:this={registerForm}>
        <!-- Register Page -->
        <div class="card bg-opacity-90 p-8 mr-4">
            <h2 class="text-3xl label mb-8">Register</h2>
            <label class="block mb-4">
                <span class="label">Email</span>
                <input class="input mt-2" type="email" placeholder="Email" bind:value={regEmail} required />
            </label>
            <label class="block mb-4">
                <span class="label">SRN</span>
                <input class="input mt-2" type="text" placeholder="SRN" bind:value={regSRN} required minlength="8" />
            </label>
            <label class="block mb-4">
                <span class="label">Password</span>
                <input class="input mt-2" type="password" placeholder="Password" bind:value={regPassword} minlength="6" required />
            </label>
            {#if registerError}
                <!-- Display the error message if it exists -->
                <p class="text-red-500">{registerError}</p>
            {/if}
            <button class="button mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{handleRegister}">Register</button>
        </div>
    </form>
</div>