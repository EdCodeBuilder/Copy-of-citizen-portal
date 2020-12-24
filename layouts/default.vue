<template>
  <v-app>
    <dashboard-drawer :expand-on-hover.sync="expandOnHover" />
    <dashboard-app-bar v-model="expandOnHover" />
    <v-main>
      <v-container>
        <v-offline />
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="!$vuetify.rtl"
      temporary
      fixed
      width="300"
    >
      <dashboard-settings />
    </v-navigation-drawer>
    <dashboard-footer />
    <snack />
  </v-app>
</template>

<script>
import { Api } from '@/models/Api'
import AppBar from '@/components/dashboard/AppBar'
import Drawer from '@/components/dashboard/Drawer'
import SnackBar from '@/components/base/SnackBar'
import VOffline from '@/components/base/VOffline'
import DashboardFooter from '@/components/dashboard/DashboardFooter'
import Settings from '@/components/dashboard/Settings'
export default {
  name: 'DashboardLayout',
  components: {
    DashboardAppBar: AppBar,
    DashboardDrawer: Drawer,
    DashboardFooter,
    DashboardSettings: Settings,
    Snack: SnackBar,
    VOffline,
  },
  data() {
    return {
      expandOnHover: false,
      title: 'S.I.M. 2.0',
    }
  },
  computed: {
    rightDrawer: {
      get() {
        return this.$store.getters['app/getStatusRightDrawer']
      },
      set(val) {
        this.$store.dispatch('app/toggleRightDrawer', val)
      },
    },
  },
  mounted() {
    this.$axios.get(Api.END_POINTS.CSFR_TOKEN())
  },
}
</script>
