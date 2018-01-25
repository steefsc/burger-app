import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://react-my-burger-app-e066e.firebaseio.com/',
});

export default instance;

