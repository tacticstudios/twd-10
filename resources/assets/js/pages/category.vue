<template>
  <div>
     <section class="my-5">
      <v-container v-if="!isShowingRoots" grid-list-md>
        <h3 class="display-1">Categorías Principales</h3>
        <v-layout row wrap my-2>
          <v-btn flat
            v-if="card.parent_id == 0"
            v-for="(card, index) in data"
            :key="index"
            :to="'/category/' + card.id">
            {{ card.name }}
          </v-btn>
        </v-layout>
      </v-container>
      <v-container grid-list-md>
        <v-layout row mb-4>
          <h3 class="display-3">{{ category_name }}</h3>
        </v-layout>
        <v-layout row wrap>
          <v-flex
            v-if="isShowingProducts == false"
            v-for="(card, index) in cards"
            v-bind="{ [`md${card.flex}`]: true }"
            :key="index"
          >
            <v-card hover :to="'/category/' + card.id">
              <v-card-media
                :src="'/public/storage/' + card.photos"
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
          <v-flex v-if="isShowingProducts">
            <v-container fluid>
              <v-layout row wrap>
                <v-flex
                  xs12 sm4 md4
                  class="pr-2 pb-2"
                  v-for="product in cards"
                  :key="product.id"
                >
                  <v-card hover :to="'/category/'+ $route.params.category_id+ '/product/' + product.id">
                    <v-card-media :src="'/public/storage/' + product.photos" height="250px">
                    </v-card-media>
                    <v-card-title primary-title>
                      <div>
                        <h3 class="title mb-0"> {{ product.name}} </h3>
                        <p> {{ product.description }} </p>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <quotation-button :label="'Cotizar'" :flat="true" :product="product"></quotation-button>
                      <v-btn dark color="green" :to="'/category/'+ $route.params.category_id+ '/product/' + product.id">Ver Detalle</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
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
    return { title: this.$t('catalogue') }
  },
  data () {
    return {
      empty: false
    }
  },
  watch: {
    '$route' (to, from) {
      //
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      quotations: 'quotations'
    }),
    category_name: function(){
      let id = this.$route.params.category_id

      if (id == null) {
        return "Categorias Principales"
      }

      if(this.data.length == 0 ) return "Cargando..." 
      
      let found = this.data.find(function(element) {
        return element.id == id
      });
      return found.name
    },
    isShowingRoots: function(){
      return this.$route.params.category_id == null
    },
    cards: function () {
      let id = this.$route.params.category_id

      // if no param
      if (id == null) {
        return this.data.filter( element => element.parent_id == 0)
      }
        
      // if category has products
      let found = this.data.find( element => element.id == id)

      if (found.products.length > 0) {
        return found.products
      } else {
        return this.data.filter( element => element.parent_id == id)
      }
    },
    isShowingProducts: function() {
      let id = this.$route.params.category_id
      if(id != null) {
        let found = this.data.find( element => element.id == id)
        return found.products.length > 0
      } else {
        return false
      }
    }
  }
}
</script>
