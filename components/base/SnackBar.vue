<template>
  <v-snackbar
    v-model="showSnack"
    :color="snackBar.color"
    :bottom="bottom"
    :top="top"
    :left="left"
    :right="right"
    dark
  >
    <v-icon color="white" class="mr-3">
      {{ snackBar.icon }}
    </v-icon>

    {{ snackBar.message }}

    <template v-slot:action>
      <v-icon size="16" @click="onClose">mdi-close-circle</v-icon>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  data: () => ({
    top: false,
    bottom: true,
    left: false,
    right: false,
  }),
  computed: {
    showSnack: {
      get() {
        return this.$store.getters['app/getSnackBarStatus']
      },
      set(value) {
        this.$store.dispatch('app/toggleSnackBar', value)
      },
    },
    snackBar: {
      get() {
        return this.$store.getters['app/getSnackBar']
      },
      set(value) {
        this.$store.dispatch('app/setSnackBar', value)
      },
    },
  },
  created() {
    this.$store.watch(
      (state) => state.app.snackBar.show,
      () => {
        if (this.$store.state.app.snackBar.show) {
          this.onSnackSetPosition()
          this.show = true
        } else {
          this.$store.dispatch('app/unsetSnackBar')
        }
      }
    )
  },
  methods: {
    onSnackSetPosition() {
      this.top = false
      this.bottom = false
      this.left = false
      this.right = false
      for (const loc of this.snackBar.position) {
        this[loc] = true
      }
    },
    onClose() {
      this.showSnack = false
      this.$emit('onCloseSnackBar')
    },
  },
}
</script>
