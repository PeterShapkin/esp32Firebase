<template>
  <div class="view">
    {{view}}
    <input
            type="file"
            @change="onChangeHandler"
    >
    <progress
            max="100"
            :value="uploader"
    />
    <button @click="logOut">
      Выйти
    </button>
  </div>
</template>

<script>
  import firebase from 'firebase/app'

  export default {

  name: 'Dashboard',

  data() {
    return {
      view: '',
      uploader: 0
    }
  },

  created() {
    firebase.database()
            .ref('/first/a')
            .on(
                    'value',
                    response => this.view = response.val()
            )
  },

  methods: {
    onChangeHandler(e) {

      const file = e.target.files[0]

      // Создать ссылку на место хранения файла в store
      const storeRef = firebase.storage().ref('firmware/' + file.name)

      const task = storeRef.put(file)

      //TODO request.auth != null; - вставить в rules FBStorage

      task.on(
              'state_changed',
              snapshot => {
                this.uploader = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              },
              // eslint-disable-next-line no-console
              error => console.log(error.message),

              () => {
                this.uploader = 0
                // eslint-disable-next-line no-console
                console.log('success!')
              }
      )
    },

    logOut() {
      //TODO разлогиниться
      firebase.auth().signOut()

      this.$router.push({
        name: 'SignIn'
      })
    }
  }

}
</script>

<style scoped>
.view {
  font: 700 32px Arial sans-serif;
}

button {
  background-color: dodgerblue;
  border-radius: 3px;
  border: none;
  color: white;
  box-shadow: 2px 2px 4px grey;
  font-size: 15px;
  font-weight: 500;
  padding: 5px 10px;
  margin-top: 20px;
}
</style>
