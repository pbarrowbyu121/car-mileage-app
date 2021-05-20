<template>
  <q-card class="my-card text-permanent-marker text-krona-one">
    <q-card-section>
      <div class="text-h6">Fillup for {{ car.year }} {{ car.make }} {{ car.model }}, {{ car.color }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- Date -->
        <q-input
          dense
          filled
          label="Date"
          v-model="addTankDate"
          class="q-pb-none"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="addTankDate"
                  minimal
                  today-btn
                  mask="MM/DD/YYYY"
                >
                  <div class="items-center justify-end row">
                    <q-btn v-close-popup label="OK" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <!-- Odometer -->
        <q-input
          filled
          v-model="odometer"
          label="Odometer"
          dense
          :rules="[
            val => /^\d*[1-9]\d*$/.test(val) || 'Positive integers only'
          ]"
        />
        <!-- Gallons -->
        <q-input filled v-model="gallons" label="Gallons" dense />

        <!-- Gallons -->
        <q-input filled v-model="cost" label="Cost ($)" dense />

        <div>
          <q-btn v-close-popup type="submit" color="primary">Add Tank</q-btn>
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
import { uid } from "quasar";
import { mapActions } from "vuex";

export default {
  name: "NewTankDialog",
  data() {
    return {
      addTankDate: null,
      odometer: null,
      gallons: null,
      cost: null,
      addTankConfirmation: false,
    };
  },
  props: ["car"],
  methods: {
    ...mapActions("carstore", ["getTanksAction", "addTankAction"]),
    onSubmit() {
      let newTankObj = {
        id: uid(),
        vin: this.car.vin,
        date: this.addTankDate,
        odometer: this.odometer,
        gallons: this.gallons,
        cost: this.cost
      };
      this.addTankAction(newTankObj).then(response => this.getTanksAction())
      // this.getTanksAction()
    },
    onReset() {
      // resets the form, clears state
      this.addTankDate = null;
      this.odometer = null;
      this.gallons = null;
      this.cost = null;
    }
  }
};
</script>

<style></style>
