<template>
  <v-row class="d-flex fill-height jsutify-center align-center">
    <v-col cols="12" md="5" lg="5">

      <v-container fluid>
        <v-row class="ml-2">
          <v-col cols="12">
            <v-text class="text-h5 d-flex justify-center">
              Recuperar senha
            </v-text>
          </v-col>
        </v-row>
        <v-row class="ml-2 justify-center">
          <v-col cols="12" lg="6">
            <v-form ref="formLogin">
              <v-text-field label="Email" variant="solo" required></v-text-field>

              <v-row class="justify-center">
                <v-btn class="mt-4 w-50" color="success">
                  Recuperar
                </v-btn>
              </v-row>
              <v-row class="justify-center mt-10">
                <v-btn size="small" class="text-blue" variant="text">
                  Voltar para login
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <!-- <v-col cols="12" md="7" lg="7">
    </v-col> -->
  </v-row>
</template>

<script setup>
</script>