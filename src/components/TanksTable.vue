<template>
  <div class="q-mt-md">
    <q-table title="Gas" :data="data" :columns="columns" row-key="name" />
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
        }
      ],
      data: this.tanks
    };
  }
};
</script>

<style></style>
