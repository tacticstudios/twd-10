<template>
  <div>
     <section>
      <v-container grid-list-md my-4>
          <h3 class="display-3" v-if="!noDiscounts">Productos en Oferta o Descuento!</h3>
          <v-alert :value="noDiscounts" outline color="info" icon="info">
            Por ahora no contamos con ninguna oferta o descuento :(
          </v-alert>
          <v-alert :value="!noDiscounts" outline color="success" icon="info">
            Aprovecha nuestros productos en oferta!!
          </v-alert>
        <v-layout row wrap>
          <v-flex
            v-for="(card, index) in cards"
            :key="index"
            xs4
          >
            <v-card hover :to="'/category/'+ card.category_id + '/product/' + card.id">
              <v-card-media
                :src="'/public/storage/' + card.photos"
                height="400px"
              >
              </v-card-media>
              <v-card-actions>
                <v-btn flat>
                  {{ card.name }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn flat class="green--text" :to="'/category/'+ card.category_id + '/product/' + card.id">
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
  name: 'discounts-view',
  layout: 'default',
  metaInfo () {
    return { title: 'Ofertas' }
  },
  computed: {
    ...mapGetters({
      data: 'data',
    }),
    cards: function () {
      const _data = this.data
      let products = []
      for(let i = 0; i < _data.length; i++) {
        for(let j = 0; j < _data[i].products.length; j++) {
          if(_data[i].products[j].has_discount === 1 || _data[i].products[j].has_discount === "1" || _data[i].products[j].has_discount === true) {
            products.push(_data[i].products[j])
          }
        }
      }
      console.log(products)
      return products
    },
    noDiscounts: function () {
      return this.cards.length == 0
    }
  },
}
</script>
