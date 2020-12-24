<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="danger"
          icon="mdi-clipboard-check"
          :title="$t('orfeo.stats.filed')"
          :value="counters.filed"
          animated-number
          :progress="loading.filed"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.filed"
        >
          <v-tooltip top>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getByStatus('filed')"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-file-cloud-outline"
          :title="$t('orfeo.stats.principal')"
          :value="counters.principal"
          animated-number
          :progress="loading.principal"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.principal"
        >
          <v-tooltip top>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getByStatus('principal')"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="warning"
          icon="mdi-printer"
          :title="$t('orfeo.stats.printed')"
          :value="counters.printed"
          animated-number
          :progress="loading.printed"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.printed"
        >
          <v-tooltip top>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getByStatus('printed')"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="success"
          icon="mdi-send"
          :title="$t('orfeo.stats.sent')"
          :value="counters.sent"
          animated-number
          :progress="loading.sent"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.sent"
        >
          <v-tooltip top>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getByStatus('sent')"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
        </base-material-stats-card>
      </v-col>

      <v-col cols="12" sm="12" lg="6" class="my-4 mx-auto">
        <base-material-chart-card
          hover-reveal
          :data="monthly_chart.data"
          ratio=""
          :responsive-options="monthly_chart.responsiveOptions"
          :options="monthly_chart.options"
          color="primary"
          :progress="loading.month"
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  @click="getByMonth"
                  v-on="on"
                >
                  <v-icon class="success--text">mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Refresh') }}</span>
            </v-tooltip>
          </template>
          <h4 class="title font-weight-light">
            {{ $t('orfeo.chart.month') }} - {{ monthly_range }}
          </h4>
          <p
            v-for="(item, i) in monthly_data.data"
            :key="`data-${i}`"
            class="category d-inline-flex font-weight-light"
          >
            <v-icon color="info" class="mr-1" small>mdi-domain</v-icon>
            {{ monthly_chart.data.labels[item.month - 1] }}
            <span class="cyan--text">{{ item.count }}</span>
          </p>

          <template slot="actions">
            <v-icon :left="!$vuetify.rtl" :right="$vuetify.rtl" small>
              mdi-clock-outline
            </v-icon>
            <TimeAgo
              :loading="loading.month"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light"
              :date-time="monthly_data.requested_at"
            />
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" sm="12" lg="6" class="my-4 mx-auto">
        <base-material-chart-card
          id="file-type"
          hover-reveal
          :data="type_chart.data"
          ratio=""
          :responsive-options="type_chart.responsiveOptions"
          :options="type_chart.options"
          color="green"
          :progress="loading.type"
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  @click="getByFileType"
                  v-on="on"
                >
                  <v-icon class="success--text">mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Refresh') }}</span>
            </v-tooltip>
          </template>
          <h4 class="title font-weight-light">
            {{ $t('orfeo.chart.type') }}
          </h4>
          <p
            v-for="(item, i) in type_data.data"
            :key="`data-${i}`"
            class="category d-inline-flex font-weight-light"
          >
            <v-icon :color="item.color" class="mr-1" small>mdi-file</v-icon>
            {{ item.name }}
            <span class="cyan--text">{{ item.count }}</span>
          </p>

          <template slot="actions">
            <v-icon :left="!$vuetify.rtl" :right="$vuetify.rtl" small>
              mdi-clock-outline
            </v-icon>
            <TimeAgo
              :loading="loading.type"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light"
              :date-time="type_data.requested_at"
            />
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col class="my-4" cols="12">
        <base-material-card
          icon="mdi-folder"
          :title="$t('orfeo.table.folder')"
          color="warning"
        >
          <v-row>
            <v-col cols="12" md="6" class="mt-10">
              <v-simple-table class="ml-2">
                <thead>
                  <tr>
                    <th v-text="$t('orfeo.event.folder')" />
                    <th v-text="$t('orfeo.event.read')" />
                    <th v-text="$t('orfeo.event.not_read')" />
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(folder, i) in folders.data" :key="i">
                    <td v-text="folder.name" />
                    <td v-text="folder.read_count" />
                    <td v-text="folder.unread_count" />
                    <td v-text="folder.filed_count" />
                  </tr>
                </tbody>
              </v-simple-table>
              <v-btn
                class="mx-1"
                color="success"
                light
                :loading="loading.folder"
                block
                @click="getByFolder"
              >
                <v-icon left>mdi-refresh</v-icon>
                {{ $t('buttons.Refresh') }}
              </v-btn>
            </v-col>

            <v-col id="simple-bar" cols="12" md="6">
              <h1 class="display-serif-2 text-center my-2">
                {{ $t('orfeo.table.read') }}
              </h1>
              <chartist
                :data="read_chart.data"
                :responsive-options="read_chart.responsiveOptions"
                :options="read_chart.options"
                ratio="16/9"
                style="min-height: 200px"
                type="Pie"
              />
              <v-list>
                <template v-for="(read, i) in read_chart.data.series">
                  <v-list-item :key="`item-${i}`">
                    <v-list-item-icon>
                      <v-icon
                        v-if="read.name === 'LEIDO'"
                        :color="read.className"
                        v-text="`mdi-eye`"
                      />
                      <v-icon
                        v-else
                        :color="read.className"
                        v-text="`mdi-eye-off`"
                      />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        v-if="read.name === 'LEIDO'"
                        v-text="
                          `${$t('orfeo.event.read')} ${read.meta}
                          - ${read.value}%`
                        "
                      />
                      <v-list-item-title
                        v-else
                        v-text="
                          `${$t('orfeo.event.not_read')} ${read.meta}
                          - ${read.value}%`
                        "
                      />
                      <v-list-item-subtitle>
                        <TimeAgo
                          :loading="loading.read"
                          :prefix="$t('buttons.Updated')"
                          classes="caption grey--text font-weight-light"
                          :date-time="folders.requested_at"
                        />
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
              <v-btn
                class="mx-1"
                color="success"
                light
                block
                :loading="loading.read"
                @click="getByRead"
              >
                <v-icon left>mdi-refresh</v-icon>
                {{ $t('buttons.Refresh') }}
              </v-btn>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="12" lg="12">
        <base-material-card
          icon="mdi-earth"
          :title="$t('orfeo.table.dashboard')"
          color="green"
        >
          <v-row>
            <v-col cols="12" md="12" class="mt-10">
              <v-skeleton-loader
                ref="skeleton"
                :loading="loading.dependency"
                transition="scale-transition"
                type="table"
                class="mx-auto"
              >
                <v-simple-table>
                  <thead>
                    <tr>
                      <th colspan="3">
                        <v-tooltip top>
                          <template v-slot:activator="{ attrs, on }">
                            <v-btn
                              v-bind="attrs"
                              class="mx-1"
                              color="success"
                              light
                              icon
                              @click="getByDependency"
                              v-on="on"
                            >
                              <v-icon class="success--text">mdi-refresh</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ $t('buttons.Refresh') }}</span>
                        </v-tooltip>
                        <TimeAgo
                          :loading="loading.dependency"
                          :prefix="$t('buttons.Updated')"
                          classes="caption grey--text font-weight-light"
                          :date-time="dependency_data.requested_at"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(dep, i) in dependency_data.data" :key="i">
                      <td v-text="dep.name" />
                      <td v-text="dep.count" />
                      <td
                        v-text="
                          ((dep.count / totalCounter) * 100).toFixed(5) + '%'
                        "
                      />
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>
    <filter-form :loading="finding" @on-submit="onFilter" />
  </v-container>
</template>

<router lang="yaml">
path: /orfeo
meta:
  title: Dashboard
</router>

<script>
import { Orfeo } from '@/models/services/orfeo/Orfeo'

export default {
  name: 'Dashboard',
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    BaseMaterialStatsCard: () => import('@/components/base/MaterialStatsCard'),
    BaseMaterialChartCard: () => import('@/components/base/MaterialChartCard'),
    TimeAgo: () => import('@/components/base/TimeAgo'),
    FilterForm: () => import('@/components/orfeo/Filter'),
  },
  data: () => ({
    counters: {
      filed: 0,
      principal: 0,
      printed: 0,
      sent: 0,
    },
    monthly_chart: {},
    monthly_data: {},
    monthly_range: '2020',
    type_chart: {},
    read_chart: {
      options: {},
      responsiveOptions: [
        [
          'screen and (min-width: 640px)',
          {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc(value) {
              return value
            },
          },
        ],
        [
          'screen and (min-width: 1024px)',
          {
            labelOffset: 10,
            chartPadding: 20,
          },
        ],
      ],
      data: {
        labels: ['LEIDO', 'NO LEIDO'],
        series: [
          {
            value: ((80 / 100) * 100).toFixed(0),
            name: 'LEIDO',
            meta: 80,
            className: 'green',
          },
          {
            value: ((20 / 100) * 100).toFixed(0),
            name: 'NO LEIDO',
            meta: 20,
            className: 'red',
          },
        ],
      },
    },
    folders: {
      data: [],
    },
    type_data: {},
    dependency_data: {},
    form: new Orfeo(),
    loading: {
      filed: false,
      principal: false,
      printed: false,
      sent: false,
      dependency: false,
      month: false,
      type: false,
      read: false,
      folder: false,
    },
  }),
  computed: {
    totalCounter() {
      return this.dependency_data.data.reduce((acc, val) => acc + val.count, 0)
    },
    finding() {
      return Object.values(this.loading).includes(true)
    },
  },
  mounted() {
    this.monthly_chart = {
      data: {
        labels: [
          'En',
          'Fe',
          'Ma',
          'Ab',
          'Ma',
          'Ju',
          'Ju',
          'Ag',
          'Se',
          'Oc',
          'No',
          'Di',
        ],
        series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      },
      options: {
        axisY: {
          labelInterpolationFnc(num) {
            if (Math.abs(num) > 999 && Math.abs(num) <= 999999) {
              return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
            }
            if (Math.abs(num) > 999999) {
              return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M'
            }
            return Math.sign(num) * Math.abs(num)
          },
        },
        lineSmooth: this.$chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 10,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      responsiveOptions: [
        [
          'screen and (max-width: 640px)',
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc(value) {
                return value[0]
              },
            },
          },
        ],
      ],
    }
    this.type_chart = {
      data: {
        labels: [
          'SALIDA',
          'RESOLUCIONES',
          'ACTAS',
          'HISTORIASLABORALES',
          'MEMORANDO',
          'ENTRADA',
          'CIRCULARES',
          'PLANILLAS',
        ],
        series: [[0, 0, 0, 0, 0, 0, 0, 0]],
      },
      options: {
        axisY: {
          labelInterpolationFnc(num) {
            if (Math.abs(num) > 999 && Math.abs(num) <= 999999) {
              return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
            }
            if (Math.abs(num) > 999999) {
              return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M'
            }
            return Math.sign(num) * Math.abs(num)
          },
        },
        lineSmooth: this.$chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    }
    this.onLoadData()
  },
  methods: {
    getByDependency() {
      this.loading.dependency = true
      this.form
        .countByDependency({ params: this.form.data() })
        .then((response) => {
          this.dependency_data = response
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.dependency = false))
    },
    getByStatus(status) {
      this.loading[status] = true
      this.counters[status] = 0
      this.form
        .countByStatus(status, { params: this.form.data() })
        .then((response) => {
          this.counters[status] = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading[status] = false))
    },
    getByMonth() {
      this.loading.month = true
      this.form
        .countByMonth({ params: this.form.data() })
        .then((response) => {
          this.monthly_data = response
          this.monthly_range = response.details.years
          const series3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          const months = [
            'En',
            'Fe',
            'Ma',
            'Ab',
            'Ma',
            'Ju',
            'Ju',
            'Ag',
            'Se',
            'Oc',
            'No',
            'Di',
          ]
          this.monthly_data.data.map((c) => {
            series3[c.month - 1] = c.count
          })
          this.monthly_chart.data = {
            labels: months,
            series: [series3],
          }
          this.monthly_chart.options.high = Math.max(...series3) + 2
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.month = false))
    },
    getByFileType() {
      this.loading.type = true
      this.form
        .countByFileType({ params: this.form.data() })
        .then((response) => {
          this.type_data = response
          const series3 = [0, 0, 0, 0, 0, 0, 0, 0]
          const types = [
            'SALIDA',
            'RESOLUCIONES',
            'ACTAS',
            'HISTORIASLABORALES',
            'MEMORANDO',
            'ENTRADA',
            'CIRCULARES',
            'PLANILLAS',
          ]
          this.type_data.data.map((c, i) => {
            series3[i] = c.count
            types[i] = c.name
          })
          this.type_chart.data = {
            labels: types,
            series: [series3],
          }
          this.type_chart.options.high = Math.max(...series3) + 2
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.type = false))
    },
    getByRead() {
      this.loading.read = true
      this.form
        .countByRead({ params: this.form.data() })
        .then((response) => {
          this.read_chart.data.labels = ['LEIDO', 'NO LEIDO']
          const total = response.data.read + response.data.unread
          this.read_chart.data.series = [
            {
              value: ((response.data.read / total) * 100).toFixed(0),
              name: 'LEIDO',
              meta: response.data.read,
              className: 'green',
            },
            {
              value: ((response.data.unread / total) * 100).toFixed(0),
              name: 'NO LEIDO',
              meta: response.data.unread,
              className: 'red',
            },
          ]
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.read = false))
    },
    getByFolder() {
      this.loading.folder = true
      this.form
        .countByFolder({ params: this.form.data() })
        .then((response) => {
          this.folders = response
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.folder = false))
    },
    onFilter(data) {
      this.form = new Orfeo(data)
      this.$nextTick(function () {
        this.onLoadData()
      })
    },
    onLoadData() {
      this.getByStatus('filed')
      this.getByStatus('principal')
      this.getByStatus('printed')
      this.getByStatus('sent')
      this.getByDependency()
      this.getByMonth()
      this.getByFileType()
      this.getByFolder()
      this.getByRead()
    },
  },
  head: (vm) => ({
    title: vm.$t('orfeo.titles.index'),
  }),
}
</script>

<style lang="sass">
#file-type
  .ct-label.ct-vertical
    font-size: 12px
#simple-bar
  .ct-series-a .ct-bar
    fill: #00cae3 !important
    stroke: #00cae3 !important
</style>
