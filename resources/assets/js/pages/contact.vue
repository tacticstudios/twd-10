<template>
  <div>
    <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center>
            <v-flex xs12 sm12 md8>
              <v-card class="elevation-0 transparent">
                <v-card-text>
                  <div class="map-responsive">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4150.489964704793!2d-79.02032348505548!3d-8.110770383396385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad162a193e67ef%3A0x4d69896f80ba2cec!2sriegos+tecnificados+x+aspersi%C3%B3n+y+goteo!5e1!3m2!1ses-419!2spe!4v1526582347473" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md4>
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
                      <v-list-tile-title>RPM #300306</v-list-tile-title>
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
  name: 'contact-view',
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

<style>
.map-responsive{
    overflow:hidden;
    padding-bottom:56.25%;
    position:relative;
    height:0;
}
.map-responsive iframe{
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
}
</style>
