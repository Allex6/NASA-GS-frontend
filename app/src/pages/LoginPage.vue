<script setup>

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import backgroundImage from './../assets/potm2208a.jpg';
  import doLogin from './../functions/doLogin';

  const router = useRouter();

  const email = ref('');
  const password = ref('');
  const alertDisplay = ref(false);
  const alertMessage = ref('');
  const alertType = ref('success');
  const buttonLoading = ref(false);

  function showError(message) {
    alertDisplay.value = true;
    alertMessage.value = message;
    alertType.value = 'error';
    buttonLoading.value = false;
  }

  async function login(e) {

    e.preventDefault();

    if(!email.value) {
      showError('Informe o email');
      return;
    }
    if(!password.value) {
      showError('Informe a senha');
      return;
    }

    try {

      buttonLoading.value = true;
      await doLogin(email.value, password.value);
      buttonLoading.value = false;
      router.push('/');

    } catch (err) {

      console.log(err);

      if(err.response.data === 'Invalid credentials.') {
        showError('Credenciais inválidas. Verifique se digitou corretamente.');
        return;
      }

      showError('Ocorreu um erro desconhecido');

    }

  }

</script>

<template>
  <div 
    :style="{
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      paddingTop: '100px'
    }
  ">
    <v-card
      outlined
      elevation="3"
      class="mx-auto pa-5"
      width="50%"
    >
      <v-form
        ref="form"
        lazy-validation
        @submit="login"
      >

        <v-card-title>
          <h1 class="pt-10 pb-10">Login</h1>
        </v-card-title>

        <v-alert
          :type=alertType
          v-if="alertDisplay"
          class="mb-10"
        >{{alertMessage}}</v-alert>

        <v-text-field
          label="Email"
          required
          v-model="email"
        ></v-text-field>

        <v-text-field
          label="Password"
          type="password"
          required
          v-model="password"
        ></v-text-field>

        <v-btn
          color="success"
          class="mr-4"
          type="submit"
          :loading=buttonLoading
        >
          Login
        </v-btn>

        <v-btn
          color="primary"
          class="mr-4"
          @click="() => router.push('/cadastro')"
        >
          Criar conta
        </v-btn>

      </v-form>
    </v-card>
  </div>
</template>