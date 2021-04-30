<template>
  <q-card class="my-card text-permanent-marker">
    <!-- Add Cash Form Header -->
    <q-card-section>
      <div class="text-h6">Add New Car</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- Year -->
        <q-input
          filled
          v-model="year"
          label="Year"
          dense
          :rules="[
            val => /^\d*[1-9]\d*$/.test(val) || 'Positive integers only'
          ]"
        />
        <!-- Make -->
        <q-input filled v-model="make" label="Make" dense />

        <!-- Model -->
        <q-input filled v-model="model" label="Model" dense />

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
      image: null
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
    }
  }
};
</script>

<style></style>
