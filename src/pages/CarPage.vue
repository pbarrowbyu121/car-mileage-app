<template>
  <div>
    <q-img :src="car.image">
      <div class="absolute-bottom text-subtitle1 text-center">
        "{{ car.name }}"
      </div>
    </q-img>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="col">Year:</div>
          <div class="col">{{ car.year }}</div>
        </div>
        <div class="row">
          <div class="col">Make:</div>
          <div class="col">{{ car.make }}</div>
        </div>
        <div class="row">
          <div class="col">Model:</div>
          <div class="col">{{ car.model }}</div>
        </div>
        <div class="row">
          <div class="col">Color:</div>
          <div class="col">{{ car.color }}</div>
        </div>
        <div class="row">
          <div class="col">Mileage:</div>
          <div class="col">{{ carMPG }} mpg</div>
        </div>
        <div class="row">
          <div class="col">License:</div>
          <div class="col">{{ car.license }}</div>
        </div>
        <div class="row">
          <div class="col">VIN:</div>
          <div class="col">{{ car.vin }}</div>
        </div>
      </q-card-section>
    </q-card>
    <TanksTable :tanks="car.tanks" />
    <q-dialog v-model="newTankPopup"
      ><NewTankDialog @close-dialog="closeDialog"
    /></q-dialog>
    <div class="text-center q-my-md">
      <q-btn
        outline
        rounded
        color="primary"
        label="Add Tank"
        @click="addTankDialogToggle"
      />
    </div>
  </div>
</template>

<script>
// import { defineComponent } from "@vue/composition-api";
import TanksTable from "../components/TanksTable";
import NewTankDialog from "../components/NewTankDialog";
import { calcMPG } from "../../utilFunctions";

export default {
  name: "CarPage",
  components: {
    TanksTable,
    NewTankDialog
  },
  props: ["vin"],
  data() {
    return {
      newTankPopup: false
      //   car: cars[0]
      //   car: cars.filter(car => car.vin === this.vin)[0]
    };
  },
  methods: {
    addTankDialogToggle() {
      this.newTankPopup = true;
    },
    closeDialog() {
      this.newTankPopup = false;
    }
  },
  computed: {
    car: {
      get() {
        return this.$store.state.carstore.cars.filter(
          car => car.vin === this.vin
        )[0];
      }
    },
    carMPG: {
      get() {
        let car = this.$store.state.carstore.cars.filter(
          car => car.vin === this.vin
        )[0];
        return calcMPG(car.tanks);
      }

      // calcMPG(this.car.tanks)
    }
  }
};
</script>
