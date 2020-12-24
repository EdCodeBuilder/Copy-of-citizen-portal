<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-data-iterator
          :items="modules"
          :items-per-page.sync="itemsPerPage"
          :server-items-length="total"
          :search="search"
          :options.sync="pagination"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [5, 10, 15, 25, 30, 35, 50, 100],
          }"
        >
          <template v-slot:loading>
            <v-card flat>
              <v-card-text>
                <v-skeleton-loader
                  loading
                  :type="`list-item-avatar-two-line@${itemsPerPage}`"
                />
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:header>
            <v-toolbar flat :extended="$vuetify.breakpoint.smAndDown">
              <v-toolbar-title v-text="$t('titles.Modules')" />
              <v-spacer />
              <v-text-field
                v-model="search"
                :label="$t('buttons.Search')"
                type="search"
                single-line
                clearable
                hide-details
                class="hidden-sm-and-down ml-3"
                prepend-icon="mdi-magnify"
                :loading="loading"
                :disabled="loading"
              />
              <v-spacer />
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    :loading="loading"
                    :disabled="loading"
                    @click="list = true"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-format-list-bulleted'" />
                  </v-btn>
                </template>
                <span v-text="$t('buttons.List')" />
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    :loading="loading"
                    :disabled="loading"
                    @click="list = false"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-grid'" />
                  </v-btn>
                </template>
                <span v-text="$t('buttons.Grid')" />
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    :loading="loading"
                    :disabled="loading"
                    @click="getModules"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-refresh'" />
                  </v-btn>
                </template>
                <span v-text="$t('buttons.Refresh')" />
              </v-tooltip>
              <template v-if="$vuetify.breakpoint.smAndDown" v-slot:extension>
                <v-text-field
                  v-model="search"
                  :label="$t('buttons.Search')"
                  type="search"
                  single-line
                  clearable
                  hide-details
                  prepend-icon="mdi-magnify"
                  :loading="loading"
                  :disabled="loading"
                />
              </template>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-skeleton-loader
              :loading="loading"
              :type="`list-item-avatar-two-line@${itemsPerPage}`"
            >
              <v-row>
                <v-col v-if="list" cols="12" sm="12" md="12">
                  <v-list two-line>
                    <v-list-item v-for="(item, i) in props.items" :key="i">
                      <v-list-item-avatar>
                        <v-img :src="item.image" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name" />
                        <v-list-item-subtitle v-text="item.area" />
                      </v-list-item-content>
                      <v-list-item-action>
                        <template v-if="item.compatible">
                          <v-btn fab small color="primary" :to="item.redirect">
                            {{ $t('buttons.Go') }}
                          </v-btn>
                        </template>
                        <template v-else>
                          <form
                            :action="item.redirect"
                            method="post"
                            target="_blank"
                          >
                            <input
                              type="hidden"
                              name="vector_modulo"
                              :value="item.encoded"
                            />
                            <v-btn
                              fab
                              small
                              block
                              color="primary"
                              name="Btn_Ir"
                              type="submit"
                              v-text="$t('buttons.Go')"
                            />
                          </form>
                        </template>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col
                  v-for="(item, i) in props.items"
                  v-else
                  :key="i"
                  class="mt-4 mx-auto"
                  cols="12"
                  sm="6"
                  lg="3"
                >
                  <v-card>
                    <v-card-text class="px-0">
                      <v-list two-line>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-img :src="item.image" />
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title v-text="item.name" />
                            <v-list-item-subtitle v-text="item.area" />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                    <v-card-actions>
                      <template v-if="item.compatible">
                        <v-btn
                          block
                          color="primary"
                          :to="item.redirect"
                          v-text="$t('buttons.Go')"
                        >
                        </v-btn>
                      </template>
                      <template v-else>
                        <form
                          :action="item.redirect"
                          method="post"
                          target="_blank"
                        >
                          <input
                            type="hidden"
                            name="vector_modulo"
                            :value="item.encoded"
                          />
                          <v-btn
                            block
                            color="primary"
                            name="Btn_Ir"
                            type="submit"
                            v-text="$t('buttons.Go')"
                          />
                        </form>
                      </template>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-skeleton-loader>
          </template>
          <template v-slot:no-data>
            <v-card v-if="items.length === 0" flat>
              <v-card-text>
                <v-empty-state
                  icon="mdi-grid-off"
                  :label="$t('texts.EmptyModules')"
                  :description="$t('texts.EmptyModulesText')"
                />
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text>
                <v-empty-state
                  icon="mdi-text-search"
                  :label="$t('$vuetify.dataIterator.noResultsText')"
                />
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:no-results>
            <v-card flat>
              <v-card-text>
                <v-empty-state
                  icon="mdi-text-search"
                  :label="$t('$vuetify.dataIterator.noResultsText')"
                />
              </v-card-text>
            </v-card>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Module } from '@/models/services/auth/Module'

export default {
  layout: 'principal',
  auth: 'auth',
  components: {
    VEmptyState: () => import('@/components/base/EmptyState'),
  },
  data: () => ({
    loading: false,
    search: '',
    form: new Module(),
    modules: [],
    items: [],
    list: true,
    itemsPerPage: 35,
    total: 0,
    pagination: {},
  }),
  watch: {
    'pagination.page'() {
      this.getModules()
    },
    itemsPerPage() {
      this.getModules()
    },
    search(search) {
      if (!search) {
        this.modules = this.items
      }
      search = (search || '').toString().toLowerCase()
      if (search.trim() === '') {
        this.modules = this.items
      }
      this.modules = this.items.filter((item) =>
        Object.keys(item).some((key) =>
          this.defaultFilter(this.getObjectValueByPath(item, key), search, item)
        )
      )
    },
  },
  methods: {
    getModules() {
      this.loading = true
      const { page, itemsPerPage } = this.pagination
      const params = {
        page,
        per_page: itemsPerPage,
      }
      this.form
        .user({ params })
        .then((response) => {
          this.items = response.data
          this.modules = response.data
          this.total = response.meta.total
        })
        .catch((errors) => {
          this.$snackbar({
            show: true,
            message: errors.message,
          })
        })
        .finally(() => (this.loading = false))
    },
    onSubmit($ref) {
      this.$refs[$ref].submit()
    },
    defaultFilter(value, search = null, item) {
      return (
        value != null &&
        search != null &&
        typeof value !== 'boolean' &&
        value
          .toString()
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      )
    },
    getObjectValueByPath(obj, path, fallback = undefined) {
      if (obj == null || !path || typeof path !== 'string') return fallback
      if (obj[path] !== undefined) return obj[path]
      path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
      path = path.replace(/^\./, '') // strip a leading dot
      return this.getNestedValue(obj, path.split('.'), fallback)
    },
    getNestedValue(obj, path, fallback) {
      const last = path.length - 1
      if (last < 0) return obj === undefined ? fallback : obj
      for (let i = 0; i < last; i++) {
        if (obj == null) {
          return fallback
        }
        obj = obj[path[i]]
      }
      if (obj == null) return fallback
      return obj[path[last]] === undefined ? fallback : obj[path[last]]
    },
  },
}
</script>
