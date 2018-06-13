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
              <h2 class="headline">SERVICIOS</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-5 transparent" height="500px">
                    <v-card-media src="/public/img/serv1.jpg" height="250px">
                    </v-card-media>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Asesora en diseño <br> de proyectos</div>
                    </v-card-title>
                    <v-card-text>
                       Diseño, ejecución y mantenimiento de proyectos de riego tecnificado; por goteo, aspersión, microaspersión; para agricultura, áreas verdes y minería.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-5 transparent" height="500px">
                    <v-card-media src="/public/img/serv2.jpg" height="250px">
                    </v-card-media>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Asistencia tecnica</div>
                    </v-card-title>
                    <v-card-text>
                      Impermeabilización de reservorios y otras superficies, con geomembranas de PVC y HDPE, contamos con equipos de termofusión para pegado y reparación de geomembranas.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-5 transparent" height="500px">
                    <v-card-media src="/public/img/serv3.jpg" height="250px">
                    </v-card-media>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Capacitacion de personal</div>
                    </v-card-title>
                    <v-card-text>
                      Reparación y ensamblaje de motofumigadoras, motobombas y otros equipos para la agricultura. 
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
  name: 'services-view',
  layout: 'default',
  metaInfo () {
    return { title: this.$t('services') }
  }
}
</script>
