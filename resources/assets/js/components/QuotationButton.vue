<template>
  <v-btn v-if="block" block :disabled="activated" @click="addToQuotations">
    {{ label }}
  </v-btn>
  <v-btn v-else-if="flat" flat :color="color" :disabled="activated" @click="addToQuotations">
    {{ label }}
  </v-btn>
  <v-btn v-else :disabled="activated" @click="addToQuotations">
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'quotation-button',
  props: {
    activated: false,
    label: {
      type: String,
      required: true
    },
    flat: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      buttonLabel: this.label
    }
  },
  methods: {
    addToQuotations () {
      this.$store.dispatch('addToQuotations', this.product)
      this.$router.push({name: 'quotations'})
    },
  }
}
</script>
