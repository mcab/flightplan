<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>About</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-slides pager="true" :options="slideOpts">
        <ion-slide v-for="slide in text" :key="slide.id">
          <ion-list>
            <ion-item>
              <ion-grid>
                <ion-row
                  ><h2>{{ slide.title }}</h2></ion-row
                >
                <ion-row v-if="slide.subtitle"
                  ><h6>{{ slide.subtitle }}</h6></ion-row
                >
              </ion-grid>
            </ion-item>
            <ion-item v-for="(item, index) in slide.items" :key="index">
              <p>{{ item }}</p>
            </ion-item>
          </ion-list>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideOpts: {
        initialSlide: 1,
        speed: 400
      },
      text: {
        slide1: {
          id: 1,
          title: "About the Bat House Monitoring Project",
          items: [
            "We aim to protect bat populations by learning about the effects different environments and landscapes have on bat house occupancy by various species. The Bat House Monitoring Project succeeds with contributions by citizen scientists like you!"
          ]
        },
        slide2: {
          id: 2,
          title: "Why Bats Matter",
          items: [
            "Bats make up 25% of the more than 5,400 mammal species worldwide; however, only 8 bat species are native to Connecticut.",
            "Bats worldwide have varied diets, from flower nectar to frogs and fish. All CT bats eat insects.",
            "A single little brown bat can eat up to 1000 mosquitoes per hour.",
            "Only 3 species of bats actually drink blood, and they prefer other animal blood over human blood. None of them are present in the United States."
          ]
        },
        slide3: {
          id: 3,
          title: "Why Bats Matter",
          items: [
            "Bats save the corn-growing industry alone more than 1 billion dollars in pest control annually through the number of insects they eat.",
            "Less than 1% of all bats carry rabies, infecting 1 or 2 people in the United States annually. You cannot get rabies from just being near a bat, and there are few cases of bats infecting pets or livestock.",
            "Bats are actually very clean animals; when they are not eating or sleeping, they are usually grooming themselves.",
            "Bats do not get caught in people’s hair; they are skilled at dodging obstacles (including people) with a technique known as echolocation, and will only come near a person to catch nearby insects."
          ]
        },
        slide4: {
          id: 4,
          title: "Threats to Bats",
          subtitle: "Climate Change",
          items: [
            "Climate change has affected everything from hibernation periods to the abundance of prey for bats. Many bats have also not adapted to handle the rising worldwide temperatures, which can be deadly in the heat of summer."
          ]
        },
        slide5: {
          id: 5,
          title: "Threats to Bats",
          subtitle: "Wind Turbines",
          items: [
            "Wind turbine can have devastating effects on bats, to the extent that between 600,000 and 900,000 bats are killed each year from either crashing into the turbines, or even flying too close (the sudden change in air pressure can cause fatal lung injuries)."
          ]
        },
        slide6: {
          id: 6,
          title: "Threats to Bats",
          subtitle: "Habitat Destruction",
          items: [
            "The clearing of natural habitats has caused a decline in bat populations worldwide. Certain caves have also had fires set in them, killing thousands of roosting bats."
          ]
        },
        slide7: {
          id: 7,
          title: "Threats to Bats",
          subtitle: "White Nose Syndrome",
          items: [
            "However, one of the most deadly threats to bats today is a fungal disease known as White Nose Syndrome (WNS). It is believed to have been inadvertently introduced to North America from Europe, where the native bats are immune.",
            "Many species have been severely affected by the disease since its introduction in early 2006. It is most common in eastern states, but cases have been reported in the Midwest and West, as well as several Canadian provinces."
          ]
        },
        slide8: {
          id: 8,
          title: "Threats to Bats",
          subtitle: "White Nose Syndrome",
          items: [
            "WNS gets its name from the white fungus that grows on the muzzles and wings of infected bats. The disease causes bats to awaken and leave their hibernation sites early, which causes a loss of vital fat reserves, leading them to starve or freeze to death.",
            "WNS primarily affects hibernating bat species, which includes five out of the eight CT species – the big brown bat, little brown bat, long-eared bat, Indiana bat, and tri-colored bat."
          ]
        },
        slide9: {
          id: 9,
          title: "Threats to Bats",
          subtitle: "White Nose Syndrome",
          items: [
            "Many species have seen between 90 and 100 percent mortality rates in certain areas, with some being reduced to less than 1 percent of their pre-WNS population sizes.",
            "While WNS has had no recorded effects on humans, people are advised to stay away from caves closed for WNS to prevent the fungus from getting on clothes or caving gear, which could spread the disease to a healthy population of bats. The public should avoid caves with non-infected hibernating bats as well, in order to avoid disturbing them."
          ]
        },
        slide10: {
          id: 10,
          title: "Why Bat Houses",
          subtitle: "Bat houses will:",
          items: [
            "Provide safe locations for bats to live and raise young, increasing the chances of vital population growth after WNS.",
            "Provide an alterntive to human houses, decreasing the likelihood of bat/human interactions.",
            "Attract more bats to your yard, greatly reducing the number of pest insects around your home."
          ]
        },
        slide11: {
          id: 11,
          title: "Why Bat Houses",
          items: [
            "Bat houses provide homes for bats during the spring and summer. During the fall, bats begin to leave the houses and, depending on the species, either migrate to a warmer climate or find a larger hibernation site for the winter, returning to the bat houses in the next spring.",
            "Bat houses can vary greatly in size, from less than a foot tall to several feet. The number of 'rooms' varies as well, with several usually being preferable over one.",
            "Houses with multiple chambers are better suited to maternity colonies (mothers with their young), while single-chamber houses are more like ‘bachelor pads’ for bats."
          ]
        }
      }
    };
  }
};
</script>
