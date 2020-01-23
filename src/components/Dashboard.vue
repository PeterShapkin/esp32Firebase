<template>
  <div class="view">
    {{view}}
  </div>
</template>

<script>
// import { getSomething } from '@/api'
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'

export default {

  name: 'Dashboard',

  data() {
    return {
      view: ''
    }
  },

  created() {
    // this.view =
    firebase.database().ref('/first/a').on('value',
            // eslint-disable-next-line no-console
            response => this.view = response.val()
    )
    // eslint-disable-next-line no-console
    // console.log(this.view)
  },

}
</script>

<style scoped>
.view {
  font: 700 32px Arial sans-serif;
}
</style>
