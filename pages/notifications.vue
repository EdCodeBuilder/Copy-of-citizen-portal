<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <base-material-card class="mt-6" icon="mdi-bell">
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                Notificaciones
              </v-toolbar-title>
              <v-spacer />
              <v-menu offset-y left>
                <template #activator="{ on: menu, attrs }">
                  <v-tooltip left>
                    <template #activator="{ on: tooltip }">
                      <v-btn
                        :aria-label="$t('buttons.MoreOptions')"
                        icon
                        v-bind="attrs"
                        v-on="{ ...menu, ...tooltip }"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t('buttons.MoreOptions') }}</span>
                  </v-tooltip>
                </template>
                <v-list dense>
                  <v-list-item @click="$fetch">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="markAllAsRead">
                    <v-list-item-icon>
                      <v-icon>mdi-eye</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      Marcar todo como leido
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <v-card-text>
            <v-list>
              <v-list-item v-for="item in items" :key="item.id">
                <v-list-item-icon>
                  <v-icon :color="item.read_at ? '' : 'success'">
                    mdi-bell
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content @click="onClickNotification(item)">
                  <v-list-item-title v-text="item.data.title" />
                  <v-list-item-subtitle
                    class="caption"
                    v-text="item.data.subject"
                  />
                  <v-list-item-subtitle
                    class="caption"
                    v-text="item.data.user"
                  />
                  <v-list-item-subtitle
                    class="caption"
                    v-text="item.data.created_at"
                  />
                </v-list-item-content>
                <v-list-item-action>
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        small
                        color="error"
                        v-bind="attrs"
                        v-on="on"
                        @click="onDelete(item)"
                      >
                        <v-icon small>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t('buttons.Delete') }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        small
                        color="error"
                        v-bind="attrs"
                        v-on="on"
                        @click="markAsRead(item)"
                      >
                        <v-icon small>mdi-eye</v-icon>
                      </v-btn>
                    </template>
                    <span>Marcar como leido</span>
                  </v-tooltip>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <empty-state
              v-if="items.length === 0"
              icon="mdi-bell-off"
              :rounded="$vuetify.breakpoint.mdAndUp"
              description="No tienes notificaciones"
            >
              <v-btn color="primary" @click="$fetch">
                <v-icon left>mdi-refresh</v-icon>
                Recargar
              </v-btn>
            </empty-state>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Notification } from '~/models/services/auth/Notification'

export default {
  name: 'Notifications',
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('~/components/base/MaterialCard'),
    EmptyState: () => import('~/components/base/EmptyState'),
  },
  data: () => ({
    form: new Notification(),
    items: [],
  }),
  fetch() {
    this.form.index().then((response) => {
      this.items = response.data
    })
  },
  methods: {
    onClickNotification(item) {
      this.form
        .show(item.id)
        .then(() => this.$fetch)
        .finally(() => {
          this.$router.push(this.localePath(item.data.url))
        })
    },
    markAllAsRead() {
      this.form.store().finally(() => this.$fetch)
    },
    markAsRead(item) {
      this.form.show(item.id).finally(() => this.$fetch)
    },
    onDelete(item) {
      this.form.destroy(item.id).finally(() => this.$fetch)
    },
  },
}
</script>
