<template>
  <div class="container" >
      <nav class="navBarHeader">
        <a class="navbar-brand" >
          <img src="./assets/logo.png" width="150" height="30" class="d-inline-block align-top" alt="logo">
        </a>
        <a class="nav-link navItem navitemMa"  v-on:click="uploadNav">File upload</a>
        <a class="nav-link navItem navitemMa"  v-on:click="registroManualNav">Register</a>
      </nav>
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
.container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navBarHeader{
  position: relative;
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
}
.navItem{
  cursor: pointer;
}
.navitemMa{
  margin-left: 10px;
}
</style>
