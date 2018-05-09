<template>
  <div>
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
                @click="">
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
              <v-flex
                v-for="n in 6"
                :key="n"
                xs12 sm6 md4
                class="pr-2 pb-2"
              >
                <v-card>
                  <v-card-media :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`" height="150px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                      <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="green">Cotizar</v-btn>
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
  data: () => ({
    // title: window.config.appName
  }),
  mounted: function () {
    this.fetchItems()
  },
  computed: {
    ...mapGetters({
      menus: 'menus',
      quotations: 'quotations'
    })
  },
  methods: {
    async fetchItems() {
      this.$store.dispatch('fetchMenu').then(response => {
        console.log("xd")
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>
