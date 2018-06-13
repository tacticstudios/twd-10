<template>
  <v-card>
    <v-card-title primary-title class="grey lighten-4">
      <v-layout row wrap>
        <v-flex xs12>
          <h3 class="headline mb-0">{{ $t('products') }}</h3>
        </v-flex>
        <v-flex xs12 class="text-xs-right">
          <v-btn small fab dark color="primary" @click.stop="createItem()">
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-btn small fab dark color="pink" @click.stop="deleteSelected()">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-dialog v-model="dialog"  max-width="600">
            <v-card>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-title>
                  <span class="headline">{{ $t('create') + " " + $t('products') }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          v-model="product.name"
                          :rules="nameRules"
                          :label="$t('name')"
                          counter="50"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="product.description"
                          :label="$t('description')"
                          counter="200"
                          hint="Una pequeña descripción de la categoría"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="product.amount"
                          :label="$t('amount')"
                          suffix="soles"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
                          v-model="product.category_id"
                          :items="categories"
                          item-value="id"
                          item-text="name"
                          :label="$t('category')"
                          single-line
                        ></v-select>
                      </v-flex>
                      <v-flex>
                        <v-checkbox
                          v-model="product.has_discount"
                          label="En Oferta"
                          :value="product.has_discount"
                          type="checkbox"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xs12>
                        <img :src="imageUrl" height="150" v-if="imageUrl"/>
                        <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                        <input
                          type="file"
                          style="display: none"
                          ref="image"
                          accept="image/*"
                          @change="onFilePicked"
                        >
                      </v-flex>
                      
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="default" flat @click.native="closeDialog()">{{ $t('close') }}</v-btn>
                  <v-btn color="blue darken-1" flat :disabled="!valid" @click.native="saveItem">{{ $t('save') }}</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="products"
        v-model="selected"
        :loading="busy"
        item-key="id"
        select-all
        :rows-per-page-items="[10,20,50]"
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox
              primary
              hide-details
              v-model="props.selected"
            ></v-checkbox>
          </td>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.amount }}</td>
          <td>{{ props.item.has_discount == 1 ? 'SI' : 'NO' }}</td>
          <td>{{ props.item.category !== null ? props.item.category.name : 'N.A'}}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item.id)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'products-view',
  metaInfo () {
    return { title: this.$t('products') }
  },
  data () {
    return {
      nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],
      busy: false,
      selected: [],
      dialog: false,
      headers: [
        { text: 'Código', value: 'id'},
        { text: 'Nombre', value: 'name' },
        { text: 'Descripción', value: 'description', sortable: false},
        { text: 'Precio', value: 'amount'},
        { text: 'En Oferta', value: 'has_discount'},
        { text: 'Categoría', value: 'category'},
        { text: 'Acciones', value: 'actions', sortable: false, width: 20 }
      ],
      valid: true,
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }
  },
  mounted: function () {
    this.fetchItems()
  },
  computed: {
    ...mapGetters({
      product: 'products/product',
      products: 'products/products',
      categories: 'categories/categories',
      photo: 'products/photo'
    })
  },
  methods: {
    async saveItem () {
      if (this.$refs.form.validate()) {
        this.valid = false
        let isUpdate = this.product.id !== undefined
        let action = isUpdate ? 'products/updateProduct' : 'products/saveProduct'
        this.$store.dispatch(action, { product: this.product, photo: this.photo }).then(response => {
          this.closeDialog()
          // this.clearForm()
          this.valid = true
        }, error => {
          console.error("Got nothing from server. Prompt user to check internet connection and try again")
          this.valid = true
        })
      }
    },
    async deleteItem (id) {
      this.busy = true
      this.$store.dispatch('products/deleteProduct', id).then(response => {
        this.$store.dispatch('responseMessage', {
          type: 'success',
          text: this.$t('product_deleted')
        })
        this.busy = false
      }, error => {
        console.error("Got nothing from server. Prompt user to check internet connection and try again")
        this.busy = false
      })
    },
    async deleteSelected () {
      this.busy = true
      this.$store.dispatch('products/deleteProducts', this.selected).then(response => {
        this.busy = false
        this.$store.dispatch('responseMessage', {
          type: 'success',
          text: this.$t('product_deleted')
        })
      }, error => {
        this.busy = false
      })
    },
    async fetchCategories () {
      if(this.categories.length == 0) {
        this.$store.dispatch('categories/fetchCategories')
      }
    },
    closeDialog: function() {
      this.imageName = ''
      this.imageFile = ''
      this.imageUrl = ''
      this.dialog = false
    },
    clearForm: function() {
      this.$refs.form.reset()
    },
    fetchItems: function() {
      this.busy = true
      this.$store.dispatch('products/fetchProducts').then(response => {
        this.busy = false
      }, error => {
        this.busy = false
      })
    },
    createItem: function() {
      this.fetchCategories()
      this.$store.dispatch('products/clearProduct')
      this.dialog = true
    },
    editItem: function(item) {
      this.fetchCategories()
      this.$store.dispatch('products/setProduct', item)
      this.dialog = true
    },
    clearItem: function(item) {
      this.$store.dispatch('products/clearProduct')
    },
    pickFile () {
      this.$refs.image.click ()
    },
    onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
          this.$store.dispatch('products/setPhoto', this.imageFile)
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
        this.imageUrl = ''
        this.$store.dispatch('products/setPhoto', this.imageFile)
      }
		}
  }
}
</script>
