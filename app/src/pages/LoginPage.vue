<script setup>

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
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
  <v-parallax
    dark
    src="./../assets/potm2208a.jpg"
    :style="{ paddingTop: '100px' }"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >
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
              label="Senha"
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
      </v-col>
    </v-row>
  </v-parallax>
</template>