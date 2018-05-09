<template>
  <div>
    PRYECTOSSS
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
