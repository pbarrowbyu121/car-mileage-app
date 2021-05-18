<template>
  <div>
    <CarCard v-for="car in cars" :key="car.id" :car="car" />
    <div class="text-center q-my-md">
      <q-btn
        outline
        rounded
        color="primary"
        label="Add Car"
        @click="addCarDialogToggle"
      />
    </div>
    <!-- Add Car Dialog -->
    <q-dialog v-model="addCarDialog"><NewCarDialog @updateCars="fetchCars"/></q-dialog>
  </div>
</template>

<script>
import CarCard from "../components/CarCard";
import NewCarDialog from "../components/NewCarDialog";
import { mapActions } from "vuex"

export default {
  name: "PageIndex",
  components: {
    CarCard,
    NewCarDialog
  },
  data() {
    return {
      addCarDialog: false
    };
  },
  methods: {
    ...mapActions("carstore", ["getTanksAction", "getCarsAction"]),
    fetchCars() {
      console.log("fetchCars called from Index")
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
    addCarDialogToggle() {
      this.addCarDialog = true;
    },
  },
  computed: {
    cars() {
      return this.$store.state.carstore.cars;
    }
  },
};
</script>
