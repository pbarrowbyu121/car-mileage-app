<template>
  <q-card class="my-card q-ma-md" @click="goToCar(car.vin)">
    <q-img :src="car.image">
      <div class="absolute-bottom text-subtitle1 text-center">
        "{{ car.name }}"
      </div>
    </q-img>

    <q-card-section class="text-center">
      {{ car.year }} {{ car.make }} {{ car.model }}
    </q-card-section>
    <q-card-section v-if="carMPG && miles" class="q-pt-none">
      <div class="row">
        <div class="col">Mileage:</div>
        <div class="col">{{ carMPG }} mpg</div>
      </div>
      <div class="row">
        <div class="col">Total Miles:</div>
        <div class="col">{{ miles | formatMiles }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { calcMPG } from "../../utilFunctions";
export default {
  name: "CarCard",
  props: ["car"],
  methods: {
    goToCar(vin) {
      this.$router.push({ path: `car/${vin}` });
    }
  },
  computed: {
    miles: {
      get() {
        let tanks = this.$store.state.carstore.tanks.filter(
          tank => tank.vin === this.car.vin
        );
        if (tanks.length > 0) {
          return tanks[0].odometer;
        }
        return 0;
      }
    },
    carMPG: {
      get() {
        let tanks = this.$store.state.carstore.tanks.filter(
          tank => tank.vin === this.car.vin
        );
        if (tanks.length > 0) {
          return calcMPG(tanks);
        } else {
          return null;
        }
      }
    }
  },
  filters: {
    formatMiles(val) {
      let valInt = parseInt(val);
      return valInt.toLocaleString();
    }
  }
};
</script>
<style scoped></style>
