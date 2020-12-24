<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12">
        <base-material-card
          icon="mdi-domain"
          :title="$t('orfeo.table.filed')"
          color="green"
        >
          <v-row>
            <v-col cols="12" class="d-inline text-right">
              {{ $t('orfeo.event.status') }}
              <v-chip small dark color="danger">
                <v-icon small left>{{ icons['danger'] }}</v-icon>
                {{ $t('orfeo.stats.filed') }}
              </v-chip>
              <v-chip small dark color="info">
                <v-icon small left>{{ icons['info'] }}</v-icon>
                {{ $t('orfeo.stats.principal') }}
              </v-chip>
              <v-chip small dark color="warning">
                <v-icon small left>{{ icons['warning'] }}</v-icon>
                {{ $t('orfeo.stats.printed') }}
              </v-chip>

              <v-chip small dark color="success">
                <v-icon small left>{{ icons['success'] }}</v-icon>
                {{ $t('orfeo.stats.sent') }}
              </v-chip>
            </v-col>
            <v-col cols="12" md="12" class="mt-10">
              <v-skeleton-loader
                ref="skeleton"
                :loading="loading"
                transition="scale-transition"
                type="table"
                class="mx-auto"
              >
                <v-data-table
                  :headers="tableHeaders"
                  :items="items"
                  :options.sync="pagination"
                  :loading="loading"
                  :items-per-page.sync="itemsPerPage"
                  :server-items-length="total"
                  show-expand
                  single-expand
                  :footer-props="{
                    'items-per-page-options': [5, 10, 15, 25, 50, 100],
                  }"
                >
                  <template v-slot:item.document_type="{ item }">
                    {{
                      $vuetify.breakpoint.smAndDown
                        ? `${item.document_type.substr(0, 30)}...`
                        : item.document_type
                    }}
                  </template>
                  <template v-slot:item.business_days="{ item }">
                    <span>{{ item.business_days }} Días</span>
                  </template>
                  <template v-slot:item.created_at="{ item }">
                    <span>{{ item.created_at.split('.').shift() }}</span>
                  </template>
                  <template v-slot:item.days_left="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-progress-linear
                          :value="percent(item)"
                          color="success"
                          height="25"
                          v-on="on"
                        >
                          <strong>{{ Math.ceil(percent(item)) }}%</strong>
                        </v-progress-linear>
                      </template>
                      <span>
                        {{ `${item.days_left} ${$t('orfeo.event.days_left')}` }}
                      </span>
                    </v-tooltip>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-chip x-small dark :color="item.color" v-on="on">
                          <v-icon x-small>{{ icons[item.color] }}</v-icon>
                        </v-chip>
                      </template>
                      <span>{{ item.status }}</span>
                    </v-tooltip>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          icon
                          :to="{
                            path: localePath(`/orfeo/${item.id}/details`),
                            params: { item: item },
                          }"
                          v-on="on"
                        >
                          <v-icon color="warning">mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('buttons.View') }}</span>
                    </v-tooltip>
                  </template>
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                      <v-row
                        v-for="(expanded_item, key) in headers_expand"
                        :key="`expanded-${key}`"
                      >
                        <v-col cols="12" sm="12" md="6">
                          <div class="font-weight-bold">
                            {{ expanded_item.label }}
                          </div>
                        </v-col>
                        <v-col
                          v-if="expanded_item.field === 'read'"
                          cols="12"
                          align-self="center"
                          class="text-center justify-center mx-auto"
                          sm="12"
                          md="6"
                        >
                          {{
                            item[expanded_item.field]
                              ? $t('orfeo.event.read')
                              : $t('orfeo.event.not_read')
                          }}
                        </v-col>
                        <v-col
                          v-else
                          cols="12"
                          align-self="center"
                          class="text-center justify-center mx-auto"
                          sm="12"
                          md="6"
                        >
                          {{ item[expanded_item.field] }}
                        </v-col>
                      </v-row>
                    </td>
                  </template>
                </v-data-table>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>
    <filter-form :loading="loading" @on-submit="onFilter" />
  </v-container>
</template>

<router lang="yaml">
meta:
  title: Orfeo
</router>

<script>
import { Orfeo } from '@/models/services/orfeo/Orfeo'

export default {
  name: 'Orfeo',
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    FilterForm: () => import('@/components/orfeo/Filter'),
  },
  data: () => ({
    loading: false,
    dialog: false,
    pagination: {},
    itemsPerPage: 10,
    total: 0,
    items: [],
    form: new Orfeo(),
    icons: {
      danger: 'mdi-clipboard-check',
      info: 'mdi-file-cloud-outline',
      warning: 'mdi-printer',
      success: 'mdi-send',
    },
  }),
  computed: {
    tableHeaders() {
      return [
        {
          text: '#',
          value: 'id',
          sortable: false,
        },
        {
          text: this.$t('orfeo.event.document_type'),
          value: 'document_type',
          sortable: false,
        },
        {
          text: this.$t('orfeo.event.status'),
          value: 'status',
          sortable: false,
        },
        {
          text: this.$t('orfeo.event.business_days'),
          value: 'business_days',
          sortable: false,
        },
        {
          text: this.$t('orfeo.event.days_left'),
          value: 'days_left',
          sortable: false,
        },
        {
          align: 'right',
          text: this.$t('orfeo.event.created_at'),
          value: 'created_at',
          sortable: false,
        },
        {
          align: 'right',
          text: this.$t('orfeo.event.final_day'),
          value: 'final_day',
          sortable: false,
        },
        {
          align: 'right',
          text: this.$t('buttons.Actions'),
          value: 'actions',
          sortable: false,
        },
      ]
    },
    headers_expand() {
      return [
        {
          label: this.$t('orfeo.event.subject'),
          field: 'subject',
        },
        {
          label: this.$t('orfeo.event.folder'),
          field: 'folder',
        },
        {
          label: this.$t('orfeo.event.read'),
          field: 'read',
        },
        {
          label: this.$t('orfeo.event.addressee_document'),
          field: 'addressee_document',
        },
        {
          label: this.$t('orfeo.event.addressee_full_name'),
          field: 'addressee_full_name',
        },
        {
          label: this.$t('orfeo.event.address'),
          field: 'address',
        },
        {
          label: this.$t('orfeo.event.city'),
          field: 'city',
        },
        {
          label: this.$t('orfeo.event.state'),
          field: 'state',
        },
        {
          label: this.$t('orfeo.event.country'),
          field: 'country',
        },
        {
          label: this.$t('orfeo.event.current_user_name'),
          field: 'current_user_name',
        },
        {
          label: this.$t('orfeo.event.current_user_document'),
          field: 'current_user_document',
        },
        {
          label: this.$t('orfeo.event.current_dependency_name'),
          field: 'current_dependency_name',
        },
        {
          label: this.$t('orfeo.event.attachments_count'),
          field: 'attachments_count',
        },
        {
          label: this.$t('orfeo.event.associates_count'),
          field: 'associates_count',
        },
        {
          label: this.$t('orfeo.event.informed_count'),
          field: 'informed_count',
        },
      ]
    },
  },
  watch: {
    'pagination.page'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getData()
      }
    },
    itemsPerPage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getData()
      }
    },
  },
  methods: {
    getData() {
      this.loading = true
      const { page, itemsPerPage } = this.pagination
      const params = {
        ...this.form.data(),
        page,
        per_page: itemsPerPage,
      }
      this.form
        .index({ params })
        .then((response) => {
          this.items = response.data
          this.total = response.meta.total
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading = false))
    },
    percent(item) {
      const x = parseInt(item.business_days) - parseInt(item.days_left)
      return x > 0 ? parseInt((x * 100) / item.business_days) : 100
    },
    onFilter(data) {
      this.form = new Orfeo(data)
      this.$nextTick(function () {
        this.getData()
      })
    },
  },
  head: (vm) => ({
    title: vm.$t('orfeo.titles.filed'),
  }),
}
</script>
