<template>
  <div class="new-house">
    
    <span>Standing under the bat house and looking in all directions, select all habitat types that you see</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Forest Edge</option>
        <option>Wetland/Pond</option>
        <option>Stream/River</option>
        <option>Forest Gap</option>
        <option>Other</option>
    </select>
    <br>
    <span>Other: What other habitat type is it?</span>
    <br>
    <textarea v-model="message" placeholder="Enter habitat type"></textarea>
    <br><br>

    <span>what man made structures are there? Anything that humans may have built nearby bathouse</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Building</option>
        <option>Bridge</option>
        <option>Dam</option>
        <option>Fence</option>
        <option>Paved Roads</option>
        <option>Trail</option>
        <option>Dirt Road</option>
        <option>None</option>
        <option>Other</option>
    </select>
    <br>
    <span>Other: What other man-made structures were there?</span>
    <br>
    <textarea v-model="message" placeholder="Enter man-made structures"></textarea>
    <br><br>


    <span>what signs of human degradation are there on the site?</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Trash</option>
        <option>Dumping</option>
        <option>Erosion</option>
        <option>None</option>
        <option>Other</option>
    </select>
    <br>
    <span>Other: What other habit degradation is there?</span>
    <br>
    <textarea v-model="message" placeholder="Enter habit degradation"></textarea>
    <br><br>


    <span>Describe how noisy it is outside your bat house throughout the day and night.</span>
    <br>
    <span>Loud throughout…</span>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Day and night</option>
        <option>Day</option>
        <option>Night</option>
    </select>
    <br>
    <span>Medium noise throughout…</span>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Day and night</option>
        <option>Day</option>
        <option>Night</option>
    </select>
    <br>
    <span>Quiet throughout…</span>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Day and night</option>
        <option>Day</option>
        <option>Night</option>
    </select>
    <br>
    
    <span>Select all noise disturbances around the bat house that apply.</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Cars</option>
        <option>Businesses </option>
        <option>industry noises</option>
        <option>People/Residential noises</option>
        <option>Other</option>
    </select>
    <br>
    <span>Other: Describe the other noise pollution around your bat houses.</span>
    <br>
    <textarea v-model="message" placeholder="Noise description"></textarea>
    <br><br>


    <span>Select the type of light pollution around bat house at night.</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>no</option>
        <option>Lots</option>
        <option>Medium amounts </option>
        <option>Low amounts</option>
    </select>
    <span> of human lighting on</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>throughout</option>
        <option>inconsistent </option>
    </select>
    <span> the night</span>
    <br>
    
    <span>From your knowledge of the area or from looking at Google Maps, what is the nearest Water Resource?</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>River</option>
        <option>Stream </option>
        <option>Lake</option>
        <option>Pond</option>
        <option>Vernal Pool</option>
        <option>Inland Wetland</option>
        <option>Coastal Wetland</option>
        <option>None</option>
        <option>Other</option>
    </select>
    <br>
    <span>Other: What is the other water resource?</span>
    <br>
    <textarea v-model="message" placeholder="Noise description"></textarea>
    <br><br>

    <span>How far away is the nearest water resources? (Please specify if it is in feet, miles, meters, or kilometers.)</span>
    <br>
    <textarea v-model="message" placeholder="Noise description"></textarea>
    

    <br>
    <span> what type of geography do you see?</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Valley or Bottomland Hillside</option>
        <option>Ridgetop </option>
        <option>Plain (Flat Area)</option>
    </select>
    <br>

    <br>
    <span> What type of slope is the bat house on?</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Flat</option>
        <option>Gentle </option>
        <option>Undulating</option>
        <option>Steep</option>
    </select>
    <br>

    <span> Pictures taken on site in the north direction</span>
    <br>
    <form action="/action_page.php">
      <input type="file" name="pic" accept="image/*">
      <input type="submit">
    </form>

    <br>
    <span> Pictures taken on site in the south direction</span>
    <br>
    <form action="/action_page.php">
      <input type="file" name="pic" accept="image/*">
      <input type="submit">
    </form>

    <br>
    <span> Pictures taken on site in the east direction</span>
    <br>
    <form action="/action_page.php">
      <input type="file" name="pic" accept="image/*">
      <input type="submit">
    </form>

    <br>
    <span> Pictures taken on site in the west direction</span>
    <br>
    <form action="/action_page.php">
      <input type="file" name="pic" accept="image/*">
      <input type="submit">
    </form>

    <br>
    <span> What are the types of trees around the bat house?</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Entirely deciduous</option>
        <option>Entirely evergreen</option>
        <option>Mostly deciduous</option>
        <option>Mostly evergreen</option>
        <option>Equal of both types</option>
        <option>No tress near bat house</option>
    </select>


    <br>
    <span> Standing under the bat house and looking in all directions, what types of trees are there around the bat house?</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Only deciduous</option>
        <option>Only conifer</option>
        <option>Mostly deciduous</option>
        <option>Mostly conifer</option>
        <option>Equal of both types</option>
        <option>No tress near bat house</option>
    </select>

    <br>
    <span>Other significant features on site</span>
    <br>
    <textarea v-model="message" placeholder=""></textarea>


    <br>
    <span> Approximate Size of Bat House</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Small - about a foot long</option>
        <option>Only conifer</option>
        <option>Medium - one-three feet long</option>
        <option>Large - bigger than three feet long</option>
    </select>

    <br>
    <span>How many chambers are there in the bat house?</span>
    <br>
    <input type="number" name="quantity" min="0">

    <br>
    <span>Estimate how many hours of morning sunlight the bat house gets</span>
    <br>
    <input type="number" name="quantity" min="0">

    <br>
    <span>Estimate how many hours of afternoon sunlight the bat house gets</span>
    <br>
    <input type="number" name="quantity" min="0">


    <br>
    <span> What is the bat house mounted on?</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Building</option>
        <option>Pole by itself</option>
        <option>Tree</option>
        <option>Other</option>
        <option>Pole with another bat house</option>
        <option>back to back</option>
    </select>


    <br>
    <span>Other: What is the other structure the bat house is mounted on?</span>
    <br>
    <textarea v-model="message" placeholder=""></textarea>


    <br>
    <span>How far is the bottom of the bat house off the ground in feet?</span>
    <br>
    <input type="number" name="quantity" min="0">


    <br>
    <span> What direction is the bat house facing? Using a compass on a smartphone or a standard compass, stand under the bat house and look in direction the bat house is facing
    </span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>North</option>
        <option>North East</option>
        <option>East</option>
        <option>South East</option>
        <option>South</option>
        <option>South West</option>
        <option>West</option>
        <option>North West</option>
    </select>



    <br>
    <span> What is the color of the bat house?</span>
    <br>
    <select v-model="selected">
        <option selected="true" disabled="disabled">Please select one</option>
        <option>Black</option>
        <option>Dark Brown</option>
        <option>Medium Brown</option>
        <option>Light Brown</option>
        <option>Tan or Beige</option>
        <option>Natural Wood</option>
        <option>White</option>
        <option>Other</option> 
    </select>
    <br> 
    <span>Other: please specify: </span>
    <textarea v-model="message" placeholder=""></textarea>

    <br>
    <label for="start">Date of the bathouse installation: </label>
    <input type="date" id="start" name="house-install" min="2019-04-23">

    <br><br>
    <input type="submit" value="Submit">
    <input type="reset">


  </div>
</template>