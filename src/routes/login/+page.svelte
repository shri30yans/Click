<script>
	import { supabase } from '$lib/supabaseClient.js';
    import { goto } from '$app/navigation';

	
	// @ts-ignore
	let registerForm, loginForm;
	let loginEmail = '';
	let loginPassword = '';
	let regEmail = '';
	let regPassword = '';
	let regSRN= '';
	let registerError = ''; 
	let loginError = ''; 

	async function handleRegister() {
		// @ts-ignore
		if (!registerForm.checkValidity()) {
			console.log('Form inputs are invalid');
			return;
		}
		console.log("Register form called",regEmail, regPassword, regSRN);
		// @ts-ignore
		const { data, error } = await supabase.auth.signUp({
			email: regEmail,
			password: regPassword,
		})
		if (error) {
			registerError = error.message; // Store the error message
			console.log(error.message)
		}
	}

	async function handleLogin() {
		// @ts-ignore
		if (!loginForm.checkValidity()) {
			console.log('Form inputs are invalid');
			return;
		}
		console.log("Login form called",regEmail, regPassword, regSRN);
		// @ts-ignore
		const { data, error } = await supabase.auth.signInWithPassword({
			email: loginEmail,
			password: loginPassword,
		})
		if (error) {
			loginError = error.message; // Store the error message
			console.log(error.message)
		}
		else {
			console.log("Login successful");
			console.log(data);
			// Redirect to home page
			goto('/');

		}
	}

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error.message);
		}
		else {
			console.log("Sign out successful");
		}
	}
</script>

<div class="flex items-center justify-center h-full">
	<form bind:this={loginForm}>
		<!-- Sign Up Page -->
		<div class="card bg-opacity-1 p-8 mr-4">
			<h2 class="text-3xl label mb-8">Sign Up</h2>
			<label class="block mb-4">
				<span class="label p-2">Email</span>
				<input class="input mt-2" type="text" placeholder="Email" bind:value={loginEmail} required/>
			</label>
			<label class="block mb-4">
				<span class="label">Password</span>
				<input class="input mt-2" type="password" placeholder="Password" bind:value={loginPassword} required />
			</label>
			<button class="button mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{handleLogin}">Login</button>
			
			{#if loginError} <!-- Display the error message if it exists -->
				<p class="text-red-500">{loginError}</p>
			{/if}  
		</div>
	</form>
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
			{#if registerError} <!-- Display the error message if it exists -->
				<p class="text-red-500">{registerError}</p>
			{/if}
			<button class="button mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{handleRegister}">Register</button>
		</div>
	</form>
	<div class="card bg-opacity-1 p-20">
		<h2 class="text-3xl label mb-8">Sign out</h2>
		<button class="button mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4" on:click="{handleSignOut}">Sign Out</button>
	</div>
</div>

