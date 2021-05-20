<template>
  <q-card class="my-card text-permanent-marker text-krona-one">
    <q-card-section>
      <div class="text-h6">Add New Car</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- Year -->
        <q-select filled dense v-model="year" :options="yearOptions" @input="getCarMakes" label="Year" />
        <!-- Make -->
        <q-select
          v-if="year && makeOptionsAll.length > 0"
          dense
          filled
          v-model="make"
          use-input
          input-debounce="0"
          label="Make"
          :options="makeOptions"
          @filter="filterFnMakes"
          style="width: 250px"
          @input="getCarModels"
          >

      </q-select>

        <!-- Model -->
        <q-select
          v-if="make && modelOptionsAll.length > 0"
          dense
          filled
          v-model="model"
          use-input
          input-debounce="0"
          label="Model"
          :options="modelOptions"
          @filter="filterFnModels"
          style="width: 250px"
          >

      </q-select>

        <!-- Color -->
        <q-input filled v-model="color" label="Color" dense />

        <!-- VIN -->
        <q-input filled v-model="vin" label="VIN" dense />

        <!-- License -->
        <q-input filled v-model="license" label="License Plate" dense />

        <!-- Nickname -->
        <q-input filled v-model="name" label="Nickname" dense />

        <!-- Image address -->
        <q-input filled v-model="image" label="Image address" dense />

        <div>
          <q-btn v-close-popup type="submit" color="primary">Add Car</q-btn>
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card-section>

    <!-- <q-separator /> -->

    <q-card-actions align="right">
      <q-btn v-close-popup flat color="primary" label="Cancel" />
    </q-card-actions>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script>
import { mapActions } from "vuex"
import { uid } from "quasar";
import axios from "axios";

export default {
  name: "NewCarDialog",
  data() {
    return {
      year: null,
      make: null,
      model: null,
      color: null,
      vin: null,
      license: null,
      name: null,
      image: null,
      yearOptions: [
        1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021
      ],
      makeOptions: [],
      makeOptionsAll:[],
      modelOptions: [],
      modelOptionsAll: [],
      loading: false
    };
  },
  methods: {
    ...mapActions("carstore", ["getCarsAction", "addCarAction"]),
    filterFnMakes (val, update) {
      if (val === '') {
        update(() => {
          this.makeOptions = this.makeOptionsAll
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.makeOptions = this.makeOptionsAll.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFnModels (val, update) {
      if (val === '') {
        update(() => {
          this.modelOptions = this.modelOptionsAll
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.modelOptions = this.modelOptionsAll.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit() {
      let newCarObj = {
        id: uid(),
        year: this.year,
        make: this.make,
        model: this.model,
        color: this.color,
        vin: this.vin,
        license: this.license,
        name: this.name,
        image: this.image
      };
      this.addCarAction(newCarObj).then(response => this.getCarsAction())
    },
    onReset() {
      // resets the form, clears state
      this.year = null;
      this.make = null;
      this.model = null;
      this.color = null;
      this.vin = null;
      this.license = null;
      this.name = null;
      this.image = null;
    },

    // axios version of get request for makes
    getCarMakes() {
      this.loading = true
      axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json`)
      .then(response => {
        console.log("external GET makes", response)
        this.makeOptionsAll = response.data.Results.map(result => result.Make_Name).sort()
        this.loading = false
      })
    },

    getCarModels() {
      this.loading = true
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${this.make.toLowerCase()}?format=json`, {
        method: "GET",
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log("external GET models", res)
        this.modelOptionsAll = res.Results.map(result => result.Model_Name).sort()
        this.loading = false
      })
    },
  },
};
</script>

<style></style>
