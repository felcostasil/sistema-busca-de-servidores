<template>
  <v-container class="fluid">
    <div>
      <v-app-bar>
        <v-app-bar-title class="pl-5">
          SISTEMA DE CONSULTA DE EFETIVO
        </v-app-bar-title>
      </v-app-bar>
    </div>
    <v-card v-if="displayForm()">
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
            <v-row>
              <v-col cols="1">
                <v-btn :disabled='inputOption.id == 0' class="mt-4" color="primary" @click="fetchData()">Buscar</v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn :disabled="inputOption.id == 0" class="mt-4" color="warning" @click="clearData()">Limpar</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- Display Single Information -->
    <v-card v-if="tableData.length">
      <v-card-title class="d-flex justify-space-between">
        Dados do servidor
        <v-btn @click="newSearch()" color="warning">Nova Busca</v-btn>
      </v-card-title>
      <v-table v-if="tableData.length" class="table table-stiped">
        <thead>
          <tr>
            <th>NOME</th>
            <th>MATRÍCULA</th>
            <th>UNIDADE</th>
            <th>CARGO</th>
            <th>POSTO/GRAD</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="datas in tableData">
            <td>{{ datas.nomeServidor }}</td>
            <td>{{ datas.matricula }}</td>
            <td>{{ datas.unidade }}</td>
            <td>{{ datas.cargo }}</td>
            <td>{{ datas.patente ?? 'Não Informada' }}</td>
            <td><v-btn class="mt-4">Exibir</v-btn></td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-card v-if="fullData.nomeServidor" class="mx-auto">
      <v-card-title class="d-flex justify-space-between">
        Dados do servidor
        <v-btn @click="newSearch()" color="warning">Nova Busca</v-btn>
      </v-card-title>

      <v-card-text class="pa-5">
        <v-row>
          <v-col>
            <v-text-field label="Nome" :model-value="fullData.nomeServidor" variant="outlined" disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Matrícula" :model-value="fullData.matricula" variant="outlined"
              disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Unidade" :model-value="fullData.unidade" variant="outlined" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Patente" :model-value="fullData.patente" variant="outlined" disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Data de Admissão" :model-value="fullData.dataAdmissao" variant="outlined"
              disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Cargo" :model-value="fullData.cargo" variant="outlined" disabled></v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col>
            <v-text-field label="Cidade" :model-value="fullData.endereco_cidade.toUpperCase()" variant="outlined"
              disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Logradouro" :model-value="fullData.endereco_logradouro" variant="outlined"
              disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Bairro" :model-value="fullData.endereco_bairro" variant="outlined"
              disabled></v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col>
            <v-text-field label="sexo" :model-value="fullData.sexo" variant="outlined" disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Data de Nascimento" :model-value="fullData.dataNascimento" variant="outlined"
              disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="RG" :model-value="fullData.rg" variant="outlined" disabled></v-text-field>
          </v-col>
        </v-row><v-row>
          <v-col>
            <v-text-field label="Email" :model-value="fullData.email" variant="outlined" disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="CPF" :model-value="fullData.cpf" variant="outlined" disabled></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Celular" :model-value="fullData.celular" variant="outlined" disabled></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

  </v-container>
  <div>
    <v-footer v-for="foo, idx in footer" :key="idx" class="footer-align bg-grey text-center h-10 mt-10">
      <strong>Sistema de Consulta de Efetivo</strong>
      <strong>Coordenação de Desenvolvimento de Sistemas</strong>
      <strong>Fonte: RHBA</strong>
    </v-footer>
  </div>
</template>

<style>
.v-field--disabled {
  opacity: 100% !important;
}
</style>



<script lang="ts" setup>
import axios from 'axios'
const { $toast } = useNuxtApp()
const loginUrl = 'http://bus-api.ssp.ba.intranet:3001/sentinela/api/login'
const baseUrl = 'http://bus-api.ssp.ba.intranet:3001/sentinela/api/sspba/rhba?'
const formRequest = ref(null)
let result = ref(null)
let tableData = ref([])
let fullData = ref({});
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
  type: 'cpf',
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

const displayForm = () => {
  if (tableData.value.length || fullData.value?.nomeServidor) {
    return false
  }
  return true
}

const fetchData = async () => {
  const isValid = await formRequest.value?.validate()
  if (isValid.valid) {
    try {
      const response = await axios({
        method: 'post',
        url: loginUrl,
        data: {
          email: 'comunicacao.efetivo.ssp@ssp.ba.gov.br',
          passwd: '@&vEZpaRu^WyDf8'
        },
      })
      const token = response.data.token
      let result = await axios({
        method: 'get',
        url: `${baseUrl}${inputOption.value.type}=${inputValue.value}`,
        headers: {
          cpf: '14452590799',
          Authorization: `Bearer ${token}`
        }
      })
      if (inputOption.value.type == 'nome') {
        console.log(result.data.meta)
        if (result.data.data.length > 1) {
          return tableData.value.push(...result.data.data)
        }
        const res = await axios({
          method: 'get',
          url: `${baseUrl}${'matricula'}=${result.data.data[0].matricula}`,
          headers: {
            cpf: '14452590799',
            Authorization: `Bearer ${token}`
          }
        })
        fullData.value = res.data
        return
      }
      return fullData.value = result.data
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
  tableData.value = []
  fullData.value = {}
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

const newSearch = () => {
  clearData()
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