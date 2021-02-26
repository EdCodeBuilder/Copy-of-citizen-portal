<template>
  <v-app-bar
    id="app-bar-dashboard"
    :clipped-left="clip"
    fixed
    app
    height="45"
    color="transparent"
  >
    <v-btn
      icon
      @click="
        $vuetify.breakpoint.smAndDown
          ? setDrawer(!drawer)
          : $emit('input', !value)
      "
    >
      <v-icon v-if="value">mdi-view-quilt</v-icon>
      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-btn class="hidden-sm-and-down" icon @click.stop="setClipped">
      <v-icon>mdi-application</v-icon>
    </v-btn>

    <v-toolbar-title
      :class="{ 'hidden-sm-and-down': $route.path !== localePath('/') }"
      class="font-weight-light"
      v-text="title"
    />

    <v-spacer />

    <div class="mx-3" />

    <v-btn class="ml-2" icon>
      <v-offline-icon />
    </v-btn>

    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          :to="localePath({ name: 'index' })"
          exact
          class="ml-2"
          icon
          v-on="on"
        >
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('titles.Dashboard') }}</span>
    </v-tooltip>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template #activator="{ attrs, on }">
        <v-btn class="ml-2" icon v-bind="attrs" v-on="on">
          <v-badge color="red" overlap bordered :value="unreadNotification > 0">
            <template #badge>
              <div>{{ badge }}</div>
            </template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        id="notification"
        :tile="false"
        subheader
        nav
        dense
        max-width="400"
      >
        <v-subheader>
          Notificaciones
          <v-spacer />
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="success"
                v-bind="attrs"
                v-on="on"
                @click="$fetch"
              >
                <v-icon small>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
        </v-subheader>
        <div>
          <app-bar-item
            v-for="(item, i) in notifications"
            :key="`item-${i}`"
            three-line
          >
            <v-list-item-icon class="hidden-sm-and-down">
              <v-icon>mdi-bell</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="onReadNotification(item)">
              <v-list-item-title>
                {{ item.data.title }} -
                <time-ago :date-time="item.data.created_at" />
              </v-list-item-title>
              <v-list-item-subtitle>
                <small class="caption">
                  {{ item.data.subject }}
                </small>
              </v-list-item-subtitle>
              <v-list-item-subtitle class="caption" v-text="item.data.user" />
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
            </v-list-item-action>
          </app-bar-item>
          <v-list-item v-if="notifications.length === 0" dense>
            <v-list-item-content>
              <v-list-item-title>No tienes notificaciones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-btn block text small :to="localePath({ name: 'notifications' })">
          Ver todas las notificaciones
        </v-btn>
      </v-list>
    </v-menu>

    <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template #activator="{ attrs, on }">
        <v-btn class="ml-2" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list :tile="false" flat nav>
        <app-bar-item :to="localePath(profile)">
          <v-list-item-icon>
            <v-icon>mdi-card-account-details-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('titles.Profile')" />
        </app-bar-item>
        <app-bar-item @click.native="onSetRightDrawer">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('titles.Settings')" />
        </app-bar-item>
        <v-divider class="mb-2 mt-2" />
        <app-bar-item :href="help" target="_blank">
          <v-list-item-icon>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('buttons.Help')" />
        </app-bar-item>
        <v-divider class="mb-2 mt-2" />
        <app-bar-item @click.native="onLogout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('titles.Logout')" />
        </app-bar-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from 'vuetify/lib'
import VOfflineIcon from '@/components/base/VOfflineIcon'
import TimeAgo from '@/components/base/TimeAgo'
import { Notification } from '~/models/services/auth/Notification'
export default {
  name: 'AppBar',
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    'white--text primary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              )
            },
          },
        })
      },
    },
    VOfflineIcon,
    TimeAgo,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    clip: false,
    form: new Notification(),
    notifications: [],
    profile: {
      name: 'user-profile',
    },
    interval: null,
    help: process.env.VUE_APP_MANUAL,
  }),
  fetch() {
    this.form.index().then((response) => {
      this.notifications = response.data
    })
  },
  computed: {
    badge() {
      return this.unreadNotification > 98 ? '99+' : this.unreadNotification
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    unreadNotification() {
      return this.notifications.filter((n) => n.read_at === null).length
    },
    title() {
      return this.$t(`titles.${this.$route.meta.title || 'Dashboard'}`)
    },
    drawer() {
      return this.$store.getters['app/getStatusDrawer']
    },
    clipped: {
      get() {
        return this.$store.getters['app/getClipped']
      },
      set(val) {
        this.$store.dispatch('app/toggleClipped', val)
      },
    },
    miniVariant: {
      get() {
        return this.$store.getters['app/getMiniVariant']
      },
      set(val) {
        this.$store.dispatch('app/toggleMiniVariant', val)
      },
    },
    rightDrawer: {
      get() {
        return this.$store.getters['app/getStatusRightDrawer']
      },
      set(val) {
        this.$store.dispatch('app/toggleRightDrawer', val)
      },
    },
  },
  mounted() {
    const that = this
    this.interval = setInterval(that.getNotifications.bind(that), 30000)
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    getNotifications() {
      if (this.loggedIn) {
        this.$fetch()
      }
    },
    setClipped() {
      this.clip = !this.clip
      this.clipped = this.clip
    },
    setDrawer(val) {
      this.$store.dispatch('app/toggleDrawer', val)
    },
    onLogout() {
      this.$auth
        .logout()
        .then(() => {
          this.$snackbar({
            message: 'Se ha cerrado sesión satisfactoriamente',
            color: 'success',
          })
        })
        .finally(() => {
          this.$router.push(this.localePath('/login'))
          if (this.interval) {
            clearInterval(this.interval)
          }
        })
    },
    onSetRightDrawer() {
      this.$store.dispatch('app/toggleRightDrawer', true)
    },
    onReadNotification(item) {
      this.form
        .show(item.id)
        .then(() => this.$fetch)
        .finally(() => {
          this.$router.push(this.localePath(item.data.url))
        })
    },
    onDelete(item) {
      this.form.destroy(item.id).finally(() => this.$fetch)
    },
  },
}
</script>

<style lang="scss">
#notification {
  .v-list {
    height: 500px; /* or any height you want */
    overflow-y: auto;
  }
}
</style>
