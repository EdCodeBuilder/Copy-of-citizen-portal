<template>
  <v-row justify="center" align-content="center">
    <v-slide-y-transition appear>
      <v-card
        class="d-inline-block mx-auto my-auto"
        elevation="6"
        max-width="844"
      >
        <validation-observer v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <v-card-text>
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                  class="hidden-sm-and-down"
                  align-self="center"
                >
                  <div id="office-man" style="max-width: 400px;" />
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <Sim></Sim>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|min:3|max:45"
                    :name="$t('inputs.Username')"
                  >
                    <v-text-field
                      v-model.trim="form.username"
                      type="text"
                      name="username"
                      color="primary"
                      :label="$t('inputs.Username')"
                      :error-messages="errors"
                      clearable
                      counter
                      :maxlength="45"
                      autocomplete="off"
                      required="required"
                      prepend-icon="mdi-account-circle-outline"
                    />
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|min:3|max:45"
                    :name="$t('inputs.Password')"
                  >
                    <v-text-field
                      v-model.trim="form.password"
                      class="mb-8"
                      name="password"
                      color="primary"
                      :labe="$t('inputs.Password')"
                      prepend-icon="mdi-lock-outline"
                      :error-messages="errors"
                      clearable
                      counter
                      :maxlength="45"
                      autocomplete="off"
                      required="required"
                      :type="show ? 'text' : 'password'"
                      :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="show = !show"
                    />
                  </validation-provider>
                  <v-checkbox type="checkbox" required>
                    <template v-slot:label>
                      {{ $t('pages.Login.Title') }}
                      <v-spacer></v-spacer>
                      <nuxt-link
                        to="/login"
                        class="primary--text caption hidden-sm-and-down"
                      >
                        Forgot your password?
                      </nuxt-link>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            color="primary"
                            class="hidden-md-and-up"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-help-circle</v-icon>
                          </v-btn>
                        </template>
                        <span>Forgot your password?</span>
                      </v-tooltip>
                    </template>
                  </v-checkbox>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">
                      Login
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions class="hidden-sm-and-down">
                    <Town></Town>
                    <v-spacer></v-spacer>
                    <nuxt-link to="/login" class="primary--text caption">
                      Go to old version
                    </nuxt-link>
                  </v-card-actions>
                </v-col>
              </div>
            </v-card-text>
          </v-form>
        </validation-observer>
      </v-card>
    </v-slide-y-transition>
  </v-row>
</template>

<script>
import lottie from 'lottie-web/build/player/lottie'
import * as office from '~/static/lottie/office.json'
import Sim from '~/components/icons/Sim'
import Town from '~/components/icons/Town'
export default {
  name: 'Index',
  layout: 'page',
  components: {
    Sim,
    Town,
  },
  data: () => ({
    form: {
      username: null,
      password: null,
    },
  }),
  computed: {
    styles: (vm) => (vm.$vuetify.breakpoint.mdAndUp ? 'min-width: 400px;' : ''),
  },
  mounted() {
    lottie.loadAnimation({
      container: document.getElementById('office-man'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: office.default,
    })
  },
  methods: {
    onSubmit: () => alert('Ok'),
  },
}
</script>
