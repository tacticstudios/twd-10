<template>
  <div>
    <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center>
            <v-flex xs12 sm12 md8>
              <v-card class="elevation-0 transparent">
                <v-card-text>
                  <div class="map-responsive">
                    {{ $route.params.id }}
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Detalle</div>
                </v-card-title>
                <v-card-text>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quae sapiente magni quibusdam labore enim provident aut odio autem delectus ullam, voluptas asperiores, natus aliquid modi illo. Laborum, debitis quaerat!
                    <v-spacer></v-spacer>
                    <v-btn dark color="green">
                      Cotizar
                    </v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'product-view',
  layout: 'default',
  metaInfo () {
    return { title: this.$t('projects') }
  },
  computed: mapGetters({
    authenticated: 'authCheck'
  }),
  data: () => ({
    // title: window.config.appName
    title: 'ITAGRIF',
  }),
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      console.log("fetching")
      
    }
  }
}
</script>
