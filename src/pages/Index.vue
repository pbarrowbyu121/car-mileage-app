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
import { cars } from "../../dummyData";
export default {
  name: "PageIndex",
  components: {
    CarCard,
    NewCarDialog
  },
  data() {
    return {
      cars: cars,
      addCarDialog: false
    };
  },
  methods: {
    addCarDialogToggle() {
      this.addCarDialog = true;
    }
  }
};
</script>
