<template>
  <div>
    <section> 
     <v-container>
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
     </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'about-view',
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
