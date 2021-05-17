<template>
  <div>
    <CarCard v-for="car in cars" :key="car.vin" :car="car" />
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
    <q-dialog v-model="addCarDialog"><NewCarDialog /></q-dialog>
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
    addCarDialogToggle() {
      this.addCarDialog = true;
    },
    fetchCars() {
      fetch("http://localhost:5000/cars", {
        method: "GET"
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
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
  computed: {
    cars: {
      get() {
        return this.$store.state.carstore.cars;
      }
    }
  },
  async created() {
    this.fetchCars()
    this.fetchTanks();
  }
};
</script>
