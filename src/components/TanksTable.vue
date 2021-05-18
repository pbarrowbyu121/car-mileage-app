<template>
  <div class="q-mt-md">
    <q-table title="Gas" :data="tanks" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" icon="edit"/>
          <q-btn dense round flat color="grey" @click="deleteTank(props.row.id)" icon="delete"/>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>

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
      // data: this.tanks
    };
  },
  methods: {
    async deleteTank(id) {
      console.log("DELETE TANK called", id)
      const res = await fetch(`http://localhost:5000/tanks/${id}`, {
        method: "DELETE",
      })
      .then((res) => {
        console.log("delete res", res)
        if(res.status === 200) {
          this.$emit('deleteTank', id)
        }
      });
    },
  }
};
</script>

<style></style>
