<template>
  <v-main id="certificates" class="main main-raised elevation-24">
    <v-row justify="center" align-content="center" class="mx-2">
      <v-col cols="12" md="8" sm="8" class="mx-auto">
        <v-card flat color="transparent">
          <v-card-text>
            <v-row class="mx-md-2">
              <v-col cols="12" class="py-0 my-0">
                <info-content
                  info-horizontal
                  icon="mdi-information-outline"
                  icon-color="success"
                  subtitle="Paz y Salvo del Área de Almacen"
                  class="mb-0"
                >
                  <v-card flat color="transparent" class="mt-0 px-5">
                    <v-card-text v-if="resource.length === 0">
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
                          <li
                            v-for="(val, j) in errors.errors[k]"
                            :key="`i-${j}`"
                          >
                            {{ val }}
                          </li>
                        </ul>
                        <template #actions>
                          <v-btn icon @click="errors = {}">
                            <v-icon dark>mdi-close</v-icon>
                          </v-btn>
                        </template>
                      </v-banner>
                      <validation-observer
                        ref="peace"
                        v-slot="{ handleSubmit }"
                      >
                        <v-form @submit.prevent="handleSubmit(onSubmit)">
                          <v-row dense>
                            <!-- Name -->
                            <v-col cols="12" md="6" sm="12">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="
                                  form.validations.input_alpha_spaces_required
                                "
                                vid="name"
                                name="nombre"
                              >
                                <v-text-field
                                  id="name"
                                  v-model="form.name"
                                  name="name"
                                  :loading="finding"
                                  :readonly="finding"
                                  :error-messages="errors"
                                  color="primary"
                                  label="Nombres"
                                  clearable
                                  counter
                                  :maxlength="
                                    form.validations.input_alpha_spaces_required
                                      .max
                                  "
                                  autocomplete="off"
                                  required="required"
                                  prepend-icon="mdi-face"
                                />
                              </validation-provider>
                            </v-col>
                            <!-- Surname -->
                            <v-col cols="12" md="6" sm="12">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="
                                  form.validations.input_alpha_spaces_required
                                "
                                vid="surname"
                                name="apellidos"
                              >
                                <v-text-field
                                  id="surname"
                                  v-model="form.surname"
                                  name="surname"
                                  :loading="finding"
                                  :readonly="finding"
                                  :error-messages="errors"
                                  color="primary"
                                  label="Apellidos"
                                  clearable
                                  counter
                                  :maxlength="
                                    form.validations.input_alpha_spaces_required
                                      .max
                                  "
                                  autocomplete="off"
                                  required="required"
                                  prepend-icon="mdi-face"
                                />
                              </validation-provider>
                            </v-col>
                            <!-- Document -->
                            <v-col cols="12">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="
                                  form.validations.input_document_required
                                "
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
                            <v-col cols="12" md="6">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="form.validations.input_number_required"
                                vid="contract"
                                name="número de contrato"
                              >
                                <v-text-field
                                  id="contract"
                                  v-model="form.contract"
                                  name="contract"
                                  :loading="finding"
                                  :readonly="finding"
                                  :error-messages="errors"
                                  persistent-hint
                                  hint="Ejemplo: 0933"
                                  color="primary"
                                  label="Número de contrato"
                                  clearable
                                  counter
                                  :maxlength="4"
                                  autocomplete="off"
                                  required="required"
                                  prepend-icon="mdi-file"
                                />
                              </validation-provider>
                            </v-col>
                            <!-- Year -->
                            <v-col cols="12" md="6">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="form.validations.input_text_required"
                                vid="contract"
                                name="año de contrato"
                              >
                                <v-autocomplete
                                  id="contract"
                                  v-model="form.year"
                                  name="contract"
                                  :loading="finding"
                                  :readonly="finding"
                                  :error-messages="errors"
                                  persistent-hint
                                  :items="years"
                                  :hint="`Ejemplo: ${$moment().year()}`"
                                  color="primary"
                                  label="Año de contrato"
                                  clearable
                                  counter
                                  :maxlength="4"
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
                                  label="Expediente Virtual (Opcional)"
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
                                outlined
                                color="primary"
                                :loading="finding"
                                :disabled="finding"
                                :to="localePath({ name: 'certificates' })"
                              >
                                <v-icon left dark>mdi-arrow-left</v-icon>
                                Regresar
                              </v-btn>
                              <v-btn
                                color="primary"
                                :loading="finding"
                                :disabled="finding"
                                type="submit"
                              >
                                <v-icon left dark>mdi-send</v-icon>
                                Generar Paz y Salvo
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </validation-observer>
                    </v-card-text>
                  </v-card>
                </info-content>
              </v-col>
              <v-col v-if="resource.length > 0" cols="12">
                Por favor acécerque al área de almacén para realizar la
                devolución de activos cargados a su nombre.
                <v-list dense three-line>
                  <v-list-item v-for="item in resource" :key="item.id">
                    <v-list-item-avatar>
                      <v-icon>mdi-text</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ `Placa: ${item.id}` }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        {{ `Cantidad: ${item.quantity}` }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-btn
                  outlined
                  block
                  color="primary"
                  :loading="finding"
                  :disabled="finding"
                  @click="resource = []"
                >
                  <v-icon left dark>mdi-arrow-left</v-icon>
                  Regresar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import FileSaver from 'file-saver'
import { has } from 'lodash'
import { Warehouse } from '~/models/services/portal/Warehouse'

export default {
  name: 'WarehousePeaceAndSave',
  nuxtI18n: {
    paths: {
      en: '/warehouse-peace-and-save',
      es: '/paz-y-salvo-almacen',
    },
  },
  layout: 'landing',
  middleware: ['token'],
  components: {
    InfoContent: () => import('~/components/base/InfoContent'),
  },
  auth: false,
  data: () => ({
    finding: false,
    form: new Warehouse(),
    errors: {},
    resource: [],
  }),
  methods: {
    onSubmit() {
      this.finding = true
      this.form.setFormInstance(this.$refs.warehouse)
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
          const data = JSON.parse(Buffer.from(errors).toString('utf8'))
          if (has(data, 'message.data')) {
            this.resource = data.message.data
          } else {
            this.errors = data
            this.$snackbar({ message: this.errors.message })
          }
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
    years() {
      const years = []
      for (let i = this.$moment().year(); i >= 1900; i--) {
        years.push(i)
      }
      return years
    },
  },
}
</script>
