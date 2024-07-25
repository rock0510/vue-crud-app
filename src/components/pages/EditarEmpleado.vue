<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Editar Empleado</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/">Lista Empleados
                 </router-link>
             </div>
             <div class="card-body">
                 <form>
                     <div class="form-group">
                         <label htmlFor="name">Nombre</label>
                         <input 
                             v-model="empleado.nombre"
                             type="text"
                             class="form-control"
                             id="nombre"
                             name="nombre"/>
                     </div>
                     <div class="form-group">
                         <label htmlFor="description">Fotografia</label>
                         <textarea 
                             v-model="empleado.fotografia"
                             class="form-control"
                             id="fotografia"
                             rows="3"
                             name="fotografia"></textarea>
                     </div>
                     <button 
                         @click="handleSave()"
                         :disabled="isSaving"
                         type="button"
                         class="btn btn-outline-primary mt-3">
                         Guardar Empleado
                     </button>
                 </form>
             </div>
         </div>
    </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'EditarEmpleado',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       empleado: {
         nombre: '',
         fotografia: '',
       },
       isSaving:false,
     };
   },
   created() {
     const id = this.$route.params.id;
     axios.get(`/getEmpleados?Id=${id}`)
     .then(response => {
         let infoEmpleado = response.data
         this.empleado.nombre = infoEmpleado.nombre
         this.empleado.fotografia = infoEmpleado.fotografia
         return response
     })
     .catch(error => {
         Swal.fire({
             icon: 'error',
             title: 'Ocurrio un error!',
             showConfirmButton: false,
             timer: 1500
         })
         return error
     })
   },
   methods: {
     handleSave() {
         this.isSaving = true
         
         axios.patch(`/updEmpleado`, this.empleado)
           .then(response => {
             Swal.fire({
                 icon: 'success',
                 title: 'Se guardo empleado!',
                 showConfirmButton: false,
                 timer: 1500
             })
             this.isSaving = false
             this.empleado.nombre = ""
             this.empleado.fotografia = ""
             return response
           })
           .catch(error => {
             this.isSaving = false
             Swal.fire({
                 icon: 'error',
                 title: 'Ocurrio un error!',
                 showConfirmButton: false,
                 timer: 1500
             })
             return error
           });
     },
   },
 };
 </script>