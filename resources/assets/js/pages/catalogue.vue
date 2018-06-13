<template>
  <div>
     <section>
      <v-container grid-list-md>
          <h2>Nuestras Categorías</h2>
        <v-layout row wrap>
          <v-flex
            v-for="(card, index) in menus"
            v-bind="{ [`md${card.flex}`]: true }"
            :key="index"
            v-if="card.parent_id == 0"
          >
            <v-card>
              <v-card-media
                :src="'/public/storage/' + card.photos"
                height="200px"
              >
              </v-card-media>
              <v-card-actions>
                <v-btn flat :to="'/category/' + card.id">
                  {{ card.name }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn flat class="green--text" :to="'/category/' + card.id">
                  Ver
                </v-btn>
              </v-card-actions>
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
  name: 'catalogue-view',
  layout: 'default',
  metaInfo () {
    return { title: this.$t('catalogue') }
  },
  computed: mapGetters({
    authenticated: 'authCheck'
  }),
  mounted: function () {
    this.fetchItems()
  },
  data () {
    return {
      empty: false
    }
  },
  computed: {
    ...mapGetters({
      menus: 'menus',
      products: 'products',
      quotations: 'quotations'
    })
  },
  methods: {
    async fetchItems() {
      if(this.menus.length == 0) {
        this.$store.dispatch('fetchMenu').then(response => {
          if(this.menus.length > 0) {
            this.fetchProducts(this.menus[0].id)
          }
        }, error => {
          console.log(error)
        })
      }
    },
    async fetchProducts(id) {
      await this.$store.dispatch('fetchProducts', id).then(response => {
        if(this.products.length <= 0) {
          this.empty = true
        } else {
          this.empty = false
        }
      }, error => {
        console.log(error)
      })

    },
  }
}
</script>
