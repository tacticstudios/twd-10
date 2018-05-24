<template>
  <div>
      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">ITAGRIF S.A.C.</h2>
              <span class="subheading">
                Innovaciones Tecnológicas Agrícolas y Forestales 
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">home</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Nosotros</div>
                    </v-card-title>
                    <v-card-text>
                       Somos una empresa dedicada a la venta de tecnologías innovadoras, rentables y amigables
                        con el medio ambiente, para el sector agrícola y forestal. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">local_florist</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Creemos</div>
                    </v-card-title>
                    <v-card-text>
                      Apostamos por la tecnología limpia y el uso eficiente de los recursos
                       para mejorar la calidad y el rendimiento de los cultivos. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">favorite</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Calidad de Servicio</div>
                    </v-card-title>
                    <v-card-text>
                      Nuestro servicio de atención al cliente está compuesto por profesionales especializados 
                      en los productos que ofrecemos, brindando al cliente la información adecuada para que pueda
                       elegir el producto que mejores beneficios le traerá. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

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
                <!-- <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text" v-text="card.name"></span>
                    </v-flex>
                  </v-layout>
                </v-container> -->
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

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-text>
                  <img src="/public/img/bomba.png" alt=""> 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contáctanos</div>
                </v-card-title>
                <v-card-text>
                  Puedes contactarnos de muchas formas!
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Tel. (51) 44 230400</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Cel. 988695886</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Movistar 942930520</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Whatsapp #300306</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Av. Vallejo N° 303 Urb. Palermo - Trujillo, Perú</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>ventas@itagrif.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
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
  // name: 'landing-view',
  layout: 'default',
  metaInfo () {
    return { title: this.$t('home') }
  },
  mounted: function () {
    this.fetchItems()
  },
  computed: mapGetters({
    authenticated: 'authCheck',
    menus: 'menus',
    products: 'products',
    quotations: 'quotations'
  }),
  data: () => ({
    // title: window.config.appName
    title: 'ITAGRIF',
    
  }),
  methods: {
    async fetchItems() {
      if(this.menus.length == 0) {
        this.$store.dispatch('fetchMenu')
      }
    },
  }
}
</script>
