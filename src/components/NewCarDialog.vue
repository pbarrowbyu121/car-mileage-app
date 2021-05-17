<template>
  <q-card class="my-card text-permanent-marker">
    <!-- Add Cash Form Header -->
    <q-card-section>
      <div class="text-h6">Add New Car</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- Year -->
        <q-select filled dense clearable v-model="year" :options="yearOptions" @input="getCarMakes" label="Year" />
        <!-- Make -->
        <q-select v-if="year" filled dense clearable v-model="make" :options="makeOptions" @input="getCarModels" label="Make" />

        <!-- Model -->
        <!-- <q-input filled v-model="model" label="Model" dense /> -->
        <q-select v-if="make" filled dense clearable v-model="model" :options="modelOptions" label="Model" />

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
  </q-card>
</template>

<script>
export default {
  name: "NewTankDialog",
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
      modelOptions: [],
      // addCarConfirmation: false
    };
  },
  methods: {
    async onSubmit() {
      let newCarObj = {
        id: this.vin,
        year: this.year,
        make: this.make,
        model: this.model,
        color: this.color,
        vin: this.vin,
        license: this.license,
        name: this.name,
        image: this.image
      };
      // This is where you'll need to plug into the db to submit tank
      // this.orderHistory = [...this.orderHistory, newOrderObj];
      const res = await fetch("http://localhost:5000/cars", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newCarObj)
      });
      this.onReset();
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
    getCarMakes() {
      console.log("getCarMakes called")
      fetch(`http://api.carmd.com/v3.0/make?year=${this.year}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": "Basic MmM2M2Y4MzItODNlMC00NGE4LWFmZjItOGI2NGRhOTdkMzY3",
          "partner-token": "214086a09d764e0eae3840202841c336"
        }
      })
      .then(res => res.json())
      .then(res => this.makeOptions = res.data)
    },
    getCarModels() {
      console.log("getCarMakes called")
      fetch(`http://api.carmd.com/v3.0/model?year=${this.year}&make=${this.make}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": "Basic MmM2M2Y4MzItODNlMC00NGE4LWFmZjItOGI2NGRhOTdkMzY3",
          "partner-token": "214086a09d764e0eae3840202841c336"
        }
      })
      .then(res => res.json())
      .then(res => this.modelOptions = res.data)
    },
  },
};
</script>

<style></style>
