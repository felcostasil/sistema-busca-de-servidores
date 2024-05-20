import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  showConfirmButton: false,
  timer: 4500,
  timerProgressBar: true,
  customClass: {
    popup: 'colored-toast'
  }
})

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('swal', Swal)
  nuxtApp.provide('toast', Toast)
}) 