<template>
  <div id="calendar">
    <h1 class="hidden-md-and-up display-3">
      {{ $refs.calendar ? $refs.calendar.title : '' }}
    </h1>
    <v-toolbar flat>
      <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
        {{ $t('calendar.today') }}
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title class="hidden-sm-and-down">
        {{ $refs.calendar ? $refs.calendar.title : '' }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom right>
        <template v-slot:activator="{ on }">
          <v-btn
            :icon="$vuetify.breakpoint.smAndDown"
            outlined
            color="grey darken-2"
            v-on="on"
          >
            <span class="hidden-sm-and-down">{{ typeToLabel[type] }}</span>
            <v-icon :right="$vuetify.breakpoint.mdAndUp">mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'">
            <v-list-item-title>{{ $t('calendar.day') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title>{{ $t('calendar.week') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'month'">
            <v-list-item-title>{{ $t('calendar.month') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = '4day'">
            <v-list-item-title>{{ $t('calendar.4days') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-divider />
    <v-calendar
      ref="calendar"
      v-model="focus"
      :locale="$i18n.locale"
      color="primary"
      :events="events"
      :event-color="getEventColor"
      :event-margin-bottom="3"
      :now="today"
      :type="type"
      @click:event="showEvent"
      @click:more="viewDay"
      @click:date="viewDay"
      @change="updateRange"
    >
    </v-calendar>
    <v-menu
      v-if="$vuetify.breakpoint.mdAndUp"
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
      max-height="400"
      fixed
    >
      <v-card class="my-0" min-width="350px" flat>
        <v-toolbar :color="selectedEvent.color" dark>
          <v-toolbar-title v-text="selectedEvent.subject" />
          <v-spacer></v-spacer>
          <v-btn
            icon
            :to="{
              path: localePath(`/orfeo/${selectedEvent.id}/details`),
              params: { item: selectedEvent },
            }"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn icon @click="selectedOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <CalendarEvent :selected-event="selectedEvent" />
        </v-card-text>
      </v-card>
    </v-menu>
    <v-dialog
      v-else
      v-model="selectedOpen"
      fullscreen
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card flat>
        <v-toolbar :color="selectedEvent.color" dark>
          <v-toolbar-title v-text="selectedEvent.subject" />
          <v-spacer></v-spacer>
          <v-btn
            icon
            :to="{
              path: localePath(`/orfeo/${selectedEvent.id}/details`),
              params: { item: selectedEvent },
            }"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn icon @click="selectedOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <CalendarEvent :selected-event="selectedEvent" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<router lang="yaml">
path: /calendar
meta:
  title: Calendar
</router>

<script>
import { Orfeo } from '@/models/services/orfeo/Orfeo'
export default {
  name: 'Inspire',
  auth: 'auth',
  components: {
    CalendarEvent: () => import('@/components/orfeo/Event'),
  },
  data: (vm) => ({
    loading: false,
    form: new Orfeo(),
    today: vm.$moment().format('YYYY-MM-DD'),
    focus: vm.$moment().format('YYYY-MM-DD'),
    start: null,
    end: null,
    date: null,
    events: [],
    type: 'month',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  computed: {
    typeToLabel() {
      return {
        month: this.$t('calendar.month'),
        week: this.$t('calendar.week'),
        day: this.$t('calendar.day'),
        '4day': this.$t('calendar.4days'),
      }
    },
  },
  watch: {
    '$vuetify.breakpoint.smAndDown'(val) {
      if (val) {
        this.type = 'day'
      }
    },
  },
  mounted() {
    this.getCalendar()
  },
  methods: {
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    getCalendar() {
      this.loading = true
      const start = this.start ? this.start.date : this.start
      const end = this.end ? this.end.date : this.end
      this.form
        .calendar({
          params: {
            ...this.form.data(),
            start_date: start,
            final_date: end,
          },
        })
        .then((response) => {
          this.events = response.data.map((evt) => {
            const date = evt.created_at.split('.').shift()
            return {
              ...evt,
              name: evt.subject,
              start: date,
              end: evt.final_day,
            }
          })
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading = false))
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
      this.date = null
    },
    setToday() {
      this.focus = this.today
      this.date = this.today
    },
    prev() {
      this.$refs.calendar.prev()
      this.date = null
    },
    next() {
      this.$refs.calendar.next()
      this.date = null
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
      this.date = null
      this.getCalendar()
    },
    getEventColor(event) {
      return event.color
    },
  },
}
</script>

<style lang="scss" scoped>
.v-speed-dial {
  position: absolute;
  z-index: 4;
}

body,
html,
#app,
#calendar {
  width: 100%;
  height: 100%;
  .v-calendar {
    min-height: 90vh;
    min-width: 100%;
  }
}
</style>
