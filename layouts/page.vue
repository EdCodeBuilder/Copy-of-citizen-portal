<template>
  <v-app>
    <app-bar />
    <CoreView />
    <CoreFooter />
    <Snack />
  </v-app>
</template>

<script>
import { Api } from '@/models/Api'

export default {
  name: 'AuthPage',
  components: {
    AppBar: () => import('~/components/auth/AppBar'),
    CoreView: () => import('~/components/auth/View'),
    CoreFooter: () => import('~/components/auth/AuthFooter'),
    Snack: () => import('~/components/base/SnackBar'),
  },
  mounted() {
    this.$axios.get(Api.END_POINTS.CSFR_TOKEN())
  },
}
</script>
