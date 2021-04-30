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
    addCarDialogToggle() {
      this.addCarDialog = true;
    }
  },
  computed: {
    cars: {
      get() {
        return this.$store.state.carstore.cars;
      }
    }
  }
};
</script>
