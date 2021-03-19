<template>
  <v-row justify="center" align-content="center" class="mx-2">
    <v-col cols="12" md="8" sm="8" class="mx-auto">
      <v-card>
        <v-card-text>
          <v-row class="mx-md-2">
            <v-col cols="12" class="py-0 my-0">
              <info-content
                info-horizontal
                icon="mdi-information-outline"
                icon-color="success"
                subtitle="Paz y Salvo del Área de Sistemas"
                class="mb-0"
              >
                <v-banner
                  v-if="errors.message"
                  color="error"
                  class="white--text"
                >
                  <v-avatar slot="icon" color="white" size="40">
                    <v-icon color="error">mdi-alert</v-icon>
                  </v-avatar>
                  {{ errors.message }}
                  <v-divider class="my-4" />
                  <template v-if="errors.details">
                    {{ errors.details }}
                    <v-divider class="my-4" />
                  </template>
                  <ul v-for="(k, i) in errorsKeys" :key="i">
                    <li v-for="(val, j) in errors.errors[k]" :key="`i-${j}`">
                      {{ val }}
                    </li>
                  </ul>
                </v-banner>
                <validation-observer ref="forgot" v-slot="{ handleSubmit }">
                  <v-form @submit.prevent="handleSubmit(onSubmit)">
                    <!-- Name -->
                    <v-col cols="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_text_required"
                        vid="name"
                        :name="$t('inputs.Name')"
                      >
                        <v-text-field
                          v-model.trim="form.name"
                          type="text"
                          name="name"
                          class="mt-8"
                          :label="$t('inputs.Name')"
                          :error-messages="errors"
                          clearable
                          counter
                          :disabled="finding"
                          :loading="finding"
                          :maxlength="191"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-account-circle-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Document -->
                    <v-col cols="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_document_required"
                        vid="document"
                        :name="$t('inputs.Document')"
                      >
                        <v-text-field
                          id="document"
                          v-model.number="form.document"
                          name="document"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Número de Documento"
                          clearable
                          counter
                          :maxlength="12"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Contract -->
                    <v-col cols="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_text_required"
                        vid="contract"
                        name="número de contraro"
                      >
                        <v-text-field
                          id="contract"
                          v-model="form.contract"
                          name="contract"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          persistent-hint
                          hint="Ejemplo: IDRD-CTO-1234-2020"
                          color="primary"
                          label="Número de contrato"
                          clearable
                          counter
                          :maxlength="form.validations.input_text_required.max"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-file"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Virtual File -->
                    <v-col cols="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_text"
                        vid="virtual_file"
                        name="expediente virtual"
                      >
                        <v-text-field
                          id="virtual_file"
                          v-model="form.virtual_file"
                          name="virtual_file"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          persistent-hint
                          hint="Ejemplo: E123456789075"
                          color="primary"
                          label="Expediente Virtual"
                          clearable
                          counter
                          :maxlength="form.validations.input_text.max"
                          autocomplete="off"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Create User -->
                    <v-col cols="12" class="text-right">
                      <v-btn
                        color="primary"
                        :loading="finding"
                        :disabled="finding"
                        type="submit"
                      >
                        <v-icon left dark>mdi-send</v-icon> Generar Paz y Salvo
                      </v-btn>
                    </v-col>
                  </v-form>
                </validation-observer>
              </info-content>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FileSaver from 'file-saver'
import { Certification } from '~/models/services/portal/Certification'

export default {
  name: 'PeaceAndSave',
  nuxtI18n: {
    paths: {
      en: '/peace-and-save',
      es: '/paz-y-salvos',
    },
  },
  layout: 'password',
  components: {
    InfoContent: () => import('~/components/base/InfoContent'),
  },
  auth: false,
  data: () => ({
    finding: false,
    form: new Certification(),
    errors: {},
  }),
  methods: {
    onSubmit() {
      this.finding = true
      this.form
        .store({
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/pdf',
          },
        })
        .then((response) => {
          FileSaver.saveAs(
            new Blob([response], { type: 'application/pdf' }),
            'PAZ_Y_SALVO.pdf'
          )
        })
        .catch((errors) => {
          this.errors = JSON.parse(Buffer.from(errors).toString('utf8'))
          this.$snackbar({ message: this.errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
  },
  computed: {
    errorsKeys() {
      return this.errors.errors ? Object.keys(this.errors.errors) : []
    },
  },
}
</script>
