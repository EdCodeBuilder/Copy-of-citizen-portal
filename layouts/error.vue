<template>
  <v-container class="error-page fill-height" tag="section">
    <v-row
      class="text-right fill-height my-auto"
      justify="center"
      align="center"
    >
      <v-col cols="auto">
        <div
          v-if="error.statusCode === 404"
          id="404-error"
          style="max-width: 400px"
        />
        <div v-else id="cable-error" style="max-width: 500px" />
        <h1 v-if="error.statusCode !== 404" class="title font-weight-black">
          {{ `Error: ${error.statusCode}` }}
        </h1>
        <div
          v-if="error.statusCode === 404"
          :class="{
            'display-3': $vuetify.breakpoint.mdAndUp,
            'display-2': $vuetify.breakpoint.smAndDown,
          }"
          class="mb-5"
        >
          {{ pageNotFound }}
        </div>
        <div
          v-else
          :class="{
            'display-3': $vuetify.breakpoint.mdAndUp,
            'display-2': $vuetify.breakpoint.smAndDown,
          }"
          class="mb-5"
        >
          {{ error.message || otherError }}
        </div>
        <v-btn color="primary" :to="localePath({ name: 'index' })">
          {{ $t('buttons.Error') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lottie from 'lottie-web/build/player/lottie'
import * as error404 from '~/static/lottie/404.json'
import * as cable from '~/static/lottie/cable.json'
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    pageNotFound() {
      return this.$t('titles.NotFound')
    },
    otherError() {
      return this.$t('texts.Error')
    },
  },
  mounted() {
    lottie.loadAnimation({
      container: document.getElementById('404-error'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: error404.default,
    })
    lottie.loadAnimation({
      container: document.getElementById('cable-error'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: cable.default,
    })
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="sass" scoped>
.error-page
  h1.title
    font-family: "Roboto Slab", "Times New Roman", serif
    font-size: 80px!important
    letter-spacing: 2px!important
    font-weight: 700!important
    margin-bottom: 50px
@media(max-width:960px)
  .error-page
    h1.title
      font-size: 20px!important
      letter-spacing: 0px!important
      font-weight: 700!important
</style>
