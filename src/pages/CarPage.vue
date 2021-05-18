<template>
  <div v-if="car">
    <q-img :src="car.image">
      <div class="absolute-bottom text-subtitle1 text-center">
        "{{ car.name }}"
      </div>
    </q-img>
    <q-card class="my-card">
      <q-btn dense round flat color="grey" @click="editCar" icon="edit" class="absolute-top-right q-pr-sm q-pt-sm"/>
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
    <TanksTable v-if="tanks && tanks.length > 0" :tanks="tanks" />
    <q-dialog v-model="newTankPopup"><NewTankDialog :vin="car.vin" /></q-dialog>
    <div class="text-center q-my-md">
      <q-btn
        outline
        rounded
        color="primary"
        label="Add Tank"
        @click="addTankDialogToggle"
      />
    </div>
    <div class="text-center q-my-md">
      <q-btn
        rounded
        color="negative"
        label="Delete Car"
        @click="deleteCar"
      />
    </div>
    <q-dialog v-model="editCarPopup"><EditCarDialog :car="car"/></q-dialog>
  </div>
</template>

<script>
// import { defineComponent } from "@vue/composition-api";
import TanksTable from "../components/TanksTable";
import NewTankDialog from "../components/NewTankDialog";
import EditCarDialog from "../components/EditCarDialog";
import { calcMPG, sortTanks } from "../../utilFunctions";
import { mapActions } from "vuex";

export default {
  name: "CarPage",
  components: {
    TanksTable,
    NewTankDialog,
    EditCarDialog
  },
  props: ["vin"],
  data() {
    return {
      newTankPopup: false,
      editCarPopup: false
    };
  },
  methods: {
    ...mapActions("carstore", ["getCarsAction", "getTanksAction", "deleteCarAction", "deleteTankAction"]),
    addTankDialogToggle() {
      this.newTankPopup = true;
    },
    async deleteCar() {
      if(this.tanks) {
        let deleteTanksArr = this.tanks.map(tank => tank.id)
        deleteTanksArr.forEach(id => this.deleteTankAction(id))
      }
      await this.deleteCarAction(this.car.id)
      await this.getCarsAction()
      this.$router.push({ path: '/' })
    },
    editCar() {
      console.log("editCar pressed")
      this.editCarPopup = true
    }
  },
  computed: {
    car() {
      return this.$store.state.carstore.cars.filter(
        car => car.vin === this.vin
      )[0]
    },
    tanks() {
      return sortTanks(this.$store.state.carstore.tanks.filter(tank => tank.vin === this.vin), "desc")
    },
    carMPG() {
      let tanks = this.$store.state.carstore.tanks.filter(
        tank => tank.vin === this.vin
      );
      if (tanks.length > 0) {
        return calcMPG(tanks);
      } else {
        return null;
      }
    }
  }
};
</script>
