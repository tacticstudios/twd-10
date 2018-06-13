<template>
  <div>
    <v-toolbar dense prominent app fixed>
      <v-toolbar-title>
        <a href="/landing">
          <img src="/public/img/logotipo_o.png" alt="ITAGRIF" height="24">
          <span class="green--text">ITAGRIF </span>
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/quotations">
        <v-btn flat>
          <v-badge color="green">
            <span>Cotizaciones</span>
            <span slot="badge" v-if="quotations > 0">{{ quotations }}</span>
          </v-badge>
        </v-btn>
      </router-link>
      <v-btn icon :to="'/login'">
        <v-icon class="green--text">perm_identity</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content v-if="['landing'].indexOf($route.name) > -1 && windowWidth <= 600">
      <section>
          <v-layout column >
              <v-flex xs12 sm6 offset-sm3>
                <v-card>
                  <v-container fluid grid-list-md>
                    <v-layout row wrap>
                      <v-flex
                        v-for="card in cards"
                        v-bind="{ [`xs${card.flex}`]: true }"
                        :key="card.title"
                      >
                        <v-card hover :to="card.to">
                          <v-card-media
                            :src="card.src"
                            height="150px"
                          >
                          </v-card-media>
                          <v-card-actions>
                            {{ card.title }}
                          </v-card-actions>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
      </section>
    </v-content>
    

    <v-content>
      <section v-if="['landing'].indexOf($route.name) > -1 && windowWidth > 600">
        <v-carousel delimiter-icon="stop" dark>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            transition="fade"
            reverse-transition="fade"
          >
          <v-jumbotron dark>
            <v-container fill-height>
              <v-layout align-center>
                <div class="parent">
                  <div class="child">
                    <h3 class="display-3">{{ item.title }}</h3>
                    <h3 class="heading" style="font-weight: bold;">{{ item.text }}</h3>
                  </div>
                </div>
              </v-layout>
            </v-container>
          </v-jumbotron>
          </v-carousel-item>
        </v-carousel>
      </section>


    <section v-if="['landing'].indexOf($route.name) <= -1">
      <v-parallax src="/public/img/fondo2.jpg" height="230">
        <v-layout
          column
          align-center
          justify-center
          class="black--text"
        >
        <img src="/public/img/logo_o.png" alt="itagrif" height="200">
        </v-layout>
      </v-parallax>
    </section>

    <section v-if="windowWidth > 600">
      <v-toolbar prominent dark color="light-green accent-4">
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/about" class="title">Empresa</v-btn>
          <v-btn flat to="/categories" class="title">Productos</v-btn>
          <v-btn flat to="/services" class="title">Servicios</v-btn>
          <v-btn flat to="/cataclogue" class="title">Ofertas</v-btn>
          <v-btn flat to="/contact" class="title">Contactos</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </section>

      <router-view></router-view>

      <v-footer class="blue darken-2" :app="$route.path!=='/' && $route.path!=='/landing'">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text" href="https://tactic.pe" target="_blank">Tactic Studios</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'welcome-view',
  layout: 'default',

  metaInfo () {
    return { title: this.$t('home') }
  },
  computed: {
    ...mapGetters({
      quotations: 'quotations'
    }),
  },
  watch: {
    windowWidth(newHeight, oldHeight) {
     this.txt = 'it changed from ' + newHeight + ' / ' + oldHeight;
    }
  },
  mounted() {
    let that = this;
    this.$nextTick(function() {
      window.addEventListener('resize', function(e) {
        that.windowWidth=  window.innerWidth
      });
    })
    this.fetchData()
  },
  data: () => ({
    // title: window.config.appName
    title: 'ITAGRIF',
    windowWidth: window.innerWidth,
    txt: '',
    items: [
          {
            title: 'Bienvenido a ITAGRIF',
            text: 'Innovaciones Tecnológicas Agrícolas y Forestales',
            src: '/public/img/port2.jpg'
          },
          {
            title: 'Bandejas de Germinación',
            text: '',
            src: '/public/img/port1.jpg'
          },
          {
            title: 'EQUIP. DE FUMIGACIÓN',
            text: '',
            src: '/public/img/port3.jpg'
          },
          {
            title: 'VIVEROS E INVERNADEROS',
            text: '',
            src: '/public/img/port4.jpg'
          },
        ],
        cards: [
        { title: 'Empresa', src: '/public/img/nosotros.jpg', flex: 12, to: '/about' },
        { title: 'Productos', src: '/public/img/productos.jpg', flex: 6, to: '/categories' },
        { title: 'Servicios', src: '/public/img/servicios.jpg', flex: 6, to: '/services' },
        { title: 'Contactos', src: '/public/img/contacto.png', flex: 12, to: '/contact' }
      ]
  }),
  methods: {
    async fetchData() {
      //console.log(this.data.length)
      //if(this.data.length == 0) {
        this.$store.dispatch('fetchData')
      //}
    }
  }
}
</script>

<style lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
  .parent
    background-color rgba(94,94,94,0.7)
    border-radius 0.7

</style>
