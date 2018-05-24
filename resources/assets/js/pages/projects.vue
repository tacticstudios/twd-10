<template>
  <div>
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
