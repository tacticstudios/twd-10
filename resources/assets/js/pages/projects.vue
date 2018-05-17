<template>
  <div>
    <section>
      <v-parallax  src="img/fondo2.jpg" height="230">
        <v-layout
          column
          align-center
          justify-center
          class="black--text"
        >
        <img src="img/logo_o.png" alt="itagrif" height="200">
        </v-layout>
      </v-parallax>
    </section>
    <section> 
     <v-container>
       <h2>Proyectos</h2>
     </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'projects-view',
  layout: 'default',
  metaInfo () {
    return { title: this.$t('projects') }
  },
  computed: mapGetters({
    authenticated: 'authCheck'
  }),
  data: () => ({
    // title: window.config.appName
    title: 'ITAGRIF'
  })
}
</script>
