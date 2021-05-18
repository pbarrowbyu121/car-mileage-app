<template>
  <div class="q-mt-md">
    <q-table title="Gas" :data="tanks" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="editTank(props.row)" icon="edit"/>
          <q-btn dense round flat color="grey" @click="onDelete(props.row.id)" icon="delete"/>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="editTankPopup"><EditTankDialog :tank="tankToEdit"/></q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import EditTankDialog from "../components/EditTankDialog";

export default {
  name: "TanksTable",
  props: ["tanks"],
  data() {
    return {
      columns: [
        {
          name: "date",
          required: true,
          label: "Date",
          align: "left",
          field: "date"
        },
        {
          name: "odometer",
          align: "center",
          label: "Odom",
          field: "odometer",
          sortable: true,
          format: val => parseInt(val).toLocaleString()
        },
        { name: "gallons", label: "Gals", field: "gallons" },
        {
          name: "cost",
          label: "Cost",
          field: "cost",
          format: val => `${val}`
        },
        {
          name: "actions", label: "Actions", field: '', align: 'center'
        }
      ],
      editTankPopup: false,
      tankToEdit: null
      // data: this.tanks
    };
  },
  methods: {
    ...mapActions("carstore", ["deleteTankAction", "getTanksAction", "editTankAction"]),
    async onDelete(id) {
      await this.deleteTankAction(id)
      this.getTanksAction()
    },
    editTank(tank) {
      this.editTankPopup = true
      this.tankToEdit = tank
    }
  },
  components: {
    EditTankDialog
  }
};
</script>

<style></style>
