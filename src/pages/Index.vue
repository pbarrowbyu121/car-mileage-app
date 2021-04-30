<template>
  <div>
    <!-- <q-page class="flex flex-center"> -->
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
    <!-- </q-page> -->
  </div>
</template>

<script>
import CarCard from "../components/CarCard";
import NewCarDialog from "../components/NewCarDialog";
// import { cars } from "../../dummyData";
import { mapActions } from "vuex";

export default {
  name: "PageIndex",
  components: {
    CarCard,
    NewCarDialog
  },
  data() {
    return {
      // cars: cars,
      addCarDialog: false
    };
  },
  methods: {
    ...mapActions("carstore", ["getTanksAction", "getCarsAction"]),
    addCarDialogToggle() {
      this.addCarDialog = true;
    },
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
  computed: {
    cars: {
      get() {
        return this.$store.state.carstore.cars;
      }
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
