<template>
  <q-card class="my-card text-permanent-marker">
    <q-card-section>
      <div class="text-h6">Edit {{tank.date}} Tank</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <!-- Date -->
        <q-input
          dense
          filled
          label="Date"
          v-model="editTankDate"
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
                  v-model="editTankDate"
                  minimal
                  today-btn
                  mask="MM/DD/YYYY"
                >
                  <div class="row items-center justify-end">
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
          v-model="editTankOdometer"
          label="Odometer"
          dense
          :rules="[
            val => /^\d*[1-9]\d*$/.test(val) || 'Positive integers only'
          ]"
        />
        <!-- Gallons -->
        <q-input filled v-model="editTankGallons" label="Gallons" dense />

        <!-- Gallons -->
        <q-input filled v-model="editTankCost" label="Cost ($)" dense />

        <div>
          <q-btn v-close-popup type="submit" color="primary">Save</q-btn>
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
import axios from "axios";

export default {
  name: "EditTankDialog",
  props: ["tank"],
  data() {
    return {
      editTankCost: this.tank.cost,
      editTankDate: this.tank.date,
      editTankGallons: this.tank.gallons,
      editTankOdometer: this.tank.odometer,
    }
  },
  methods: {
    ...mapActions("carstore", ["getTanksAction", "editTankAction"]),
    async onSubmit() {
      let editedTankObj = {
        ...this.tank,
        cost: this.editTankCost,
        date: this.editTankDate,
        gallons: this.editTankGallons,
        odometer: this.editTankOdometer
      }
      await this.editTankAction(editedTankObj)
      await this.getTanksAction()
    }
  }
};
</script>

<style></style>
