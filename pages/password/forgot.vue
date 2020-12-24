<template>
  <v-row justify="center" align-content="center">
    <v-slide-y-transition appear>
      <v-card
        class="d-inline-block mx-auto my-auto"
        elevation="6"
        :max-width="$vuetify.breakpoint.mdAndUp ? '710' : '300'"
      >
        <validation-observer v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <v-card-text>
              <v-col cols="12">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|min:3|max:45"
                  :name="$t('inputs.Username')"
                >
                  <v-text-field
                    v-model.trim="form.username"
                    type="text"
                    name="username"
                    class="mt-8"
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
                    v-model.trim="form.document"
                    name="password"
                    color="primary"
                    :label="$t('inputs.Document')"
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
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary">
                    {{ $t('buttons.Login') }}
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-card-text>
          </v-form>
        </validation-observer>
      </v-card>
    </v-slide-y-transition>
  </v-row>
</template>

<script>
export default {
  name: 'New',
  auth: false,
  layout: 'page',
  data: () => ({
    show: false,
    form: {
      username: null,
      document: null,
    },
  }),
  methods: {
    onSubmit: () => alert('Ok'),
  },
}
</script>
