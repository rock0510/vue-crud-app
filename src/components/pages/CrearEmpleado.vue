<template>
    <layout-div>
      <h2 class="text-center mt-5 mb-3">Crear Empleado</h2>
      <div class="card">
          <div class="card-header">
              <router-link 
                  class="btn btn-outline-info float-right"
                  to="/">Ver Empleados
              </router-link>
          </div>
          <div class="card-body">
              <form>
                  <div class="form-group">
                      <label htmlFor="id">id</label>
                      <input 
                          v-model="empleado.id"
                          type="text"
                          class="form-control"
                          id="id"
                          name="id"/>
                  </div>
                  <div class="form-group">
                      <label htmlFor="fotografia">fotografia</label>
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
                      Save Project
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
    name: 'CrearEmpleado',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        empleado: {
          id: '',
          fotografia: '',
        },
        isSaving:false,
      };
    },
    methods: {
      handleSave() {
          this.isSaving = true
          axios.post('/setEmpleado', this.empleado)
            .then(response => {
              Swal.fire({
                  icon: 'success',
                  title: 'Empleado guardado!',
                  showConfirmButton: false,
                  timer: 1500
              })
              this.isSaving = false
              this.project.name = ""
              this.project.description = ""
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