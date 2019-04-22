<template>
	<div class="Observation">
		<h1>This is an Observation page</h1>
			
			<!-- HOUSE ID   -->
			<input v-model="house_id" placeholder="Bat House ID">
			<br>

			<!-- NUMBER OF BAT OCCUPANTS   -->
			<select v-model="nummber_of_bats">
				<option disabled value="">Please select one</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
				<option>6+</option>
			</select>
			<span>Selected: {{ selected }}</span>
			<br>
			
			<!-- SPECIES ID  -->
			<select v-model="nummber_of_bats">
				<option disabled value="">Please select one</option>
				<option>Big Brown Bat</option>
				<option>Little Brown Bat</option>
				<option>Nothern Long-Eared Bat</option>
				<option>Indiana Bat</option>
				<option>Silver-Haired Bat</option>
				<option>Hoary Bat</option>
				<option>Eastern Red Bat</option>
				<option>Tri-Colored Bat</option>
			</select>
			<span>Selected: {{ selected }}</span>
			<br>
			
			<!-- START DATE  -->
			<input type="datetime-local" value="2016-04-12T23:20" />
			<br>
			<br>	
		
			<!-- END DATE  -->
			<input type="datetime-local" value="2016-04-12T23:20" />
			<br>
				
			<!-- NOTES  -->
			<span>Notes:</span>
				<p style="white-space: pre-line;">{{ message }}</p>
				<br>
			<textarea v-model="notes" placeholder="add multiple lines"></textarea>
			<br>

			<!-- SUBMIT  -->
			<button v-on:click="say('Submitted Observation Information')">Submit</button>	
	</div>
</template>


<script>

export default {
};
</script>




