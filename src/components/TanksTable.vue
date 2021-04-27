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
          sortable: true
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
      // data: [
      //   {
      //     date: "12/5/2020",
      //     odometer: 30000,
      //     gallons: 12,
      //     cost: 30.0
      //   },
      //   {
      //     date: "12/12/2020",
      //     odometer: 30300,
      //     gallons: 12,
      //     cost: 30.0
      //   },
      //   {
      //     date: "12/19/2020",
      //     odometer: 30600,
      //     gallons: 12,
      //     cost: 30.0
      //   }
      // ]
    };
  }
};
</script>

<style></style>
