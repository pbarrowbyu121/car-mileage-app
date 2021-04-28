<template>
  <q-card class="my-card q-ma-md" @click="goToCar(car.vin)">
    <q-img :src="car.image">
      <div class="absolute-bottom text-subtitle1 text-center">
        "{{ car.name }}"
      </div>
    </q-img>

    <q-card-section>
      {{ car.year }} {{ car.make }} {{ car.model }}
    </q-card-section>
    <q-card-section class="q-pt-none">
      Mileage: 35mpg
    </q-card-section>
    <q-card-section class="q-pt-none"> Mileage: {{ carMPG }} </q-card-section>

    <q-card-section class="q-pt-none">
      Total Miles: {{ miles }}
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
      // console.log("goTo", props.row.performance);
      this.$router.push({ path: `car/${vin}` });
    }
  },
  computed: {
    miles() {
      return this.car.tanks[0].odometer;
    },
    carMPG() {
      return calcMPG(this.car.tanks);
    }
  }
};
</script>
<style scoped></style>
