<template>
  <div>
    <v-toolbar dense prominent>
      <v-toolbar-side-icon class="green--text"></v-toolbar-side-icon>
      <v-toolbar-title>
        <a href="landing">
          <img src="img/logotipo_o.png" alt="ITAGRIF" height="24">
          <span class="green--text">ITAGRIF</span>
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/catalogue"><v-btn flat>Catálogo</v-btn></router-link>
      <router-link to="/projects"><v-btn flat>Proyectos</v-btn></router-link>
      <router-link to="/projects">
        <v-btn flat>
          <v-badge color="green">
            <span>Cotizaciones</span>
            <span slot="badge" v-if="quotations > 0">{{ quotations }}</span>
          </v-badge>
        </v-btn>
      </router-link>
      <v-btn flat>Pagos</v-btn>
      <v-btn icon :to="'login'">
        <v-icon class="green--text">perm_identity</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      
      <router-view></router-view>

      <v-footer class="blue darken-2" :app="$route.path!=='/' && $route.path!=='/landing'">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text" href="https://tactic.pe" target="_blank">Tactic Studios</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'welcome-view',
  layout: 'default',

  metaInfo () {
    return { title: this.$t('home') }
  },

  computed: mapGetters({
    authenticated: 'authCheck',
    quotations: 'quotations'
  }),

  data: () => ({
    // title: window.config.appName
    title: 'ITAGRIF'
  })
}
</script>
