<template>
  <div>
    <header class="full navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
    <div >
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" >
            <img src="./assets/logo.png" width="150" height="30" class="d-inline-block align-top" alt="">
            Prueba tecnica
          </a>
          <ul class="navbar-nav">
              <li class="nav-item ">
                <a class="nav-link navItem"  v-on:click="uploadNav">File upload</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link navItem"  v-on:click="registroManualNav">Register</a>
              </li>
            </ul>
        </nav>
    </div>
    </header>
    <div>
      <turnsComponent ref="TurnsComponentRef" v-if="bandera" id="TurnsComponent" ></turnsComponent>
      <FileUpload id="FileUploadComponent" v-if="!bandera"  ></FileUpload>
      
    </div>
  </div>
  
</template>



<script>
//import HelloWorld from './components/HelloWorld.vue'
import FileUpload from './components/FileUpload.vue'
import turnsComponent from './components/turnsComponent.vue'


export default {
  data(){
    return {
      bandera:true
    };
  },
  name: 'App',
  methods:{
    uploadNav(){
      this.bandera=!this.bandera;
    },
    registroManualNav(){
      this.bandera=!this.bandera;
    }
  },
  components: {
    FileUpload,
    turnsComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navItem{
  cursor: pointer;
}
</style>
