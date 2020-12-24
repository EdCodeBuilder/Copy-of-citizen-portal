<template>
  <v-app-bar :dark="isDark" absolute color="transparent" flat height="85">
    <v-container class="px-0 text-right d-flex align-center">
      <v-toolbar-title class="font-weight-light" v-text="title" />
      <v-spacer />
      <Language />
      <DarkLight />
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  components: {
    Language: () => import('~/components/base/Language'),
    DarkLight: () => import('~/components/base/DarkLight'),
  },
  props: {
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      return this.$t(`titles.${this.$route.meta.title || 'Dashboard'}`)
    },
  },
}
</script>
