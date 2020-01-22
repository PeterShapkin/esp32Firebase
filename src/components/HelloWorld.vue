<template>
  <div class="view">
    {{view}}
  </div>
</template>

<script>
import { getSomething } from '@/api'

export default {

  name: 'HelloWorld',

  data() {
    return {
      view: ''
    }
  },

  async created() {
    this.view = await getSomething()
  },

}
</script>

<style scoped>
.view {
  font: 700 32px Arial sans-serif;
}
</style>
