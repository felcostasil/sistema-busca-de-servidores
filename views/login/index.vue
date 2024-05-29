<template>
  <v-row class="d-flex fill-height jsutify-center align-center">
    <v-col cols="12" md="5" lg="5">

      <v-container v-if="!formResetPsswd" fluid>
        <v-row class="ml-2">
          <v-col cols="12">
            <v-text class="text-h5 d-flex justify-center">
              Login do usuário
            </v-text>
          </v-col>
        </v-row>
        <v-row class="ml-2 justify-center">
          <v-col cols="12" lg="6">
            <v-form ref="formLogin">
              <v-text-field label="Email" variant="solo" required></v-text-field>

              <v-text-field label="Senha" variant="solo" required></v-text-field>

              <v-row class="justify-center">
                <v-btn class="mt-4 w-50" color="success">
                  Acessar
                </v-btn>
              </v-row>
              <v-row class="justify-center mt-10">
                <v-btn @click="forgotPasswd()" size="small" class="text-blue" variant="text">
                  Esqueci a senha
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="formResetPsswd">
        <resetPassword />
      </v-container>
      <!-- </v-col>
    <v-col cols="12" md="7" lg="7"> -->
    </v-col>
  </v-row>
</template>


<script setup>
import resetPassword from './../../pages/resetPassword/index.vue'

const formResetPsswd = ref(false)

const forgotPasswd = () => {
  formResetPsswd.value = true;
}

// const required = (v) => {
//   if (v) return true
//   return 'Esse campo é obrigatório.'
// }


</script>