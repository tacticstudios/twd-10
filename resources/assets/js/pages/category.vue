<template>
  <div>
     <section>
       <v-container grid-list-md mt-2>
          <v-layout row wrap justify-center my-2>
            <v-btn color="success"
              v-if="card.parent_id == 0"
              v-for="(card, index) in menus"
              :key="index"
              :to="'/category/' + card.id">
              {{ card.name }}
            </v-btn>
          </v-layout>
        </v-container>
        <v-container grid-list-md mt-5>
          <v-layout row mb-4>
            <h2 class="display-1">{{ category_name }}</h2>
          </v-layout>
          <v-layout row wrap>
            <v-flex
              v-if="card.parent_id == $route.params.category_id"
              v-for="(card, index) in menus"
              v-bind="{ [`md${card.flex}`]: true }"
              :key="index"
            >
              <v-card>
                
                <v-card-media
                  :src="'/storage/' + card.photos"
                  height="200px"
                >
                </v-card-media>
                <v-card-actions>
                  <v-btn flat large :to="'/category/' + card.id">
                    {{ card.name }}
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn flat class="green--text" :to="'/category/' + card.id">
                    Ver
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex sm8 md8 xs12>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex
                    xs12 sm6 md6
                    class="pr-2 pb-2"
                    v-for="product in products"
                    :key="product.id"
                  >
                    <v-card>
                      <v-card-media :src="'/storage/' + product.photos" height="250px">
                      </v-card-media>
                      <v-card-title primary-title>
                        <div>
                          <h3 class="title mb-0"> {{ product.name}} </h3>
                          <div> {{ product.description }} </div>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn flat color="green" :to="'/category/'+ $route.params.category_id+ '/product/' + product.id">Cotizar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>

          </v-layout>
        </v-container>

        <v-container grid-list-md mt-2 mb-5>
          <v-layout row wrap justify-center my-2>
            <v-btn color="success"
              v-if="card.parent_id == 0"
              v-for="(card, index) in menus"
              :key="index"
              :to="'/category/' + card.id">
              {{ card.name }}
            </v-btn>
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
    return { title: this.$t('catalogue') }
  },
  mounted: function () {
    this.fetchItems()
    this.fetchProducts()
  },
  data () {
    return {
      empty: false
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchProducts()
    }
  },
  computed: {
    ...mapGetters({
      menus: 'menus',
      products: 'products',
      quotations: 'quotations'
    }),
    category_name: function(){
      let id = this.$route.params.category_id

      if(this.menus.length == 0 ) return "Cargando..." 
      
      let found = this.menus.find(function(element) {
        return element.id == id
      });
      return found.name
    }
  },
  methods: {
    async fetchItems() {
      if(this.menus.length == 0) {
        this.$store.dispatch('fetchMenu')
      }
    },
    async fetchProducts() {
      await this.$store.dispatch('fetchProducts', this.$route.params.category_id).then(response => {
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
