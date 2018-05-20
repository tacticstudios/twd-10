<template>
  <div>
     <section>
        <v-container grid-list-md mt-5>
            <h2 class="display-2">RIEGO TECNIFICADO</h2>
          <v-layout row wrap>
            <v-flex
              v-for="(card, index) in menus"
              v-bind="{ [`md${card.flex}`]: true }"
              :key="index"
            >
              <v-card>
                <v-card-media
                  :src="'storage/' + card.photos"
                  height="200px"
                >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text" v-text="card.name"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
                </v-card-media>
                <v-card-actions>
                  <v-btn flat>
                    {{ card.name }}
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn flat class="green--text">
                    Ver
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm4 md4 lg4 mt-3>
          <v-card>
            <v-toolbar color="green lighten-1" dark dense>
              <v-toolbar-title class="subheading">Categorías</v-toolbar-title>
            </v-toolbar>
            <v-list dense>
              <v-list-tile 
                v-for="item in menus"
                v-model="item.active"
                :key="item.title"
                @click="fetchProducts(item.id)">
                <v-list-tile-action>
                  <v-icon color="green">spa</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex sm8 md8 xs12>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex v-if="empty">
                <p class="display-2">Sin nada que mostrar :(</p>
              </v-flex>
              <v-flex
                xs12 sm6 md4
                class="pr-2 pb-2"
                v-for="product in products"
                :key="product.id"
              >
                <v-card>
                  <v-card-media :src="'storage/' + product.photos" height="150px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="title mb-0"> {{ product.name}} </h3>
                      <div> {{ product.description }} </div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="green" :to="'product/' + product.id">Cotizar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
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
