<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Car Mileage App</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>
        <MenuLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuLink from "components/MenuLink.vue";
import { mapActions } from "vuex";

const linksData = [
  {
    title: "My Cars",
    icon: "school",
    to: "/"
  }
];

export default {
  name: "MainLayout",
  components: { MenuLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  },
  methods: {
    ...mapActions("carstore", ["changeName", ""])
  },
  computed: {
    username: {
      get() {
        return this.$store.state.carstore.username;
      },
      set(val) {
        this.$store.state.commit("carstore/UPDATE_USERNAME_MUTATION", val);
      }
    }
  }
};
</script>
