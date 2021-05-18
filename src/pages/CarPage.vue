<template>
  <div v-if="car">
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
    <TanksTable v-if="tanks && tanks.length > 0" :tanks="tanks" @updateTanks="getTanksAction"/>
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
  </div>
</template>

<script>
// import { defineComponent } from "@vue/composition-api";
import TanksTable from "../components/TanksTable";
import NewTankDialog from "../components/NewTankDialog";
import { calcMPG, sortTanks } from "../../utilFunctions";
import { mapActions } from "vuex";

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
    };
  },
  methods: {
    ...mapActions("carstore", ["getCarsAction", "getTanksAction"]),
    addTankDialogToggle() {
      this.newTankPopup = true;
    },
    deleteCar() {
      if(this.tanks) {
        let deleteTanksArr = this.tanks.map(tank => tank.id)
        deleteTanksArr.forEach(id => this.deleteTankAPI(id))
      }
      this.deleteCarAPI()
    },
    deleteCarAPI() {
      console.log("Delete car pressed")
      fetch(`http://localhost:5000/cars/${this.car.id}`, {
        method: "DELETE"
      })
      .then((res) => console.log("DELETE request", res))
      .then(() => {
        this.getCarsAction()
        this.$router.push({ path: `/` })
      })
    },
    getCarImage() {
      fetch(`http://api.carmd.com/v3.0/image?vin=${this.vin}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": "Basic MmM2M2Y4MzItODNlMC00NGE4LWFmZjItOGI2NGRhOTdkMzY3",
          "partner-token": "214086a09d764e0eae3840202841c336"
        }
      })
      .then(res => res.json())
      .then(res => console.log(res))
    },
    deleteTankAPI(id) {
      fetch(`http://localhost:5000/tanks/${id}`, {
        method: "DELETE",
      })
      .then((res) => {
        console.log("delete res", res)
      });
    },
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
