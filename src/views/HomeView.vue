<template>
  <div class="home">
    <img alt="Vue logo" class="logo-key" src="../assets/logo.png">
    <bienvenidaVUE msg="Bienvenido a la prueba tecnica."/>
  </div>
</template>
<style>
.logo-key{
  height: 250px;
}
</style>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import bienvenidaVUE from '@/components/BienvenidaPage.vue';

@Options({
  components: {
    bienvenidaVUE,
  },
})
export default class HomeView extends Vue {}
</script>
