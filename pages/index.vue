<template>
  <v-container class="fluid">
    <div>
      <v-app-bar>
        <v-app-bar-title class="pl-5">
          SISTEMA DE CONSULTA DE EFETIVO
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
              <v-col cols="12" lg="4">
                <div v-if="inputOption.id != 0">
                  <v-text-field :rules="[(v) => required(v), (v) => onlyNumber(v), (v) => matOrName(v)]"
                    v-model="inputValue" :label="textLabel"></v-text-field>
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
  <div>
    <v-footer v-for="foo, idx in footer" :key="idx" class="footer-align bg-grey text-center h-10">
      <strong>Sistema de Consulta de Efetivo</strong>
      <strong>Coordenação de Desenvolvimento de Sistemas</strong>
      <strong>Fonte: RHBA</strong>
    </v-footer>
  </div>
</template>



<script lang="ts" setup>
import axios from 'axios'
const { $toast } = useNuxtApp()

const formRequest = ref(null)
let data = ref('');
const inputOption = ref({
  title: 'Selecionar',
  type: 'selecionar',
  id: 0,
  disabled: true,
  icon: 'mdi-magnify'
})
const inputValue = ref('')
const option = [{
  title: 'Matrícula',
  type: 'matricula',
  id: 1,
  disabled: false,
  icon: 'mdi-numeric'
},
{
  title: 'Nome',
  type: 'nome',
  id: 2,
  disabled: false,
  icon: 'mdi-account'
},
{
  title: 'CPF',
  type: 'value',
  id: 3,
  disabled: false,
  icon: 'mdi-id-card'
}]
const footer = ref([
  { text: '' },
  { text: '' },
  { text: 'Coordenação de Desenvolvimento de Sistemas' }
])

const textLabel = computed(() => {
  switch (inputOption.value.id) {
    case 1:
      return 'Digite a matrícula do servidor';
    case 2:
      return 'Digite o nome do servidor';
    case 3:
      return 'Digite o CPF do servidor';
    default:
      return '';
  }
})


const fetchData = async () => {
  const isValid = await formRequest.value?.validate()
  if (isValid.valid) {
    try {
      const loginUrl = 'http://bus-api.ssp.ba.intranet:3001/sentinela/api/login'
      const response = await axios({
        method: 'post',
        url: loginUrl,
        data: {
          email: 'comunicacao.efetivo.ssp@ssp.ba.gov.br',
          passwd: '@&vEZpaRu^WyDf8'
        },
      })

      const token = response.data.token
      const result = await axios({
        method: 'get',
        url: `http://bus-api.ssp.ba.intranet:3001/sentinela/api/sspba/rhba?${inputOption.value.type}=${inputValue.value}`,
        headers: {
          cpf: '14452590799',
          Authorization: `Bearer ${token}`
        }
      })
      const police = result
      console.log(police)
    } catch (error) {
      console.log(error)
    }
    return
  }
  $toast.fire(
    "Verifique seu formulário.", "", "error"
  );
}

const clearData = () => {
  inputValue.value = ''
  inputOption.value = {
    title: 'Selecionar',
    type: 'selecionar',
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


<style>
.footer-align {
  display: flex;
  position: fixed;
  justify-content: space-around;
  bottom: 0;
  padding: 0;
  gap: 50px;
  width: 100%;
}
</style>