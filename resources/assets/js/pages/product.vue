<template>
  <div>
    <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center>
            <v-flex xs12 sm12 md8>
              <v-card class="elevation-0 transparent" hover>
                <v-card-title primary-title class="layout justify-center">
                  <h3 class="display-2">{{ product.name }}</h3>
                </v-card-title>
                <!-- <v-card-text>
                  <img src="/storage/" />
                </v-card-text> -->
                <v-card-media
                  :src="'/storage/' + product.photos"
                  height="500px"
                >
                </v-card-media>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md4 mt-5>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Detalle</div>
                </v-card-title>
                <v-card-text>
                    {{ product.description }}
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
  layout: 'default',
  metaInfo () {
    return { title: this.$t('projects') }
  },
  mounted: function () {
    this.fetchData()
  },
  computed: {
    ...mapGetters({
      product: 'product',
    })
  },
  watch: {
    '$route' (to, from) {
      this.fetchProducts()
    }
  },
  methods: {
    async fetchData() {
      this.$store.dispatch('fetchProduct', this.$route.params.product_id)
    },
  }
}
</script>
