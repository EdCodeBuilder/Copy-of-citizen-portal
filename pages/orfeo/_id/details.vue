<template>
  <v-container id="timeline" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12">
        <base-material-card
          icon="mdi-file"
          :title="item.subject"
          :color="item.color"
        >
          <v-row class="pa-md-3">
            <v-col cols="12" md="12" class="mt-10">
              <CalendarEvent :selected-event="item" />
            </v-col>
            <v-col cols="12">
              <h1
                class="font-weight-light mb-2 headline"
                v-text="$t('orfeo.event.attachments_count')"
              />
            </v-col>
            <v-col cols="12">
              <v-slide-group show-arrows>
                <v-slide-item
                  v-for="(att, i) in item.attachments"
                  :key="`${i}-att`"
                >
                  <v-list dense three-line>
                    <v-list-item dense>
                      <v-list-item-icon>
                        <v-avatar :color="item.color" size="35">
                          <span
                            class="white--text headline"
                            v-text="att.order"
                          />
                        </v-avatar>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="att.id" />
                        <v-list-item-subtitle v-text="att.status" />
                        <v-list-item-subtitle
                          v-text="
                            att.created_at
                              ? att.created_at.split('.').shift()
                              : att.created_at
                          "
                        />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-slide-item>
              </v-slide-group>
            </v-col>
            <v-col cols="12">
              <h1
                class="font-weight-light mb-2 headline"
                v-text="$t('orfeo.event.associates_count')"
              />
            </v-col>
            <v-col cols="12">
              <v-slide-group show-arrows>
                <v-slide-item
                  v-for="(tag, i) in item.associates"
                  :key="`${i}-tag`"
                >
                  <v-list dense two-line>
                    <v-list-item
                      dense
                      :to="localePath(`/orfeo/${tag.id}/details`)"
                    >
                      <v-list-item-icon class="hidden-sm-and-down">
                        <v-icon>mdi-pin</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="tag.id" />
                        <v-list-item-subtitle v-text="tag.created_at" />
                      </v-list-item-content>
                      <v-list-item-action class="hidden-sm-and-down">
                        <v-icon>mdi-eye</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-slide-item>
              </v-slide-group>
            </v-col>
            <v-col cols="12">
              <h1
                class="font-weight-light mb-2 headline"
                v-text="$t('orfeo.event.informed_count')"
              />
            </v-col>
            <v-col cols="12">
              <v-skeleton-loader
                ref="skeleton"
                :loading="loading"
                transition="scale-transition"
                type="table"
                class="mx-auto"
              >
                <v-data-table
                  :headers="headers"
                  :items="items"
                  item-key="user_id"
                  :options.sync="pagination"
                  :loading="loading"
                  :items-per-page.sync="itemsPerPage"
                  :server-items-length="total"
                  :footer-props="{
                    'items-per-page-options': [5, 10, 15, 25, 50, 100],
                  }"
                >
                  <template v-slot:item.read="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-chip
                          x-small
                          dark
                          :color="item.read ? 'success' : 'danger'"
                          v-on="on"
                        >
                          <v-icon x-small>
                            {{ item.read ? 'mdi-eye' : 'mdi-eye-off' }}
                          </v-icon>
                        </v-chip>
                      </template>
                      <span>
                        {{
                          item.read
                            ? $t('orfeo.event.read')
                            : $t('orfeo.event.not_read')
                        }}
                      </span>
                    </v-tooltip>
                  </template>
                </v-data-table>
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-overlay :value="loadingDetails">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
            ></v-progress-circular>
          </v-overlay>
        </base-material-card>
      </v-col>
      <v-col cols="12" class="mb-12 text-center">
        <h1 class="display-serif-3" v-text="$t('titles.Historic')" />
      </v-col>
      <v-col cols="12">
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(timeline, i) in history"
            :key="i"
            color="primary"
            icon="mdi-calendar"
            fill-dot
            :large="$vuetify.breakpoint.mdAndUp"
            :small="$vuetify.breakpoint.smAndDown"
          >
            <template v-slot:opposite>
              <TimeAgo
                :date-time="
                  timeline.created_at
                    ? timeline.created_at.split('.').shift()
                    : timeline.created_at
                "
              />
            </template>
            <v-card class="pa-6">
              <v-chip
                color="warning"
                class="overline mb-3"
                style="white-space: break-spaces"
                small
                v-text="timeline.transaction"
              />

              <v-list dense two-line>
                <!-- Professional -->
                <v-list-item class="ma-0 pa-0" dense>
                  <v-list-item-icon class="hidden-sm-and-down">
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="timeline.user" />
                    <v-list-item-subtitle v-text="$t('orfeo.event.user')" />
                  </v-list-item-content>
                </v-list-item>
                <!-- Dependency -->
                <v-list-item class="ma-0 pa-0" dense>
                  <v-list-item-icon class="hidden-sm-and-down">
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="timeline.dependency" />
                    <v-list-item-subtitle
                      v-text="$t('orfeo.event.dependency')"
                    />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="$vuetify.breakpoint.smAndDown"
                  class="ma-0 pa-0"
                  dense
                >
                  <v-list-item-icon class="hidden-sm-and-down">
                    <v-icon>mdi-calendar</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="
                        timeline.created_at
                          ? timeline.created_at.split('.').shift()
                          : timeline.created_at
                      "
                    />
                    <v-list-item-subtitle
                      v-text="$t('orfeo.event.changed_at')"
                    />
                  </v-list-item-content>
                </v-list-item>
                <!-- Address -->
                <v-list-item
                  v-if="timeline.addressee_user"
                  class="ma-0 pa-0"
                  dense
                >
                  <v-list-item-icon class="hidden-sm-and-down">
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="timeline.addressee_user" />
                    <v-list-item-subtitle
                      v-text="$t('orfeo.event.addressee_full_name')"
                    />
                  </v-list-item-content>
                </v-list-item>
                <!-- Address -->
                <v-list-item
                  v-if="timeline.addressee_dependency"
                  class="ma-0 pa-0"
                  dense
                >
                  <v-list-item-icon class="hidden-sm-and-down">
                    <v-icon>mdi-map-marker</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="timeline.addressee_dependency" />
                    <v-list-item-subtitle
                      v-text="$t('orfeo.event.addressee_dependency')"
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col v-if="last_page > page" cols="12" class="text-center">
        <v-btn
          :loading="loadingHistory"
          :disabled="loadingHistory"
          fab
          color="primary"
          @click="getHistory"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-speed-dial v-model="fab" fixed bottom right>
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
          :loading="loading"
          :disabled="loading"
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-dots-vertical-circle-outline</v-icon>
        </v-btn>
      </template>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            :loading="loading"
            :disabled="loading"
            color="primary"
            dark
            fab
            small
            v-on="on"
            @click="$router.back()"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('buttons.Back') }}</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            :loading="loading"
            :disabled="loading"
            color="primary"
            dark
            fab
            small
            v-on="on"
            @click="onReload"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('buttons.Reload') }}</span>
      </v-tooltip>
    </v-speed-dial>
    <!--
    <v-fab-transition>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            :loading="loading"
            :disabled="loading"
            color="primary"
            dark
            fixed
            bottom
            right
            fab
            v-on="on"
            @click="$router.back()"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('buttons.Back') }}</span>
      </v-tooltip>
    </v-fab-transition>
    -->
  </v-container>
</template>

<router lang="yaml">
meta:
  title: Details
</router>

<script>
import { Orfeo } from '@/models/services/orfeo/Orfeo'

export default {
  name: 'OrfeoDetails',
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    CalendarEvent: () => import('@/components/orfeo/Event'),
    TimeAgo: () => import('@/components/base/TimeAgo'),
  },
  data: () => ({
    fab: false,
    menu: false,
    form: new Orfeo(),
    item: {},
    loading: false,
    loadingDetails: false,
    pagination: {},
    itemsPerPage: 10,
    total: 0,
    items: [],
    loadingHistory: true,
    history: [],
    page: 0,
    last_page: 1,
  }),
  computed: {
    headers() {
      return [
        {
          text: '#',
          value: 'id',
          sortable: false,
        },
        {
          text: this.$t('orfeo.event.user'),
          value: 'user',
          sortable: false,
        },
        {
          text: this.$t('orfeo.event.dependency'),
          value: 'dependency',
          sortable: false,
        },
        {
          text: this.$t('orfeo.event.description'),
          value: 'description',
          sortable: false,
        },
        {
          text: this.$t('orfeo.event.read'),
          value: 'read',
          sortable: false,
        },
        {
          align: 'right',
          text: this.$t('orfeo.event.created_at'),
          value: 'created_at',
          sortable: false,
        },
      ]
    },
  },
  watch: {
    'pagination.page'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getInformed()
      }
    },
    itemsPerPage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getInformed()
      }
    },
  },
  mounted() {
    this.getData()
    this.getHistory()
  },
  methods: {
    getData() {
      this.loadingDetails = true
      this.form
        .show(this.$route.params.id)
        .then((response) => (this.item = response.data))
        .catch((errors) => this.$snackbar({ message: errors.message }))
        .finally(() => (this.loadingDetails = false))
    },
    getInformed() {
      this.loading = true
      const { page, itemsPerPage } = this.pagination
      const params = {
        page,
        per_page: itemsPerPage,
      }
      this.form
        .informed(this.$route.params.id, { params })
        .then((response) => {
          this.items = response.data
          this.total = response.meta.total
        })
        .catch((errors) => this.$snackbar({ message: errors.message }))
        .finally(() => (this.loading = false))
    },
    getHistory() {
      if (this.last_page > this.page) {
        this.page++
        this.loadingHistory = true
        this.form
          .history(this.$route.params.id, { params: { page: this.page } })
          .then((response) => {
            if (response.data.length > 0) {
              this.history.push(...response.data)
            }
            this.last_page = response.meta.last_page
          })
          .catch((errors) => this.$snackbar({ message: errors.message }))
          .finally(() => (this.loadingHistory = false))
      }
    },
    onReload() {
      this.page = 0
      this.getData()
      this.getHistory()
      this.getInformed()
    },
  },
  head: (vm) => ({
    title: `${vm.$route.params.id} - ${vm.$t('orfeo.titles.details')}`,
  }),
}
</script>
