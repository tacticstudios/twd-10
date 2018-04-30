<template>
  <v-card>
    <v-card-title primary-title class="grey lighten-4">
      <v-layout row wrap>
        <v-flex xs12>
          <h3 class="headline mb-0">{{ $t('categories') }}</h3>
        </v-flex>
        <v-flex xs12 class="text-xs-right">
          <v-btn small fab dark color="primary" @click.stop="dialog = true">
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" scrollable max-width="500">
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t('create') + " " + $t('categories') }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field label="Nombre" v-model="category.name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Descripción" v-model="category.description" hint="Una pequeña descripción de la categoría"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                <v-btn color="primary"  @click.native="dialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        v-model="selected"
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
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
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
  name: 'categories-view',
  metaInfo () {
    return { title: this.$t('categories') }
  },
  data () {
    return {
      selected: [],
      dialog: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description', sortable: false},
        { text: 'Actions', value: 'name', sortable: false }
      ],
      items: [
        {
          value: false,
          id: 1,
          name: 'Frozen Yogurt',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo natus perferendis eveniet in dignissimos!'
        },
        {
          value: false,
          id: 2,
          name: 'Hot Yogurt',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo natus perferendis eveniet in dignissimos! '
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      category: 'categories/category',
      categories: 'categories/categories'
    })
  },
  methods: {
    editItem: function(item) {
      this.$store.dispatch('categories/setCategory', item)
      this.dialog = true
    }
  }
}
</script>
