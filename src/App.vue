<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions("carstore", ["getTanksAction", "getCarsAction"]),
    async fetchCars() {
      const res = await fetch("http://localhost:5000/cars");
      const data = await res.json();
      return data;
    },
    async fetchTanks() {
      const res = await fetch("http://localhost:5000/tanks");
      const data = await res.json();
      return data;
    }
  },
  async created() {
    let cars = await this.fetchCars();
    this.getCarsAction(cars);

    let tanks = await this.fetchTanks();
    this.getTanksAction(tanks);
  }
};
</script>
