<template>
  <div>
    <section>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-toolbar dense color="green" dark>
                <v-toolbar-title>Quiero una cotización</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list two-line>
                <template >
                  <v-subheader>De los siguientes productos:</v-subheader>
                  <v-divider></v-divider>
                  <v-list-tile v-for="(item, index) in quotation_list" :key="index" avatar @click="">
                    <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-btn
                        small
                        absolute
                        dark
                        fab
                        top
                        right
                        color="pink"
                        @click="removeFromQuotations(item)"
                      >
                        <v-icon>remove</v-icon>
                      </v-btn>
                      <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                      <v-list-tile-sub-title>
                        {{ item.description }}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                    
                    <!-- <v-list-tile-action>
                      <v-text-field
                        full-width
                        label="Cant."
                        value="1"
                        type="number"
                      ></v-text-field>
                    </v-list-tile-action> -->
                    
                  </v-list-tile>
                  <v-divider inset></v-divider>
                  <v-list-tile to="/catalogue">
                    <v-list-tile-content>
                      <v-list-tile-title><v-icon>add</v-icon> {{ addProductLabel }}</v-list-tile-title>
                      <v-list-tile-sub-title>Volver al catálogo</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>

              <v-container>
                <v-layout row>
                  <v-flex>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Mi nombre"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Mi Correo"
                        required
                      ></v-text-field>
                      <v-btn
                        :loading="loading"
                        :disabled="!valid"
                        @click="submit"
                      >
                        Enviar
                      </v-btn>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-container>
              
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
  layout: 'default',
  metaInfo () {
    return { title: this.$t('projects') }
  },
  mounted: function () {
    this.fetchData()
  },
  data () {
    return {
      loading: false,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 80 || 'Solo son permitidos hasta 80 caracteres.'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Tu correo es obligatorio',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'No es un correo válido'
      ],
      items: [
          { header: 'De los siguientes productos:' },
          { avatar: '/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
          { divider: true, inset: true },
          { avatar: '/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
          { divider: true, inset: true },
          { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" }
        ]
    }
  },
  computed: {
    ...mapGetters({
      quotation_list: 'quotation_list',
    }),
    addProductLabel: function () {
      return this.quotation_list.length == 0 ? 'Agregar un Producto' : 'Agregar otro Producto'
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchProducts()
    }
  },
  methods: {
    submit () {
        if (this.$refs.form.validate()) {
          this.loading = true
          this.$store.dispatch('sendQuotationRequest', {
            name: this.name,
            email: this.email,
            quotation_list: this.quotation_list
          }).then(response => {
            this.loading = false
            name = ''
            email = ''
          }, error => {
            this.loading = false
          })
        }
      },
    async fetchData() {
      this.$store.dispatch('fetchProduct', this.$route.params.product_id)
    },
    removeFromQuotations (product) {
      this.$store.dispatch('removeFromQuotations', product)
    }
  }
}
</script>
