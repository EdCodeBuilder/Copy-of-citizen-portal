<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col class="mt-8" cols="12" sm="12" md="4">
        <base-material-card
          class="v-card-profile"
          :ident-icon="profile.username"
        >
          <v-card-text class="text-center">
            <h4 class="display-serif-2 font-weight-bold">{{ shortName }}</h4>

            <h6 class="subtitle-1 mb-1 grey--text mb-3">
              {{ profile.description }}
            </h6>

            <p class="font-weight-light grey--text">
              {{ `${profile.dependency} - ${profile.company}` }}
            </p>

            <p class="font-weight-light grey--text">
              {{ profile.document }}
            </p>

            <v-btn
              text
              color="primary"
              small
              block
              :href="`mailto:${profile.email}`"
            >
              <v-icon left small>mdi-email</v-icon>
              {{ profile.email }}
            </v-btn>
            <p class="body-1">
              <v-icon left small>mdi-phone</v-icon>
              {{
                `${profile.phone} ${profile.ext ? 'ext. ' + profile.ext : ''}`
              }}
            </p>
            <p class="body-1">
              <v-icon left small>mdi-calendar</v-icon>
              {{ expiresAt }}
            </p>
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col class="mt-8" cols="12" sm="12" md="8">
        <base-material-card icon="mdi-account-outline">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Edit Profile
              <span class="body-1">— Complete your profile</span>
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field label="Company (disabled)" disabled />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="User Name" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Email Address" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="First Name" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Last Name" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Adress" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="City" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Country" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0">Update Profile</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '~/components/base/MaterialCard'
export default {
  name: 'Profile',
  components: {
    BaseMaterialCard: MaterialCard,
  },
  computed: {
    shortName() {
      return `${(this.$auth.user.name || '').split(' ').shift()} ${(
        this.$auth.user.surname || ''
      )
        .split(' ')
        .shift()}`
    },
    profile() {
      return this.$auth.user
    },
    expiresAt() {
      return this.$moment(this.profile.expires_at).isValid()
        ? this.$moment(this.profile.expires_at).toNow()
        : ''
    },
  },
}
</script>
