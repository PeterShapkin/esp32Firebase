<template>
  <div>
    <div
       v-for="(item, key) in addresses"
       :key="item.id "
       class="container"
    >
      <div
          class="timeMac-wrapper"
          @click="addresses[key][key] = !addresses[key][key]"
      >
        <span
           v-text="item.mac"
           class="mac"
           :class="[addresses[key][key] ? '__picked' : '', 'mac']"
        />
        <span
           :class="[addresses[key][key] ? '__picked' : '', 'time']"
           v-text="formatDate(item.time)"
        />
      </div>

      <ul
         class="states"
         v-if="addresses[key][key]"
      >
        <li
           class="shelf"
           v-for="state in item.state"
           :key="state[0]"
        >
          <span
             class="shelfNumber"
             v-text="state[0]"
          />
          <ul class="IOstates">
            <li
               v-for="IO in state[1]"
               :key="IO.id"
               :class="[IO === 1 ? '__green' : '__red', 'IO']"
            />
          </ul>
        </li>
      </ul>
    </div>

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
      uploader: 0,
      addresses: {},
    }
  },

  created() {
    firebase.database()
            .ref('/data')
            .limitToLast(3) // опционально
            .once('value')
            .then(
                snapshot => {
                    this.addresses = snapshot.val()

                    for (const key in this.addresses) {

                        this.$set(
                            this.addresses[key],
                            [key],
                            false
                        )

                    }
                }
            )

    firebase.database()
        .ref('/data')  //здесь нужен урл '/:mac'
        .on(
            'child_added',
            child => {
                this.$set(
                    this.addresses,
                    [child.key],
                    child.val()
                )

                this.$set(
                    this.addresses[child.key],
                    [child.key],
                    false
                )
            }
        )
  },

  methods: {
    // Обработчик для загрузки файла в firebase.storage
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
      firebase.auth()
              .signOut()
              .then(
                      () => {
                        localStorage.setItem('auth', 'false')
                        this.$router.push({
                          name: 'SignIn'
                        })
                      }
              )
    },

    formatDate(date) {
      const timestamp = Date.parse(date)
      return new Date(timestamp).toLocaleString()
    },
  },
}
</script>

<style scoped lang="stylus">

.container
    display flex
    background-color black

.timeMac-wrapper
    display flex
    flex 0 0 25%
    flex-direction column
    font-size 48px
    cursor pointer

.mac
    color saddlebrown
    font-weight bold
    &.__picked
        color gold
        text-shadow 0 0 20px yellow, 0 0 10px yellow, 0 0 5px yellow
.time
    color maroon
    font-size 28px
    &.__picked
        animation neon 5s ease-in-out alternate infinite


.states
    flex 0 1 75%

.shelf
    display flex
    margin-bottom 15px


.shelfNumber
    font-size 28px
    font-weight bold
    flex 0 0 5%
    color gold


.IOstates
    display flex
    align-items center
    justify-content space-between
    width 100%

.IO
    width 25px
    height @width
    border-radius 50%

.__green
    background-color lime
    box-shadow 0 0 15px 7px limegreen

.__red
    background-color red
    box-shadow 0 0 15px 7px firebrick


ul
    list-style none
    padding 0
    margin 0


div
    border 1px solid black


button
  background-color dodgerblue
  border-radius 3px
  border none
  color white
  box-shadow 2px 2px 4px grey
  font-size 15px
  font-weight 500
  padding 5px 10px
  margin-top 20px
  outline none


button:active
  box-shadow 0 0


@keyframes neon
    0%
        color maroon
        text-shadow 0 0 7px maroon

    1%
        color red
        text-shadow 0 0 5px red

    20%
        text-shadow 0 0 5px maroon

    25%
        color red
        text-shadow 0 0 7px red

    35%
        color maroon
        text-shadow 0 0 7px maroon

    36%
        color red
        text-shadow 0 0 5px red

    37%
        color maroon
        text-shadow 0 0 5px maroon

    38%
        color red
        text-shadow 0 0 5px red
</style>

