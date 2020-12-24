<template>
  <v-btn icon @click.stop="onDark">
    <v-icon>mdi-theme-light-dark</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'DarkLight',
  computed: {
    darkTheme() {
      return this.$store.getters['app/getIsDark']
    },
  },
  mounted() {
    this.$vuetify.theme.dark = this.darkTheme
  },
  methods: {
    onDark() {
      this.$store.dispatch('app/toggleDarker', !this.darkTheme)
      this.$vuetify.theme.dark = this.darkTheme
    },
  },
}
</script>
