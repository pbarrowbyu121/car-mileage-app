<template>
  <q-card class="my-card q-ma-md" @click="goToCar(car.vin)">
    <q-img :src="car.image" />

    <q-card-section> {{ car.year }} Honda Civic Silver </q-card-section>
    <q-card-section class="q-pt-none">
      Mileage: 35mpg
    </q-card-section>

    <q-card-section class="q-pt-none">
      Total Miles: 120,000
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CarCard",
  props: ["car"],
  methods: {
    goToCar(vin) {
      // console.log("goTo", props.row.performance);
      this.$router.push({ path: `car/${vin}` });
    }
  }
};
</script>
<style scoped></style>
