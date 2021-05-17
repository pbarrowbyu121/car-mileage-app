<template>
  <div id="q-app" class="text-krona-one">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions("carstore", ["getTanksAction", "getCarsAction"]),
    fetchCars() {
      fetch("http://localhost:5000/cars", {
        method: "GET"
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        // console.log("DATA", res)
        this.getCarsAction(res)
      })
      .catch(e => {
        console.log(e)
      })
    },
    fetchTanks() {
      fetch("http://localhost:5000/tanks", {
        method: "GET"
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        this.getTanksAction(res)
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
  async created() {
    this.fetchCars()
    this.fetchTanks();
  }
};
</script>
