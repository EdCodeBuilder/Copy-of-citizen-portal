<template>
  <v-row justify="center" align-content="center" class="mx-2">
    <v-col cols="12" md="8" sm="8" class="mx-auto">
      <v-card elevation="6">
        <v-card v-if="success" elevation="6">
          <v-card-text>
            <empty-state icon="mdi-check-circle" rounded :description="message">
              <v-btn color="primary" :to="localePath('/login')">
                Salir de Aquí
              </v-btn>
            </empty-state>
          </v-card-text>
        </v-card>
        <v-slide-y-transition v-else appear>
          <v-card>
            <v-card-text>
              <v-row class="mx-md-2">
                <v-col cols="12" class="py-0 my-0">
                  <info-content
                    info-horizontal
                    icon="mdi-alert"
                    icon-color="warning"
                    subtitle="Nota"
                    class="mb-0"
                  >
                    <p
                      class="ml-md-9 body-1 font-weight-medium"
                      v-text="
                        'Lea atentamente la información que aquí se solicita y complete el registro.'
                      "
                    />
                  </info-content>
                </v-col>
              </v-row>
              <validation-observer ref="user_update" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <v-row>
                    <!-- Document Type -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="document_type_id"
                        name="tipo de documento"
                      >
                        <v-select
                          id="document_type_id"
                          v-model.number="form.document_type_id"
                          name="document_type_id"
                          item-text="combined"
                          item-value="id"
                          :clearable="!form.document_type_id"
                          :loading="finding"
                          :readonly="finding || !!form.document_type_id"
                          :error-messages="errors"
                          min="3"
                          autocomplete="off"
                          required
                          :items="document_types"
                          prepend-icon="mdi-card-account-details"
                          menu-props="auto"
                          label="Tipo de Documento"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Document -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_document_required"
                        vid="document"
                        name="número de documento"
                      >
                        <v-text-field
                          id="document"
                          v-model.number="form.document"
                          name="document"
                          :loading="finding"
                          readonly
                          :error-messages="errors"
                          color="primary"
                          label="Número de Documento"
                          counter
                          :maxlength="12"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Name -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_alpha_spaces_required"
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
                            form.validations.input_alpha_spaces_required.max
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
                        :rules="form.validations.input_alpha_spaces_required"
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
                            form.validations.input_alpha_spaces_required.max
                          "
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-face"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Birthday -->
                    <v-col cols="12" md="6" sm="12">
                      <v-dialog
                        ref="birthday_dialog"
                        v-model="birthday_dialog"
                        :return-value.sync="form.birthdate"
                        persistent
                        width="290px"
                      >
                        <template #activator="{ on }">
                          <validation-provider
                            v-slot="{ errors }"
                            :rules="form.validations.required"
                            vid="birthday"
                            name="fecha de nacimiento"
                          >
                            <v-text-field
                              id="birthday"
                              v-model="form.birthdate"
                              name="birthday"
                              :loading="finding"
                              label="Fecha de nacimiento"
                              prepend-icon="mdi-calendar"
                              readonly
                              :error-messages="errors"
                              color="primary"
                              clearable
                              autocomplete="off"
                              required="required"
                              v-on="on"
                            ></v-text-field>
                          </validation-provider>
                        </template>
                        <v-date-picker
                          v-if="birthday_dialog"
                          ref="birthday_picker"
                          v-model="form.birthdate"
                          locale="es"
                          :max="
                            $moment($moment().subtract(1, 'day'))
                              .subtract(min_age, 'years')
                              .toISOString()
                          "
                          :min="
                            $moment().subtract(max_age, 'years').toISOString()
                          "
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="birthday_dialog = false"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.birthday_dialog.save(form.birthdate)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <!-- Gender -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="sex_id"
                        name="sexo"
                      >
                        <v-select
                          id="sex_id"
                          v-model="form.sex_id"
                          name="sex_id"
                          clearable
                          :loading="finding"
                          :readonly="finding"
                          required="required"
                          :error-messages="errors"
                          :items="genders"
                          item-text="name"
                          item-value="id"
                          prepend-icon="mdi-human-male-female"
                          menu-props="auto"
                          label="Sexo"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Transport -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="transport"
                        name="se suminitra transporte"
                      >
                        <v-switch
                          id="transport"
                          v-model="form.transport"
                          name="transport"
                          label="¿Se suministra transporte?"
                          :error-messages="errors"
                          persistent-hint
                          hint="Seleccione si se suministra transporte"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Email -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_email_required"
                        vid="email"
                        name="correo electrónico personal"
                      >
                        <v-text-field
                          id="email"
                          v-model="form.email"
                          name="email"
                          type="email"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Correo electrónico personal"
                          clearable
                          counter
                          :maxlength="form.validations.input_email_required.max"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-email-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Institutional Email -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_email"
                        vid="institutional_email"
                        name="correo electrónico institucional"
                      >
                        <v-text-field
                          id="institutional_email"
                          v-model="form.institutional_email"
                          name="institutional_email"
                          type="email"
                          hint="Si tiene correo institucional, por favor indíquelo, de lo contrario deje el campo vacío"
                          persistent-hint
                          :loading="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Correo electrónico institucional"
                          counter
                          :maxlength="form.validations.input_email_required.max"
                          autocomplete="off"
                          prepend-icon="mdi-email-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Phone -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="phone"
                        name="teléfono de contácto"
                      >
                        <v-text-field
                          id="phone"
                          v-model="form.phone"
                          name="phone"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Teléfono de contácto"
                          clearable
                          :counter="12"
                          :maxlength="12"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-phone"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Contract Type -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="contract_type"
                        name="tipo de trámite"
                      >
                        <v-select
                          id="contract_type"
                          v-model="form.contract_type_id"
                          name="contract_type"
                          item-text="name"
                          item-value="id"
                          :loading="finding"
                          readonly
                          :error-messages="errors"
                          min="3"
                          autocomplete="off"
                          required
                          :items="contract_types"
                          prepend-icon="mdi-clipboard-text-outline"
                          menu-props="auto"
                          label="Tipo de Trámite"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Contract -->
                    <v-col cols="12" md="6" sm="12">
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
                          readonly
                          :error-messages="errors"
                          persistent-hint
                          color="primary"
                          label="Número de contrato"
                          counter
                          :maxlength="form.validations.input_text_required.max"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-pound"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Eps -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="eps_id"
                        name="eps"
                      >
                        <v-select
                          id="eps_id"
                          v-model.number="form.eps_id"
                          name="eps_id"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="health_companies"
                          prepend-icon="mdi-hospital"
                          menu-props="auto"
                          label="EPS"
                          @change="form.eps = null"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Other Eps -->
                    <v-col v-if="form.eps_id === 62" cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="{
                          required: form.eps_id === 62,
                          min: 3,
                          max: 80,
                        }"
                        vid="eps"
                        name="otra eps"
                      >
                        <v-text-field
                          id="eps"
                          v-model="form.eps"
                          name="eps"
                          :loading="finding"
                          :readonly="finding || form.eps_id !== 62"
                          :error-messages="errors"
                          color="primary"
                          label="¿Cuál EPS?"
                          clearable
                          counter
                          :maxlength="form.validations.input_text_required.max"
                          autocomplete="off"
                          :required="form.eps_id === 62"
                          prepend-icon="mdi-hospital"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Afp -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="afp_id"
                        name="fondo de pensiones"
                      >
                        <v-select
                          id="afp_id"
                          v-model.number="form.afp_id"
                          name="afp_id"
                          :error-messages="errors"
                          :loading="finding"
                          :readonly="finding"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="afp_companies"
                          prepend-icon="mdi-piggy-bank-outline"
                          menu-props="auto"
                          label="Fondo de pensiones"
                          @change="form.afp = null"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Other Afp -->
                    <v-col v-if="form.afp_id === 10" cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="{
                          required: form.afp_id === 10,
                          min: 3,
                          max: 80,
                        }"
                        vid="afp"
                        name="otro fondo de pensiones"
                      >
                        <v-text-field
                          id="afp"
                          v-model="form.afp"
                          name="afp"
                          :loading="finding"
                          :readonly="finding || form.afp_id !== 10"
                          :error-messages="errors"
                          color="primary"
                          label="¿Cuál fondo de pensiones?"
                          clearable
                          counter
                          :maxlength="form.validations.input_text_required.max"
                          autocomplete="off"
                          :required="form.afp_id === 10"
                          prepend-icon="mdi-piggy-bank-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Position -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_text_required"
                        vid="position"
                        name="cargo a desempeñar"
                      >
                        <v-text-field
                          id="position"
                          v-model="form.position"
                          name="position"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          hint="Ej: auxiliar, técnico, recreador, abogado, ingeniería (especifique cuál), asesor, etc."
                          persistent-hint
                          label="Cargo a desempeñar"
                          clearable
                          counter
                          :maxlength="form.validations.input_text_required.max"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-book-account-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Start Date -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        vid="start_date"
                        name="fecha inicio del contrato"
                      >
                        <v-text-field
                          id="start_date"
                          v-model="form.start_date"
                          name="start_date"
                          :error-messages="errors"
                          color="primary"
                          label="Fecha inicio del contrato"
                          counter
                          :maxlength="191"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-calendar"
                          readonly
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Final Date -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        vid="final_date"
                        name="fecha terminación del contrato"
                      >
                        <v-text-field
                          id="final_date"
                          v-model="form.final_date"
                          name="final_date"
                          :error-messages="errors"
                          color="primary"
                          label="Fecha terminación del contrato"
                          counter
                          :maxlength="191"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-calendar"
                          readonly
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Total -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="total"
                        name="valor total del contrato o adición"
                      >
                        <v-text-field
                          id="total"
                          v-model="form.total"
                          name="total"
                          :loading="finding"
                          readonly
                          :error-messages="errors"
                          color="primary"
                          label="Valor total del contrato o adición"
                          counter
                          :maxlength="12"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-currency-usd"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Day -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="day"
                        name="día que no trabaja"
                      >
                        <v-select
                          id="day"
                          v-model="form.day"
                          name="day"
                          item-text="name"
                          item-value="id"
                          clearable
                          persistent-hint
                          hint="Seleccione el día o días ya que no se permite de domingo a domingo"
                          :loading="finding"
                          multiple
                          :readonly="finding"
                          :error-messages="errors"
                          autocomplete="off"
                          required="required"
                          :items="days"
                          prepend-icon="mdi-calendar"
                          menu-props="auto"
                          label="Día que no trabaja"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Risk -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="risk"
                        name="nivel de riesgo"
                      >
                        <v-select
                          id="risk"
                          v-model="form.risk"
                          name="risk"
                          item-text="name"
                          item-value="id"
                          clearable
                          :hint="`Si su nivel de riesgo es 5 por favor verificar que esté incluido en la resolución para este riesgo. Si requiere ayuda de clic sobre el ícono (?)`"
                          persistent-hint
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          autocomplete="off"
                          required="required"
                          :items="risk"
                          prepend-icon="mdi-alert-outline"
                          menu-props="auto"
                          label="Nivel de Riesgo"
                        >
                          <template #append-outer>
                            <v-dialog ref="help_dialog" v-model="dialog_help">
                              <template #activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-help-circle-outline
                                </v-icon>
                              </template>
                              <v-card flat>
                                <v-card-title>
                                  Tipos de Riesgos
                                  <v-spacer />
                                  <v-icon @click="dialog_help = false">
                                    mdi-close
                                  </v-icon>
                                </v-card-title>
                                <v-card-text>
                                  <v-simple-table>
                                    <thead>
                                      <tr>
                                        <th width="70%">Actividad</th>
                                        <th>Nivel de Riesgo</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>{{ risk_text[1] }}</td>
                                        <td>Nivel I</td>
                                      </tr>
                                      <tr>
                                        <td>{{ risk_text[2] }}</td>
                                        <td>Nivel II</td>
                                      </tr>
                                      <tr>
                                        <td>{{ risk_text[3] }}</td>
                                        <td>Nivel III</td>
                                      </tr>
                                      <tr>
                                        <td>{{ risk_text[4] }}</td>
                                        <td>Nivel V</td>
                                      </tr>
                                    </tbody>
                                  </v-simple-table>
                                </v-card-text>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Office -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="subdirectorate_id"
                        name="subdirección"
                      >
                        <v-select
                          id="subdirectorate_id"
                          v-model.number="form.subdirectorate_id"
                          name="subdirectorate_id"
                          :error-messages="errors"
                          :loading="finding"
                          :readonly="finding"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="subdirectorates"
                          prepend-icon="mdi-domain"
                          menu-props="auto"
                          label="Subdirección"
                          @change="onChangeOffice"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Area -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="dependency_id"
                        name="dependencia"
                      >
                        <v-select
                          id="dependency_id"
                          v-model.number="form.dependency_id"
                          name="dependency_id"
                          :error-messages="errors"
                          :loading="finding"
                          :readonly="finding"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="dependencies"
                          prepend-icon="mdi-layers"
                          menu-props="auto"
                          label="Dependencia"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Other Area -->
                    <v-col
                      v-if="other_deps.includes(form.dependency_id)"
                      cols="12"
                      md="6"
                      sm="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="{
                          required: other_deps.includes(form.dependency_id),
                          min: 3,
                          max: 191,
                        }"
                        vid="other_dependency_subdirectorate"
                        name="otra área o subdirección"
                      >
                        <v-text-field
                          id="other_dependency_subdirectorate"
                          v-model="form.other_dependency_subdirectorate"
                          name="other_dependency_subdirectorate"
                          :loading="finding"
                          :readonly="
                            finding || !other_deps.includes(form.dependency_id)
                          "
                          :error-messages="errors"
                          color="primary"
                          label="¿Cuál área o subdirección?"
                          clearable
                          counter
                          :maxlength="form.validations.input_text_required.max"
                          autocomplete="off"
                          :required="other_deps.includes(form.dependency_id)"
                          prepend-icon="mdi-clipboard"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Supervisor Email -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_email"
                        vid="supervisor_email"
                        name="correo electrónico institucional del supervisor"
                      >
                        <v-text-field
                          id="supervisor_email"
                          v-model="form.supervisor_email"
                          name="supervisor_email"
                          type="email"
                          :loading="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Correo electrónico insitucional del supervisor"
                          hint="Si no conoce el correo, deje el campo vacío."
                          persistent-hint
                          counter
                          :maxlength="form.validations.input_email.max"
                          autocomplete="off"
                          prepend-icon="mdi-email-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Residence Country -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="residence_country_id"
                        name="país de residencia"
                      >
                        <v-select
                          id="residence_country_id"
                          v-model.number="form.residence_country_id"
                          name="residence_country_id"
                          :error-messages="errors"
                          :loading="finding"
                          :readonly="finding"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="residence_countries"
                          prepend-icon="mdi-map"
                          menu-props="auto"
                          label="País de residencia"
                          @change="onChangeResidenceCountry"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Residence State -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="residence_state_id"
                        name="departamento de residencia"
                      >
                        <v-select
                          id="residence_state_id"
                          v-model.number="form.residence_state_id"
                          name="residence_state_id"
                          :error-messages="errors"
                          :loading="finding"
                          :readonly="finding"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="residence_states"
                          prepend-icon="mdi-map-marker"
                          menu-props="auto"
                          label="Departamento de residencia"
                          @change="onChangeResidenceState"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Residence City -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="residence_city_id"
                        name="ciudad de residencia"
                      >
                        <v-select
                          id="residence_city_id"
                          v-model.number="form.residence_city_id"
                          :loading="finding"
                          name="residence_city_id"
                          :error-messages="errors"
                          :readonly="finding"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="residence_cities"
                          prepend-icon="mdi-crosshairs-gps"
                          menu-props="auto"
                          label="Ciudad de residencia"
                          @change="onChangeCity"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Location -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="locality_id"
                        name="localidad"
                      >
                        <v-select
                          id="locality_id"
                          v-model.number="form.locality_id"
                          name="locality_id"
                          :loading="finding"
                          :error-messages="errors"
                          :readonly="finding"
                          item-text="name"
                          hint="Si es fuera de Bogotá selecione la opción OTRO"
                          persistent-hint
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="locations"
                          prepend-icon="mdi-sign-real-estate"
                          menu-props="auto"
                          label="Localidad de Residencia"
                          @change="onChangeLocation"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Upz -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="upz_id"
                        name="upz"
                      >
                        <v-select
                          id="upz_id"
                          v-model.number="form.upz_id"
                          name="upz_id"
                          hint="Si es fuera de Bogotá selecione la opción OTRO"
                          :error-messages="errors"
                          persistent-hint
                          :loading="finding"
                          :readonly="finding"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="upz"
                          prepend-icon="mdi-tag"
                          menu-props="auto"
                          label="Upz de Residencia"
                          @change="onChangeUpz"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Neighborhoods -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="neighborhood_id"
                        name="barrio"
                      >
                        <v-select
                          id="neighborhood_id"
                          v-model.number="form.neighborhood_id"
                          hint="Si es fuera de Bogotá selecione la opción OTRO"
                          name="neighborhood_id"
                          :error-messages="errors"
                          persistent-hint
                          :loading="finding"
                          :readonly="finding"
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          clearable
                          required="required"
                          :items="neighborhoods"
                          prepend-icon="mdi-city"
                          menu-props="auto"
                          label="Barrio de Residencia"
                          @change="onChangeNeighborhood"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Other Neighborhood -->
                    <v-col
                      v-if="form.neighborhood_id === 9999"
                      cols="12"
                      md="6"
                      sm="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="{
                          required: form.neighborhood_id === 9999,
                          min: 3,
                          max: 80,
                        }"
                        vid="neighborhood"
                        name="nombre del barrio"
                      >
                        <v-text-field
                          id="neighborhood"
                          v-model="form.neighborhood"
                          name="neighborhood"
                          :readonly="finding || form.neighborhood_id !== 9999"
                          :loading="finding"
                          :error-messages="errors"
                          color="primary"
                          label="¿Cuál barrio?"
                          clearable
                          counter
                          :maxlength="form.validations.input_text_required.max"
                          autocomplete="off"
                          :required="form.neighborhood_id === 9999"
                          prepend-icon="mdi-city"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Address -->
                    <v-col cols="12" sm="12" md="6">
                      <v-dialog
                        ref="address_dialog"
                        v-model="address_dialog"
                        persistent
                        fullscreen
                        hide-overlay
                        transition="dialog-bottom-transition"
                      >
                        <template #activator="{ on, attrs: addressMenu }">
                          <validation-provider
                            v-slot="{ errors }"
                            :rules="form.validations.input_text_required"
                            vid="address"
                            name="dirección de residencia"
                          >
                            <v-text-field
                              id="address"
                              v-model="form.address"
                              name="address"
                              :loading="finding"
                              readonly
                              :error-messages="errors"
                              color="primary"
                              label="Dirección de residencia"
                              clearable
                              autocomplete="off"
                              required="required"
                              prepend-icon="mdi-routes"
                              :counter="120"
                              :maxlength="120"
                              v-bind="{ ...addressMenu }"
                              v-on="on"
                            />
                          </validation-provider>
                        </template>
                        <v-address-field
                          v-model="form.address"
                          @close="address_dialog = false"
                          @save="address_dialog = false"
                        >
                          <v-spacer />
                          <v-btn
                            color="primary"
                            text
                            @click="address_dialog = false"
                            v-text="$t('buttons.Cancel')"
                          />
                          <v-btn
                            color="primary"
                            @click="address_dialog = false"
                          >
                            <v-icon left>mdi-content-save</v-icon>
                            {{ $t('buttons.Save') }}
                          </v-btn>
                        </v-address-field>
                      </v-dialog>
                    </v-col>
                    <!--
                     Rut
                    <v-col cols="12" md="12" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.pdf_file_required"
                        vid="rut"
                        name="rut"
                      >
                        <v-file-input
                          id="rut"
                          :disabled="finding"
                          v-model="form.rut"
                          :error-messages="errors"
                          :loading="finding"
                          name="rut"
                          clearable
                          autocomplete="off"
                          prepend-icon="mdi-file"
                          hint="Adjunta el certificado del RUT en formato PDF"
                          persistent-hint
                          label="Adjuntar Archivo Rut"
                          accept="application/pdf"
                        >
                        </v-file-input>
                      </validation-provider>
                    </v-col>
                     Bank
                    <v-col cols="12" md="12" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.pdf_file_required"
                        vid="bank"
                        name="certificación bancaria"
                      >
                        <v-file-input
                          id="bank"
                          :disabled="finding"
                          v-model="form.bank"
                          :error-messages="errors"
                          :loading="finding"
                          name="bank"
                          clearable
                          autocomplete="off"
                          prepend-icon="mdi-file"
                          hint="Adjunta la certificación bancaria en formato PDF"
                          persistent-hint
                          label="Adjuntar Certificado Bancario"
                          accept="application/pdf"
                        >
                        </v-file-input>
                      </validation-provider>
                    </v-col>
                    -->
                    <!-- Consent -->
                    <v-col cols="12" md="12" sm="12">
                      <v-dialog v-model="dialog" scrollable max-width="600px">
                        <template #activator="{ on, attrs }">
                          <v-btn
                            text
                            block
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                          >
                            {{
                              $vuetify.breakpoint.smAndDown
                                ? consent.mini
                                : consent.text
                            }}
                          </v-btn>
                        </template>
                        <v-card flat>
                          <v-card-title>
                            {{ consent.title }}
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text style="height: 600px">
                            <p
                              v-for="(p, key) in consent.paragraphs"
                              :key="`${key}-paragraph`"
                              class="font-weight-medium"
                            >
                              {{ p }}
                            </p>
                          </v-card-text>
                          <v-card-actions>
                            <v-switch
                              v-model="accept"
                              label="Acepto los términos y condiciones"
                            >
                            </v-switch>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              default
                              @click="dialog = false"
                            >
                              Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                    <!-- Submit -->
                    <v-col cols="12" md="12" sm="12">
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        :loading="overlay"
                        block
                        :disabled="overlay || !accept"
                        default
                        type="submit"
                      >
                        Inscribirme
                      </v-btn>
                    </v-col>
                  </v-row>
                </form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { Contractor } from '~/models/services/portal/Contractor'
import { ContractType } from '~/models/services/portal/ContractType'
import { DocumentType } from '~/models/services/portal/DocumentType'
import { Eps } from '~/models/services/portal/Eps'
import { Sex } from '~/models/services/portal/Sex'
import { Afp } from '~/models/services/portal/Afp'
import { Country } from '~/models/services/portal/Country'
import { Location } from '~/models/services/portal/Location'
import { Office } from '~/models/services/portal/Office'

export default {
  name: 'Contracts',
  components: {
    InfoContent: () => import('~/components/base/InfoContent'),
    VAddressField: () => import('~/components/base/VAddressField'),
    EmptyState: () => import('@/components/base/EmptyState'),
  },
  layout: 'password',
  data: () => ({
    overlay: false,
    dialog: false,
    dialog_help: false,
    accept: false,
    success: true,
    message: 'Consultando...',
    form: new Contractor(),
    min_age: 18,
    max_age: 100,
    address_dialog: false,
    birthday_dialog: false,
    gender: new Sex(),
    genders: [],
    location: new Location(),
    locations: [],
    upz: [],
    neighborhoods: [],
    risk_text: {
      1: 'Actividades Administrativas',
      2: 'Actividades de almacenamiento, cargue y descargue de material y personal del Área de Archivo y Correspondencia',
      3: 'Actividades de conducción, personal de parques y escenarios, acompañamiento de eventos deportivos y recreativos, personal de TEC, Recreovía, Escuelas de mi Barrio, Promoción de Servicios, Profesores y Deportistas.',
      4: 'Actividades de Interventoría en obra permanente, actividades que requieran trabajo en alturas y personal de Ciclovía.',
    },
    days: [
      { id: 'DOMINGO', name: 'DOMINGO' },
      { id: 'LUNES', name: 'LUNES' },
      { id: 'MARTES', name: 'MARTES' },
      { id: 'MIÉRCOLES', name: 'MIÉRCOLES' },
      { id: 'JUEVES', name: 'JUEVES' },
      { id: 'VIERNES', name: 'VIERNES' },
      { id: 'SÁBADO', name: 'SÁBADO' },
    ],
    risk: [
      { id: 1, name: 'NIVEL 1 - RIESGO MÍMINO' },
      { id: 2, name: 'NIVEL 2 - RIESGO BAJO' },
      { id: 3, name: 'NIVEL 3 - RIESGO MEDIO' },
      { id: 4, name: 'NIVEL 4 - RIESGO ALTO' },
      { id: 5, name: 'NIVEL 5 - RIESGO MÁXIMO' },
    ],
    health_company: new Eps(),
    health_companies: [],
    afp: new Afp(),
    afp_companies: [],
    country: new Country(),
    residence_countries: [],
    residence_states: [],
    residence_cities: [],
    office: new Office(),
    subdirectorates: [],
    dependencies: [],
    other_deps: [3, 10, 14, 26, 30, 36, 42, 46, 47],
    document_type: new DocumentType(),
    document_types: [],
    contract_type: new ContractType(),
    contract_types: [],
    finding: false,
    start_date: false,
    final_date: false,
    consent: {
      title: 'CONSENTIMIENTO INFORMADO',
      text: 'Aceptar términos y condiciones',
      mini: 'Aceptar T&C',
      paragraphs: [
        'Mediante el diligenciamiento de este formulario, autorizo al Instituto Distrital de Recreación y Deporte – IDRD, así como a cualquier dependencia aliada o filial del Instituto, a realizar el tratamiento sobre mis datos personales, conforme a la ley 1581 de 2012, con la finalidad de ser utilizados para realizar registros de participación en los diferentes eventos, convocatorias y estadísticas.',
        'De igual forma, manifiesto que he decidido participar voluntariamente en la oferta establecida en los parques, mediante el uso de una bicicleta, haciéndolo bajo mi entera responsabilidad, manifestando que me encuentro en perfecto estado físico y de salud. Declaro que no he presentado síntomas asociados al COVID – 19 (fiebre, tos, gripa, dolor de garganta, dificultad respiratoria, cansancio y/o malestar general) ni he tenido contacto con personas sospechosas de contagio por COVID 19. Adicionalmente DECLARO que me dieron las recomendaciones necesarias y que aceptaré cualquier decisión de la organización y del Instituto Distrital de Recreación y Deporte – IDRD, sobre mi participación.',
        'Asumo todos los riesgos asociados con mi recorrido, incluidos, pero no limitados, a caídas y demás accidentes, enfermedades generales, específicas y de tipo contagioso, infecciones, secuelas presentes o futuras derivadas de cualquier incidente que afecten su salud e integridad física por su conducta y actuación o por el contacto con otras personas o elementos, las condiciones climáticas incluida temperatura, lluvia y humedad, estado de las vías, y asume todos los riesgos y contingencias asociadas a la ocurrencia de estas o de circunstancias de fuerza mayor no previsibles, entre ellas: caída de árboles, desastres naturales, alteraciones de orden público, asonada, actos de terrorismo o vandalismo, sedición o revuelta, acciones delincuenciales, muerte súbita; así mismo, por el consumo de alimentos y bebidas antes o durante la participación, y en general todo riesgo y demás eventualidades no previsibles ni controlables que se puedan presentar en la ejecución de las actividades desarrolladas, derivadas o asociadas con estas, que declaran conocidas y valoradas, y aceptan cualquier responsabilidad por los daños que se pueda causar directa o indirectamente a sí mismos o a sus representados.',
        'Exonero de toda responsabilidad al Instituto Distrital de Recreación y Deporte – IDRD, así como a sus funcionarios y contratistas, aliados, patrocinadores y/o representantes, de todo reclamo o responsabilidad contractual y/o extracontractual que surja de mi participación en esta actividad, así como de cualquier extravío, robo y/o hurto.',
        'De igual forma declaro que me encuentro en condiciones médicas, psicológicas y físicas aptas para asistir y participar en la actividad y me comprometo a notificar al personal del Instituto Distrital de Recreación y Deporte – IDRD sobre cualquier preexistencia o novedad en relación con mi salud. Así mismo certifico que me encuentro afiliado y activo a la entidad promotora de salud – EPS.',
        'Por último, autorizo al Instituto Distrital de Recreación y Deporte – IDRD a iniciar las acciones que consideren pertinentes, en caso de que por mi participación genere un hecho que pueda afectar los intereses de la entidad. Igualmente, autorizo al IDRD para que haga uso de las fotografías, películas, videos, grabaciones y cualquier otro medio de registro de este programa para su uso legítimo y legal sin reclamación o compensación económica, material, inmaterial o financiera alguna en el desarrollo de las actividades recreativas, tanto en formato papel (impreso) como digital, teniendo en cuenta la normatividad vigente Colombiana aplicable para tales fines, en especial aquella que proteja los derechos a la intimidad, buen nombre y protección de datos de carácter personal.',
      ],
    },
  }),
  fetch() {
    this.getContractor()
  },
  watch: {
    birthday_dialog(val) {
      val &&
        setTimeout(() => (this.$refs.birthday_picker.activePicker = 'YEAR'))
    },
    start_date(val) {
      val &&
        setTimeout(() => (this.$refs.start_date_picker.activePicker = 'YEAR'))
    },
    final_date(val) {
      val &&
        setTimeout(() => (this.$refs.final_date_picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    getContractor() {
      this.form
        .user(this.$route.query.payload)
        .then((response) => {
          this.form = new Contractor(response.data)
          this.success = false
        })
        .then(async () => {
          const request = [
            await this.document_type.index(),
            await this.contract_type.index(),
            await this.health_company.index(),
            await this.country.index(),
            await this.office.index(),
            await this.afp.index(),
            await this.gender.index(),
          ]
          const [
            documentType,
            contractType,
            healthCompany,
            country,
            office,
            afp,
            gender,
          ] = await Promise.all(request)

          if (!this.form.residence_country_id) {
            this.form.residence_country_id = 47
            this.onChangeResidenceCountry(47)
          }
          this.document_types = documentType.data
          this.contract_types = contractType.data
          this.health_companies = healthCompany.data
          this.afp_companies = afp.data
          this.residence_countries = country.data
          this.subdirectorates = office.data
          this.genders = gender.data
          this.getResidenceCountry(this.form.residence_country_id)
          this.getResidenceState(this.form.residence_state_id)
          this.getCity(this.form.residence_city_id)
          this.getLocation(this.form.locality_id)
          this.getUpz(this.form.upz_id)
          this.getNeighborhood(this.form.neighborhood_id)
          this.getOffice(this.form.subdirectorate_id)
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
          this.success = true
          this.message = errors.message
        })
    },
    onSubmit() {
      this.finding = true
      this.form.setFormInstance(this.$refs.user_update)
      this.form
        .updateWithFiles(this.$route.query.payload)
        .then((response) => {
          this.$snackbar({ message: response.data, color: 'success' })
          this.success = true
          this.message = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    getDocumentTypes() {
      this.start()
      this.document_type
        .index()
        .then((response) => {
          this.document_types = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    getContractTypes() {
      this.start()
      this.contract_type
        .index()
        .then((response) => {
          this.contract_types = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    getResidenceCountry(id) {
      if (id) {
        this.finding = true
        this.country
          .states(id)
          .then((response) => {
            this.residence_states = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding = false
          })
      }
    },
    getResidenceState(id) {
      if (id) {
        this.finding = true
        this.country
          .cities(this.form.residence_country_id, id)
          .then((response) => {
            this.residence_cities = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding = false
          })
      }
    },
    getCity(id) {
      if (id === 12688) {
        this.finding = true
        this.location
          .index()
          .then((response) => {
            this.locations = response.data
            this.locations.push({
              id: 9999,
              name: 'OTRO',
            })
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding = false
          })
      } else if (id) {
        this.locations.push({
          id: 9999,
          name: 'OTRO',
        })
      }
    },
    getLocation(id) {
      if (id) {
        if (id === 9999) {
          this.upz.push({
            id: 9999,
            name: 'OTRO',
          })
        } else {
          this.finding = true
          this.location
            .upz(id)
            .then((response) => {
              this.upz = response.data
              this.upz.push({
                id: 9999,
                name: 'OTRO',
              })
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.finding = false
            })
        }
      }
    },
    getUpz(id) {
      if (id) {
        if (id === 9999) {
          this.neighborhoods.push({
            id: 9999,
            name: 'OTRO',
          })
        } else {
          this.finding = true
          this.location
            .neighborhood(this.form.locality_id, id)
            .then((response) => {
              this.neighborhoods = response.data
              this.neighborhoods.push({
                id: 9999,
                name: 'OTRO',
              })
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.finding = false
            })
        }
      }
    },
    getNeighborhood(id) {
      if (id !== 9999) {
        this.form.neighborhood = null
      }
    },
    getOffice(id) {
      if (id) {
        this.office
          .areas(id)
          .then((response) => {
            this.dependencies = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding = false
          })
      }
    },
    // Changes
    onChangeResidenceCountry(id) {
      this.residence_states = []
      this.residence_cities = []
      this.locations = []
      this.upz = []
      this.neighborhoods = []
      this.form.residence_state_id = null
      this.form.residence_city_id = null
      this.form.locality_id = null
      this.form.upz_id = null
      this.form.neighborhood_id = null
      this.form.neighborhood = null
      if (id) {
        this.finding = true
        this.country
          .states(id)
          .then((response) => {
            this.residence_states = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding = false
          })
      }
    },
    onChangeResidenceState(id) {
      this.residence_cities = []
      this.locations = []
      this.upz = []
      this.neighborhoods = []
      this.form.residence_city_id = null
      this.form.locality_id = null
      this.form.upz_id = null
      this.form.neighborhood_id = null
      this.form.neighborhood = null
      if (id) {
        this.finding = true
        this.country
          .cities(this.form.residence_country_id, id)
          .then((response) => {
            this.residence_cities = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding = false
          })
      }
    },
    onChangeCity(id) {
      this.locations = []
      this.upz = []
      this.neighborhoods = []
      this.form.locality_id = null
      this.form.upz_id = null
      this.form.neighborhood_id = null
      this.form.neighborhood = null
      if (id === 12688) {
        this.finding = true
        this.location
          .index()
          .then((response) => {
            this.locations = response.data
            this.locations.push({
              id: 9999,
              name: 'OTRO',
            })
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding = false
          })
      } else if (id) {
        this.locations.push({
          id: 9999,
          name: 'OTRO',
        })
      }
    },
    onChangeLocation(id) {
      this.neighborhoods = []
      this.upz = []
      this.form.upz_id = null
      this.form.neighborhood_id = null
      this.form.neighborhood = null
      if (id) {
        if (id === 9999) {
          this.upz.push({
            id: 9999,
            name: 'OTRO',
          })
        } else {
          this.finding = true
          this.location
            .upz(id)
            .then((response) => {
              this.upz = response.data
              this.upz.push({
                id: 9999,
                name: 'OTRO',
              })
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.finding = false
            })
        }
      }
    },
    onChangeUpz(id) {
      this.neighborhoods = []
      this.form.neighborhood_id = null
      this.form.neighborhood = null
      if (id) {
        if (id === 9999) {
          this.neighborhoods.push({
            id: 9999,
            name: 'OTRO',
          })
        } else {
          this.finding = true
          this.location
            .neighborhood(this.form.locality_id, id)
            .then((response) => {
              this.neighborhoods = response.data
              this.neighborhoods.push({
                id: 9999,
                name: 'OTRO',
              })
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.finding = false
            })
        }
      }
    },
    onChangeNeighborhood(id) {
      if (id !== 9999) {
        this.form.neighborhood = null
      }
    },
    onChangeOffice(id) {
      this.dependencies = []
      if (id) {
        this.office
          .areas(id)
          .then((response) => {
            this.dependencies = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding = false
          })
      }
    },
    // Spread
    spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr)
      }
    },
  },
}
</script>
