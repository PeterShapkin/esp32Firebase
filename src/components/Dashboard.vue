<template>
  <div class="view">
    {{view}}
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {

  name: 'Dashboard',

  data() {
    return {
      view: ''
    }
  },

  created() {
    firebase
            .database()
            .ref('/first/a')
            .on(
                    'value',
                    response => this.view = response.val()
            )
  },

}
</script>

<style scoped>
.view {
  font: 700 32px Arial sans-serif;
}
</style>
