<template>
    <div >
        <h1 class="title-list">Bitacora</h1>
        <div class="main-container">
        <div class="container-cards">
            <cardData v-for="(item,i) in turnsPreview"
            v-bind:employDetail="item" v-on:onDetails="viewDetails"  v-bind:key="i"
            class="card-individual"></cardData>
        </div>
        <DetailCard class="detailcar-cont inactive" v-bind:userId="userId"
        v-on:closeDetail="closeDetail"></DetailCard>
        </div>
    </div>
</template>
<style>
    .title-list{
        margin-bottom: 22px;
    }
    .main-container{
        display: grid;
        grid-template-columns: 1fr auto;
    }
    .inactive{
        display: none;
    }
    .detailcar-cont {
        height: 80vh;
        border-left: 1px solid rgb(141, 141, 141);
        position: relative;
        right: 0;
        z-index: 2;
    }
    .container-cards{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .container-cards{
        display: grid;
        grid-template-columns: repeat(auto-fill,300px);
        grid-template-rows: repeat(auto-fill,100px);
    }
    .card-individual{
        width: auto;
    }
</style>

<script lang="ts">

import { defineComponent } from 'vue';

import cardData from '@/components/CardData.vue';

import UtileriasCls from '../model/utilerias';
import employee from '../model/employee';
import DetailCard from '../components/DetailCard.vue';

export default defineComponent({
  data() {
    return {
      turnsPreview: [] as employee[],
      userId: '',
    };
  },
  components: {
    cardData,
    DetailCard,
  },
  computed: {

  },
  created() {
    this.getTurns();
  },
  watch: {

  },
  methods: {
    getTurns() {
      fetch(`${UtileriasCls.myAppUrl()}apimain/usuarios`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }).then((res) => res.json()).then((data) => {
        this.turnsPreview = data as employee[];
      }).catch((res) => {
        console.log(res);
        window.alert('Servidor ocupado favor');
      });
    },
    viewDetails(a: any) {
      const detallesVUE = document.querySelector('.detailcar-cont');
      if (detallesVUE?.classList.contains('inactive')) {
        detallesVUE?.classList.toggle('inactive');
      }
      this.userId = a.userId;
    },
    closeDetail() {
      const detallesVUE = document.querySelector('.detailcar-cont');
      detallesVUE?.classList.toggle('inactive');
    },
  },
});

</script>
