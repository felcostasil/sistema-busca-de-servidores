<template>
  <v-container class="fluid">
    <div>
      <v-app-bar>
        <v-app-bar-title class="pl-5">
          SISTEMA DE BUSCA DE SERVIDORES
        </v-app-bar-title>
      </v-app-bar>
    </div>
    <v-card>
      <v-card-title>
        Buscar Servidor
      </v-card-title>
      <v-card-text>
        <v-form ref="formRequest">
          <v-container>
            <v-row>
              <v-col cols="12" lg="4">
                <v-select v-model="inputOption" :items="option" item-value="id" item-title="title" return-object>
                  <template v-slot:item="{ item, props }">
                    <v-list-item v-bind="props" :subtitle="item.title" :disabled="item.raw.disabled">
                      <template v-slot:prepend>
                        <v-icon :icon="item.raw.icon" />
                      </template>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <div v-if="inputOption.id != 0">
                  <v-text-field :rules="[(v) => required(v), (v) => onlyNumber(v), (v) => matOrName(v)]"
                    v-model="inputValue"
                    :label="inputOption.id == 1 ? 'Digite a matrícula do servidor' : 'Digite o nome do Servidor'"></v-text-field>
                </div>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn rounded :disabled='inputOption.id == 0' class="mt-4" color="primary"
                @click="fetchData()">Buscar</v-btn>
              <v-btn :disabled="inputOption.id == 0" class="mt-4" color="warning" @click="clearData()">Limpar</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

  <v-footer class="d-flex flex-column">
    <div class="px-4 py-1 bg-black text-center w-100">
      <strong>Developed by CDS</strong>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
const { $toast } = useNuxtApp()

const formRequest = ref(null)
const data = ref('');
const inputOption = ref({
  title: 'Selecionar',
  id: 0,
  disabled: true,
  icon: 'mdi-magnify'
})
const inputValue = ref('')
const option = [{
  title: 'Matrícula',
  id: 1,
  disabled: false,
  icon: 'mdi-numeric'
},
{
  title: 'Nome',
  id: 2,
  disabled: false,
  icon: 'mdi-account'
}]


const fetchData = async () => {
  const isValid = await formRequest.value.validate()
  console.log(isValid)
  if (isValid.valid) {
    console.log(inputOption.value.title, inputValue.value)
    return true
  }
  $toast.fire(
    "Verifique seu formulário.", "", "error"
  );
}

const clearData = () => {
  inputValue.value = ''
  inputOption.value = {
    title: 'Selecionar',
    id: 0,
    disabled: true,
    icon: 'mdi-magnify'
  }
  formRequest.value?.resetValidation()
}

const required = (v) => {
  if (v) return true
  return 'Esse campo é obrigatório.'
}


const matOrName = (v) => {
  if (inputOption.value.id == 1) {
    if (v.length == 8) return true
    return 'Esse campo deve ter 8 dígitos.'
  }
  if (v.length >= 3) return true
  return 'Esse campo deve conter ao menos 3 dígitos'
}

const onlyNumber = (v) => {
  if (inputOption.value.id == 1) {
    const numbers = new RegExp('^[0-9]+$')
    if (numbers.test(v)) return true
    return 'Digite somente números'
  }
}
</script>
