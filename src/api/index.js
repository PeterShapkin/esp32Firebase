import axios from 'axios'

export function getSomething(){
    return axios.get('https://esp32db-d4ce0.firebaseio.com/first.json')
        .then(
            respond => respond.data
        )
}
