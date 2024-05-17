<template>
  <div>
    <h1>BASE DE DADOS SERVIDOR SSP</h1>
  </div><br>

  <div>
    <h3>Buscar Servidor por:</h3>
  </div><br>
  <v-select v-model="inputMethod" :items="method" :rules="[v => !!v || 'Item is required']" label="Item"
    required></v-select>
  <div>
    <v-select v-model="inputMethod" :items="method" item-value="value" item-title="text" label="Selecionar"
      required></v-select>
  </div>

  <section>
    <v-sheet class="mx-auto" width="500">
      <v-form ref="form">
        <div>
          <div>
            <v-select v-model="inputMethod" :items="method" item-value="value" item-title="text" label="Selecionar"
              required></v-select>
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
    <pre v-for="typeValue, idx in method" :key="idx" :value="typeValue.value"
      :disabled="typeValue.selected">{{ typeValue.text }}</pre>
    <pre>{{ method }}</pre>
  </section>
  <div>
    <table class="table table-striped">
      <thead>
        <tr v-for="users, key in user">
          <th>{{ key }}</th>
          <td>{{ users ?? 'Não informado' }}</td>
        </tr>
      </thead>
    </table>
  </div>

</template>

<script lang="ts" setup>

// function async FetchData(url){
//   try {
//     const response = await fetch('http://pool-api.ssp.ba.intranet/rhba?matricula=30653814');
//     const police = await response.json()
//     console.log(police)
//   }
// }
const data = ref('');
const inputMethod = ref('')
const inputValue = ref('')
const method = [{
  text: 'Selecionar',
  value: 0,
  selected: true
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

const FetchData = async () => {
  const response = await fetch('http://pool-api.ssp.ba.intranet/rhba?matricula=30653814');
  data.value = await response.json()
  console.log(data.value)
}

FetchData()
console.log(data.value)


const user = await $fetch('http://pool-api.ssp.ba.intranet/rhba?matricula=30653814');
console.log(user);
</script>
