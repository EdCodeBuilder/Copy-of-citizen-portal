<template>
  <v-row justify="center" align-content="center" class="mx-2">
    <v-col cols="12" md="8" sm="8" class="mx-auto">
      <v-card>
        <v-card-text>
          <v-row class="mx-md-2">
            <v-col cols="12" class="py-0 my-0">
              <info-content
                info-horizontal
                icon="mdi-information-outline"
                icon-color="success"
                subtitle="¿Qué desea hacer?"
                class="mb-0"
              >
                <v-container fluid>
                  <v-row dense>
                    <v-col
                      v-for="card in cards"
                      :key="card.title"
                      :cols="$vuetify.breakpoint.smAndDown ? 12 : card.flex"
                    >
                      <v-card>
                        <v-img
                          :src="card.src"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="200px"
                        >
                          <v-card-title
                            class="display-serif-2"
                            v-text="card.title"
                          >
                          </v-card-title>
                        </v-img>

                        <v-card-actions>
                          <v-btn
                            block
                            color="primary"
                            :to="card.to ? localePath(card.to) : undefined"
                            :href="card.href"
                            :target="card.href ? '_blank' : undefined"
                          >
                            Ir
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </info-content>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Certificates',
  nuxtI18n: {
    paths: {
      en: '/certificates',
      es: '/certificados',
    },
  },
  layout: 'password',
  components: {
    InfoContent: () => import('~/components/base/InfoContent'),
  },
  auth: false,
  data: () => ({
    cards: [
      {
        title: 'Certificado Laboral',
        src:
          'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1089&q=80',
        flex: 12,
        href: 'https://www.idrd.gov.co/SIM/CertificacionContratos/generador',
      },
      {
        title: 'Paz y Salvo Sistemas',
        src:
          'https://images.unsplash.com/photo-1560264280-88b68371db39?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        flex: 6,
        to: { name: 'peaceandsave' },
      },
      {
        title: 'Paz y Salvo Almacen',
        src:
          'https://images.unsplash.com/photo-1553413077-190dd305871c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        flex: 6,
        to: { name: 'peaceandsave' },
      },
    ],
  }),
}
</script>
