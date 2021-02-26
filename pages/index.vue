<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12" sm="6" lg="4">
        <base-material-stats-card
          color="danger"
          icon="mdi-clipboard-check"
          title="Total"
          :value="counters.total"
          animated-number
          :progress="finding"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.total"
        >
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getCounters"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
          <v-menu>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-1"
                    color="primary"
                    light
                    icon
                    x-small
                    v-on="{ ...menu, ...tooltip }"
                  >
                    <v-icon>mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('buttons.Help') }}</span>
              </v-tooltip>
            </template>
            <v-card max-width="250">
              <v-card-title class="title">
                <v-icon left>mdi-help-circle-outline</v-icon>
                Total
              </v-card-title>
              <v-card-text class="caption">
                Usuarios Registrados en el sistema
              </v-card-text>
            </v-card>
          </v-menu>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="6" lg="4">
        <base-material-stats-card
          color="info"
          icon="mdi-file-cloud-outline"
          title="Secop"
          :value="counters.secop"
          animated-number
          :progress="finding"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.secop"
        >
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getCounters"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
          <v-menu>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-1"
                    color="primary"
                    light
                    icon
                    x-small
                    v-on="{ ...menu, ...tooltip }"
                  >
                    <v-icon>mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('buttons.Help') }}</span>
              </v-tooltip>
            </template>
            <v-card max-width="250">
              <v-card-title class="title">
                <v-icon left>mdi-help-circle-outline</v-icon>
                Secop
              </v-card-title>
              <v-card-text class="caption">
                Usuarios que cuentan con pantallazo de SECOP
              </v-card-text>
            </v-card>
          </v-menu>
        </base-material-stats-card>
      </v-col>

      <v-col class="my-4" cols="12" sm="6" lg="4">
        <base-material-stats-card
          color="warning"
          icon="mdi-printer"
          title="ARL"
          :value="counters.arl"
          animated-number
          :progress="finding"
          sub-icon="mdi-ticket-confirmation"
          :sub-text="counters.arl"
        >
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="primary"
                light
                icon
                x-small
                @click="getCounters"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
          <v-menu>
            <template #activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-1"
                    color="primary"
                    light
                    icon
                    x-small
                    v-on="{ ...menu, ...tooltip }"
                  >
                    <v-icon>mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('buttons.Help') }}</span>
              </v-tooltip>
            </template>
            <v-card max-width="250">
              <v-card-title class="title">
                <v-icon left>mdi-help-circle-outline</v-icon>
                ARL
              </v-card-title>
              <v-card-text class="caption">
                Usuarios que cuentan con ARL
              </v-card-text>
            </v-card>
          </v-menu>
        </base-material-stats-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Contractor } from '~/models/services/portal/Contractor'

export default {
  name: 'Dashboard',
  auth: 'auth',
  components: {
    BaseMaterialStatsCard: () => import('@/components/base/MaterialStatsCard'),
  },
  data: () => ({
    form: new Contractor(),
    finding: false,
    counters: {
      total: 0,
      secop: 0,
      arl: 0,
    },
  }),
  fetch() {
    this.getCounters()
  },
  head: () => ({
    title: 'Dashboard',
  }),
  methods: {
    getCounters() {
      this.start()
      this.form
        .count()
        .then((response) => {
          this.counters = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    // Loading
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    },
  },
}
</script>

<style lang="scss">
#file-type {
  .ct-label.ct-vertical {
    font-size: 12px;
  }
}
#simple-bar {
  .ct-series-a .ct-bar {
    fill: #00cae3 !important;
    stroke: #00cae3 !important;
  }
}
.v-apexchart-card {
  .apexcharts-menu-item {
    color: black;
  }
  .apexcharts-toolbar {
    color: white;
  }
  .apexcharts-tooltip {
    color: black;
  }
  .apexcharts-menu-icon svg,
  .apexcharts-pan-icon svg,
  .apexcharts-zoom-icon svg,
  .apexcharts-zoomin-icon svg,
  .apexcharts-zoomout-icon svg,
  .apexcharts-reset-icon svg {
    fill: white !important;
  }
  .apexcharts-menu-icon.apexcharts-selected svg,
  .apexcharts-pan-icon.apexcharts-selected svg,
  .apexcharts-zoom-icon.apexcharts-selected svg,
  .apexcharts-zoomin-icon.apexcharts-selected svg,
  .apexcharts-zoomout-icon.apexcharts-selected svg,
  .apexcharts-reset-icon.apexcharts-selected svg {
    fill: #fff !important;
  }
  .apexcharts-tooltip-marker {
    fill: #00b0ff;
  }
}
</style>
