<template>
  <v-container class="fluid">
    <div>
      <v-app-bar>
        <v-app-bar-title class="pl-5">
          SISTEMA DE CONSULTA DE EFETIVO
        </v-app-bar-title>
      </v-app-bar>
    </div>
    <v-container>
      <v-col cols="12" lg="4">
        <v-sheet class="mx-auto">
          <v-form ref="form">
            <v-text-field label="Email" required></v-text-field>

            <v-text-field label="Senha" required></v-text-field>

            <div class="d-flex flex-column">
              <v-row>
                <v-col cols="1">
                  <v-btn class="mt-4" color="success" max-width="200">
                    Acessar
                  </v-btn>

                  <v-btn class="mt-4" color="error" max-width="200">
                    Esqueci a senha
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn class="mt-4" color="warning" max-width="200">
                Cadastrar
              </v-btn>
            </div>
          </v-form>
        </v-sheet>
      </v-col>
    </v-container>
  </v-container>

  <footer>

  </footer>

</template>


<script>
// const required = (v) => {
//   if (v) return true
//   return 'Esse campo é obrigatório.'
// }


</script>