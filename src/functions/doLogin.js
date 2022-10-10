import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export default async function doLogin(email, password){

    const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password
    });

    localStorage.setItem('token', response.data.token);
    return response;

}