<script setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import getToken from '@/functions/getToken';
    import axios from 'axios';
    import dayjs from 'dayjs';
    import customParseFormat from 'dayjs/plugin/customParseFormat';
    dayjs.extend(customParseFormat);
    
    const API_URL = process.env.VUE_APP_API_URL;
    const token = getToken();
    const router = useRouter();

    if(!token) router.push('/login');

    const APODImage = ref('');
    const date = ref('');

    async function loadAPODImage(date){

        try {
            
            const { data } = await axios.get(`${API_URL}/APODImages${date ? `/${date}` : ''}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('data', data);

            APODImage.value = data.url;

        } catch (err) {
            console.log(err);
        }

    }

    function formatDate(){

        const dateObject = dayjs(date.value, 'DD-MM-YYYY');
        const formattedDate = dateObject.format('YYYY-MM-DD');
        return formattedDate;

    }

    function loadFromDate(){
        loadAPODImage(formatDate());
    }

    function listenKeyboard(e) {
        if(e.key === 'Enter') loadFromDate();
    }

    loadAPODImage();

</script>

<template>

<v-parallax
    dark
    :src="APODImage"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >

        <v-container>

            <v-row>
                <v-col>
                    <h1 class="display-2 font-weight-bold mb-4">Astronomy Picture of the Day. By NASA</h1>
                </v-col>
            </v-row>

            <v-row
                align="center"
                justify="center"
            >
                <v-col cols="10">
                    <v-text-field
                        label="Informe uma data"
                        required
                        v-model="date"
                        v-mask="'##/##/####'"
                        @keydown="listenKeyboard"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-btn
                        fill-height
                        block
                        @click="loadFromDate"
                    >
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

        </v-container>
        
      </v-col>
    </v-row>
  </v-parallax>

</template>