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
      v-if="$route.path !== localePath('/')"
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

    <v-btn
      v-if="$route.path !== localePath('/')"
      class="hidden-sm-and-down"
      icon
      @click.stop="setClipped"
    >
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

    <v-tooltip v-if="$route.path !== localePath('/')" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          :to="localePath('/')"
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
      v-if="$route.path !== localePath('/')"
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" icon v-bind="attrs" v-on="on">
          <v-badge color="red" overlap bordered>
            <template v-slot:badge>
              <div>{{ notifications.length }}</div>
            </template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
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
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          :class="{ 'hidden-sm-and-down': $route.path !== localePath('/') }"
          class="ml-2"
          icon
          v-bind="attrs"
          v-on="on"
        >
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
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    clip: false,
    notifications: [
      'Nuevo Radicado',
      'Radicado Informado',
      '2 Radicados de Entrada',
      '5 Radicados de Salida',
      'Historial de Radicados',
    ],
    profile: {
      name: 'user-profile',
    },
  }),
  computed: {
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
  methods: {
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
        .then((response) => {
          this.$snackbar({
            message: response.data.data.message,
            color: 'success',
          })
        })
        .catch((errors) => {
          this.$snackbar({
            message: errors.response ? errors.response.data.message : errors,
          })
        })
        .finally(() => {
          this.$router.push(this.localePath('/login'))
        })
    },
    onSetRightDrawer() {
      this.$store.dispatch('app/toggleRightDrawer', true)
    },
  },
}
</script>
