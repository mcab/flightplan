<template>
  <div class="new-house">
    <h1>Add a New Bat House</h1>

    <!-- watcher -->
    <h3>Watcher Information</h3>
    <p>Watcher (user) providing the survey data for this bat house. Please enter your name and email address. 
    Your email will be used when a member of the Sponsor team needs to visit the bat house to make an audio recording.</p>
    <span>Watcher name: </span>
    <input type="textbox" placeholder="Enter name here"></input>
    <br>
    <span>Watcher email address: </span>
    <input type="email" name="email" placeholder="Enter email address"></input>
    <br>
    <span>Watcher's phone number (optional): </span>
    <input type="tel" name="phone" placeholder="Optional" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"></input>
    
    <br><br>
    <!-- location -->
    <h3>Location Information</h3>
    <p>Please enter the location information for the bat house.</p>
    <span>Longitude: </span>
    <input type="number" placeholder="Longitude: 0.000000"></input>
    <br>
    <span>Latitude: </span>
    <input type="number" placeholder="Latitude: 0.000000"></input>
    <p></p>

    <!-- Town Name -->
    <span>Town name where bat house is located: </span>
    <!--<p style="white-space: pre-line;">{{ message }}</p>-->
    <input type="textbox" placeholder="Enter town name here"></textarea>
    <br>
    <br>
    <!-- Property Type -->
    <h3>Property Type</h3>
    <span>Property type where bat house is located:</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>State</option>
        <option>Town</option>
        <option>School</option>
        <option>Land Trust</option>
        <option>Private</option>
        <option>Other</option>
    </select>
    <br>
    <span>Property type if Other was selected:</span>
    <br>
    <textarea v-model="message" placeholder="Enter property type"></textarea>
    <br><br>

    <!-- Date Created -->
    <label for="start">Date when house was created: </label>
    <input type="date" id="start" name="house-create" min="2015-01-01">

    <!-- Submit -->
    <br><br>
    <input type="submit" value="Submit">
    <input type="reset">

  </div>
</template>
