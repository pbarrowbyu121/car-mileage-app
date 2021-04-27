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
      color: null
      // addCarConfirmation: false
    };
  },
  methods: {
    onSubmit() {
      let newTankObj = {
        year: this.year,
        make: this.make,
        model: this.model,
        color: this.color
      };
      // This is where you'll need to plug into the db to submit tank
      // this.orderHistory = [...this.orderHistory, newOrderObj];
      console.log("newTankObj", newTankObj);
      this.onReset();
    },
    onReset() {
      // resets the form, clears state
      this.year = null;
      this.make = null;
      this.model = null;
      this.color = null;
    }
  }
};
</script>

<style></style>
