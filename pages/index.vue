<template>
  <v-container class="fluid">
    <div>
      <v-app-bar>
        <h1>{{ title }}</h1>
      </v-app-bar>
    </div><br>

    <section>
      <v-sheet class="mx-auto" max-width="500">
        <v-form ref="formRequest">
          <div>
            <h3>{{ subtitle }}</h3>
          </div><br>
          <div>
            <div>
              <v-select v-model="inputOption" :items="option" item-value="id" item-title="title" required return-object>
                <template v-slot:item="{ item, props }">
                  <v-list-item v-bind="props" :subtitle="item.title" :disabled="item.raw.disabled">
                    <template v-slot:prepend>
                      <v-icon :icon="item.raw.icon" />
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </div>
            <!-- <pre>{{ inputOption }}</pre> -->

            <div v-if="inputOption.id != 0">
              <v-text-field :rules="[(v) => onlyNumber(v), (v) => matOrName(v)]" v-model="inputValue"
                :label="inputOption.id == 1 ? 'Digite a matrícula do servidor' : 'Digite o nome do Servidor'"
                required></v-text-field>
            </div>

            <div>
              <v-btn class="mt-4" color="success" @click="fetchData()">Buscar</v-btn>
              <v-btn class="mt-4" color="warning" @click="clearData()">Limpar</v-btn>
            </div>
          </div>
        </v-form>
      </v-sheet>
      <!-- <pre v-for="typeValue, idx in method" :key="idx" :value="typeValue.value"
      :disabled="typeValue.selected">{{ typeValue.text }}</pre>
    <pre>{{ method }}</pre> -->
    </section>
    <!-- <div>
      <table class="table table-striped">
        <thead>
          <tr v-for="users, key in user">
            <th>{{ key }}</th>
            <td>{{ users ?? 'Não informado' }}</td>
          </tr>
        </thead>
      </table>
    </div> -->
  </v-container>

  <v-footer class="d-flex flex-column">
    <div class="px-4 py-1 bg-black text-center w-100">
      <strong>Developed by CDS</strong>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
const formRequest = ref(null)
const title = 'SISTEMA DE BUSCA DE SERVIDORES';
const subtitle = 'Buscar Servidor por:'
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
  return alert('Verifique seu formulário.')
}

const clearData = () => {
  inputValue.value = ''
  inputOption.value = {
    title: 'Selecionar',
    id: 0,
    disabled: true,
    icon: 'mdi-magnify'
  }
  formRequest.value.resetValidation()
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
