<template>
  <div id="q-app" class="text-krona-one">
    <router-view />
  </div>
</template>
<script>


export default {
  name: "App",
  async created() {
    this.fetchCars()
    this.fetchTanks();
  }
};
</script>
