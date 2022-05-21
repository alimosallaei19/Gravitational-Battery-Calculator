<script>
	import { browser } from '$app/env';
	//define all important constants
	let disk_mass = 0,
		disk_radius = null;
	let mass_1 = null,
		mass_2 = null;
	let drop_height = null;
	let axle_radius = null;
	let gravity = 9.8;
	let N_generator = null;
	let B = null;

	if (browser) {
		let savedData = localStorage.getItem('values');
		if (savedData) {
			let data = JSON.parse(savedData);
			disk_mass = data.disk_mass;
			disk_radius = data.disk_radius;
			mass_1 = data.mass_1;
			mass_2 = data.mass_2;
			drop_height = data.drop_height;
			axle_radius = data.axle_radius;
			N_generator = data.N_generator;
			B = data.B;
		}
	}

	//define all calculated variables
	//let I_disk = 0.5 * disk_mass * Math.pow(disk_radius, 2);
	let acceleration = 0;
	let drop_time = 0;
	let angular_displacement = 0;
	let axle_area = 0;
	let emf = 0;

	let calculate = () => {
		let t_disk_mass = parseFloat(disk_mass).toFixed(2);
		let t_disk_radius = parseFloat(disk_radius);
		let t_mass_1 = parseFloat(mass_1);
		let t_mass_2 = parseFloat(mass_2);
		let t_drop_height = parseFloat(drop_height);
		let t_axle_radius = parseFloat(axle_radius);
		let t_N_generator = parseFloat(N_generator);
		let t_B = parseFloat(B);

		// save all variables into a json to save in localstorage
		let data = {
			disk_mass,
			disk_radius,
			mass_1,
			mass_2,
			drop_height,
			axle_radius,
			N_generator,
			B
		};

		if (browser) {
			localStorage.setItem('values', JSON.stringify(data));
		}

		acceleration = (Math.abs(t_mass_2 - t_mass_1) * gravity) / (t_mass_1 + t_mass_2);
		drop_time = Math.sqrt((2 * t_drop_height) / acceleration);
		angular_displacement =
			((3 * t_mass_1) / (t_disk_mass * t_disk_radius)) * acceleration * Math.pow(drop_time, 2);
		axle_area = Math.PI * Math.pow(t_axle_radius, 2);
		emf =
			-1 * t_N_generator * ((axle_area * t_B * (Math.cos(angular_displacement) - 1)) / drop_time);
		disk_mass = t_mass_1 + t_mass_2;
	};

	// $: disk_mass = parseFloat(disk_mass) || '';
	// $: disk_radius = parseFloat(disk_radius) || '';
	// $: mass_1 = parseFloat(mass_1) || '';
	// $: mass_2 = parseFloat(mass_2) || '';
	// $: drop_height = parseFloat(drop_height) || '';
	// $: axle_radius = parseFloat(axle_radius) || '';
	// $: N_generator = parseFloat(N_generator) || '';
	// $: B = parseFloat(B) || '';
</script>

<svelte:head>
	<title>Gravitational Battery Calculator</title>
</svelte:head>

<div class="max-w-screen-md mx-auto">
	<h1>Enter Values</h1>
	<div class="grid grid-cols-2 gap-x-3">
		<p class="text-xl font-bold mt-2 text-right">Disk Mass (kg)</p>
		<input bind:value={disk_mass} on:keyup={calculate} placeholder="Disk Mass" readonly />
		<p class="text-xl font-bold mt-2 text-right">Disk Radius (m)</p>
		<input bind:value={disk_radius} on:keyup={calculate} placeholder="Disk Radius" />
		<p class="text-xl font-bold mt-2 text-right">Mass 1 (kg)</p>
		<input bind:value={mass_1} on:keyup={calculate} placeholder="Mass 1" />
		<p class="text-xl font-bold mt-2 text-right">Mass 2 (kg)</p>
		<input bind:value={mass_2} on:keyup={calculate} placeholder="Mass 2" />
		<p class="text-xl font-bold mt-2 text-right">Drop Height (m)</p>
		<input bind:value={drop_height} on:keyup={calculate} placeholder="Drop Height" />
		<p class="text-xl font-bold mt-2 text-right">axle Radius (m)</p>
		<input bind:value={axle_radius} on:keyup={calculate} placeholder="axle Radius" />
		<p class="text-xl font-bold mt-2 text-right">Generator Turns</p>
		<input bind:value={N_generator} on:keyup={calculate} placeholder="N Generator" />
		<p class="text-xl font-bold mt-2 text-right">Magnetic Field in Generator (T)</p>
		<input bind:value={B} on:keyup={calculate} placeholder="B Field" />
	</div>
	<div class="flex justify-center bg-slate-200 mt-3 py-2 rounded drop-shadow-md">
		<button class="w-fit underline" on:click={calculate}>Calculate (if no update below)</button>
	</div>
	<div class="mt-16">
		<h1>Calculations</h1>
		<div class="flex gap-x-4">
			<b class="text-xl mt-2">Acceleration: </b>
			<input bind:value={acceleration} readonly />
			<span class="text-xl mt-2">m/s^2</span>
		</div>
		<div class="flex gap-x-4">
			<b class="text-xl mt-2">Drop Time: </b>
			<input bind:value={drop_time} readonly />
			<span class="text-xl mt-2">s</span>
		</div>
		<div class="flex gap-x-4">
			<b class="text-xl mt-2">Angular Displacement: </b>
			<input bind:value={angular_displacement} readonly />
			<span class="text-xl mt-2">rad</span>
		</div>
		<div class="flex gap-x-4">
			<b class="text-xl mt-2">axle Area: </b>
			<input bind:value={axle_area} readonly />
			<span class="text-xl mt-2">m^2</span>
		</div>
		<div class="flex gap-x-4">
			<b class="text-xl mt-2">EMF: </b>
			<input bind:value={emf} readonly />
			<span class="text-xl mt-2">V</span>
		</div>
	</div>
</div>
