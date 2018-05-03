<template>
  <v-card>
    <v-card-title primary-title class="grey lighten-4">
      <v-layout row wrap>
        <v-flex xs12>
          <h3 class="headline mb-0">{{ $t('categories') }}</h3>
        </v-flex>
        <v-flex xs12 class="text-xs-right">
          <v-btn small fab dark color="primary" @click.stop="createItem()">
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-btn small fab dark color="pink" @click.stop="createItem()">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" scrollable max-width="500">
            <v-card>
              <form @submit.prevent="saveItem" @keydown="form.onKeydown($event)">
                <v-card-title>
                  <span class="headline">{{ $t('create') + " " + $t('categories') }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Nombre" 
                        v-model="category.name"
                        :v-errors="errors" 
                        :value.sync="form.name"
                        v-validate="'required|max:50'"
                        required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Descripción"
                        v-model="category.description"
                        :v-errors="errors"
                        :value.sync="form.description"
                        v-validate="'max:200'"
                        hint="Una pequeña descripción de la categoría"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                  <submit-button :form="form" :flat="true" :label="$t('save')"></submit-button>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="categories"
        v-model="selected"
        :loading="busy"
        item-key="id"
        select-all
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
import Form from 'vform'
import { mapGetters } from 'vuex'

export default {
  name: 'categories-view',
  metaInfo () {
    return { title: this.$t('categories') }
  },
  data () {
    return {
      form: new Form({
        name: '',
        description: ''
      }),
      busy: false,
      selected: [],
      dialog: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description', sortable: false},
        { text: 'Actions', value: 'name', sortable: false }
      ],
    }
  },
  mounted: function () {
    this.fetchItems()
  },
  computed: {
    ...mapGetters({
      category: 'categories/category',
      categories: 'categories/categories'
    })
  },
  methods: {
    async saveItem () {
      if (await this.formHasErrors()) return
      
      this.$store.dispatch('categories/saveCategory', this.category).then(response => {
        console.log("correcto")
        this.dialog = false
      }, error => {
        console.error("Got nothing from server. Prompt user to check internet connection and try again")
      })

      this.$store.dispatch('responseMessage', {
        type: 'success',
        text: this.$t('category_created')
      })
    },
    async deleteItem (id) {
      this.$store.dispatch('categories/deleteCategory', id).then(response => {
        console.log("correcto")
      }, error => {
        console.error("Got nothing from server. Prompt user to check internet connection and try again")
      })

      this.$store.dispatch('responseMessage', {
        type: 'success',
        text: this.$t('category_deleted')
      })
    },
    fetchItems: function() {
      this.busy = true
      this.$store.dispatch('categories/fetchCategories').then(response => {
        this.busy = false
      }, error => {
        this.busy = false
      })
    },
    createItem: function() {
      this.$store.dispatch('categories/clearCategory')
      this.dialog = true
    },
    editItem: function(item) {
      this.$store.dispatch('categories/setCategory', item)
      this.dialog = true
    },
    clearItem: function(item) {
      this.$store.dispatch('categories/clearCategory')
    }
  }
}
</script>
