<template>
  <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="toggleDrawer" v-if="authenticated"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Panel de Control</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      label="Search"
      class="hidden-sm-and-down"
      v-if="authenticated"
    ></v-text-field>
    <v-spacer></v-spacer>
    <!-- Authenticated -->
    <template v-if="authenticated">
      <progress-bar :show="busy"></progress-bar>
      <v-btn flat :to="{ name: 'settings.profile' }">{{ user.name }}</v-btn>
      <v-btn flat @click.prevent="logout">{{ $t('logout') }}</v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </template>
    <!-- Guest -->
    <template v-else>
      <v-btn flat :to="{ name: 'login' }">{{ $t('login') }}</v-btn>
      <v-btn flat :to="{ name: 'register' }">{{ $t('register') }}</v-btn>
    </template>
    <v-btn icon large>
      <v-avatar size="32px" tile>
        <img
          src="https://vuetifyjs.com/static/doc-images/logo.svg"
          alt="Vuetify"
        >
      </v-avatar>
    </v-btn>
  </v-toolbar>
  <!-- <v-toolbar fixed app dark color="primary">
    <v-toolbar-side-icon @click.stop="toggleDrawer" v-if="authenticated"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link :to="{ name: 'welcome' }" class="white--text">
        {{ appName }}
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <template v-if="authenticated">
      <progress-bar :show="busy"></progress-bar>
      <v-btn flat :to="{ name: 'settings.profile' }">{{ user.name }}</v-btn>
      <v-btn flat @click.prevent="logout">{{ $t('logout') }}</v-btn>
    </template>

    <template v-else>
      <v-btn flat :to="{ name: 'login' }">{{ $t('login') }}</v-btn>
      <v-btn flat :to="{ name: 'register' }">{{ $t('register') }}</v-btn>
    </template>
  </v-toolbar> -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    appName: window.config.appName,
    busy: false
  }),

  computed: mapGetters({
    user: 'authUser',
    authenticated: 'authCheck'
  }),

  methods: {
    toggleDrawer () {
      this.$emit('toggleDrawer')
    },
    async logout () {
      this.busy = true

      if (this.drawer) {
        this.toggleDrawer()
      }

      // Log out the user.
      await this.$store.dispatch('logout')
      this.busy = false

      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="stylus" scoped>

.toolbar__title .router-link-active
  text-decoration: none

</style>
