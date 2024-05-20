<template>
  <v-container class="fluid">
    <div>
      <v-app-bar>
        <h1>{{ title }}</h1>
      </v-app-bar>
    </div><br>

    <section>
      <v-sheet class="mx-auto" max-width="500">
        <v-form ref="form">
          <div>
            <h3>{{ subtitle }}</h3>
          </div><br>
          <div>
            <div>
              <v-select v-model="inputOption" :items="option" item-value="value" item-title="text" required></v-select>
            </div>

            <div>
              <v-text-field v-model="inputValue" :counter="8" label="Digite" required></v-text-field>
            </div>

            <div>
              <v-btn :disabled="inputValue?.length < 3" class="mt-4" color="success" @click="FetchData()">Buscar</v-btn>
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

// function async FetchData(url){
//   try {
//     const response = await fetch('http://pool-api.ssp.ba.intranet/rhba?matricula=30653814');
//     const police = await response.json()
//     console.log(police)
//   }
// }
const title = 'SISTEMA DE BUSCA DE SERVIDORES';
const subtitle = 'Buscar Servidor por:'
const data = ref('');
const inputOption = ref()
const inputValue = ref('')



const option = [{
  text: 'Selecionar',
  value: 0,
  selected: true,
  disabled: true
},
{
  text: 'Matrícula',
  value: 'matricula',
  selected: false
},
{
  text: 'Nome',
  value: 'nome',
  selected: false
}]

// const FetchData = async () => {
//   const response = await fetch('http://pool-api.ssp.ba.intranet/rhba?matricula=30653814');
//   data.value = await response.json()
//   console.log(data.value)
// }

// FetchData()
// console.log(data.value)


// const user = await $fetch('http://pool-api.ssp.ba.intranet/rhba?matricula=30653814');
// console.log(user);
</script>
