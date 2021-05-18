<template>
  <div id="q-app" class="text-krona-one">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex"

export default {
  name: "App",
  methods: {
    ...mapActions("carstore", ["getTanksAction", "getCarsAction"]),
    fetchCars() {
      console.log("fetchCars called from App")
      fetch("http://localhost:5000/cars", {
        method: "GET"
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log("response", res)
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
    },
  },
  created() {
    console.log("created called")
    this.fetchCars()
    this.fetchTanks();
  }
};
</script>
