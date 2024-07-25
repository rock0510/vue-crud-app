<template>
    <layout-div>
          <div class="container">
              <h2 class="text-center mt-5 mb-3">Lista Empleados</h2>
              <div class="card">
                  <div class="card-header">
                      <router-link to="/create"
                          class="btn btn-outline-primary"
                          >Crear Empleado
                      </router-link>
                  </div>
                  <div class="card-body">               
                      <table class="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Id</th>
                                  <th>Fotografia</th>
                                  <th>Nombre</th>
                                  <th>Apellido</th>
                                  <th>PuestoId</th>
                                  <th>FechaNacimiento</th>
                                  <th>Direccion</th>
                                  <th>Telefono</th>
                                  <th>CorreoElectronico</th>
                                  <th>EstadoId</th>                                  
                                  <th width="240px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                               
                              <tr v-for="empleado in empleados" :key="empleado.id">
                                  <td>{{empleado.id}}</td>
                                  <td>{{empleado.fotografia}}</td>
                                  <td>{{empleado.nombre}}</td>
                                  <td>{{empleado.apellido}}</td>
                                  <td>{{empleado.puestoId}}</td>
                                  <td>{{empleado.fechaNacimiento}}</td>
                                  <td>{{empleado.direccion}}</td>
                                  <td>{{empleado.telefono}}</td>
                                  <td>{{empleado.correoElectronico}}</td>
                                  <td>{{empleado.estadoId}}</td>
                                  <td>                                      
                                      <!--<router-link :to="`/edit/${empleado.id}`" class="btn btn-outline-success mx-1">Edit</router-link>-->
                                      <button 
                                          @click="jsEliminar(empleado.id)"
                                          className="btn btn-outline-danger mx-1">
                                          Delete
                                      </button>
                                    
                                  </td>
                              </tr>
                                   
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </layout-div>
  </template>
   
  <script>
  import axios from 'axios';
  import LayoutDiv from '../LayoutDiv.vue';
  import Swal from 'sweetalert2'
   
  export default {
    name: 'ListaEmpleados',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        empleados:[]
      };
    },
    created() {        
      this.fetchListaEmpleados();
      //console.log(this.empleados);
    },
    methods: {
        fetchListaEmpleados() {         
        axios.get('/getEmpleados').then(response => {
              this.empleados = response.data;
              return response
          })
          .catch(error => {
            return error
          });          
      },
      jsEliminar(id){        
          Swal.fire({
              title: '¿Estas seguro de eliminar?',
              text: 'No se puede eliminar esta accion!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, eliminar!',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                  axios.get(`/delEmpleado?Id=${id}`)
                  .then( response => {
                      Swal.fire({
                          icon: 'success',
                          title: 'Empleado eliminado!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      this.fetchListaEmpleados();
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
                  });
              }
            })
      }
    },
  };
  </script>