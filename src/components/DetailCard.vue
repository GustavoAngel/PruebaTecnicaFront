<template>
    <div class="detailTurn-container">
        <img src="../assets/closeico.svg" class="close-ico"
        alt="close icon" v-on:click="closeDetail" v-on:keydown="closeDetail">
        <h1 class="titleDetail">Turnos</h1>
        <h3 class="subTitle"><span>Identificador:</span> {{userId}}</h3>
        <h3 class="subTitle"><span>Nombre de usuario:</span> {{userNme}}</h3>
        <div class="Subcard-detail" v-for="(item,i) in fechas" v-bind:key="i">
            <div>
                <p>Fecha:</p>
                <p>Entrada:</p>
                <p>Salida:</p>
            </div>
            <div >
                <p>{{formatDate(item.date)}}</p>
                <p>{{formaTime(item.PunchIn)}}</p>
                <p>{{formaTime(item.PunchOut)}}</p>
            </div>
            <div class="container-buttons">
                <button class="button-detail edit-button" v-on:click="deleteItem(item._id,i)"
                v-on:keydown="deleteItem(item,i)">Editar</button>
                <button class="button-detail delete-button" v-on:click="deleteItem(item._id,i)"
                v-on:keydown="deleteItem(item,i)">delete</button>
            </div>
        </div>
    </div>
</template>
<style>
  .button-detail{
    margin: 5px;

  }
  .edit-button{
    width: 250px;
  }
  .delete-button{
    width: 150px;
  }
  .container-buttons{
    display: flex;
    align-items: flex-end;
    width: 100%;
  }
  .close-ico {
    height: 20px;
    width: 20px;
    position: absolute;
    left: 12px;
    top: 12px;
    cursor: pointer;
  }
  .titleDetail{
    margin-top: 24px;
  }
  .detailTurn-container{
    height: 100%;
    background-color: white;
    width: 450px;
    }
  .subTitle{
    text-align: left;
    padding-left: 12px;
    padding-top: 4px;
  }
  .Subcard-detail {
    text-align: left;
    padding-left: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    display: grid;
    grid-template-columns: 100px 1fr;
    border: 1px solid #00C9B8;
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 12px;
    border-radius: 4px;
    justify-content: space-between;
  }
  .Subcard-detail p {
    margin-top: 4px;
    color: black;
  }

</style>
<script lang="ts">
import { defineComponent } from 'vue';

import UtileriasCls from '../model/utilerias';

import employee from '../model/employee';

export default defineComponent({
  data() {
    return {
      userNme: '',
      fechas: [] as any,
    };
  },
  props: ['userId'],
  watch: {
    userId(a: any) {
      this.getDetalles(a);
    },
    fechas(a : any) {
      if (this.fechas.length < 1) {
        document.querySelector('h4')?.classList.toggle('inactive');
      }
    },
  },
  methods: {
    getDetalles(a:string) {
      fetch(`${UtileriasCls.myAppUrl()}apimain/usuariosTurnos/${a}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      }).then((res) => res.json())
        .then((data) => {
          this.fechas = data as employee[];
          this.userNme = this.fechas[0].userNme;
        }).catch((res) => {
          console.log(res);
        });
    },
    formatDate(date:Date) {
      const dat = new Date(date);
      return dat.toLocaleDateString();
    },
    formaTime(date:Date) {
      const dat = new Date(date);
      const time = dat.toLocaleTimeString();
      const result = time.split(':')[0].length < 2 ? `0${time}` : time;
      return result;
    },
    closeDetail() {
      this.$emit('closeDetail');
    },
    deleteItem(item: any, i: number) {
      if (window.confirm('¿Seguro deseas eliminar el registro?')) {
        fetch(`${UtileriasCls.myAppUrl()}apimain/${item}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        });
        this.fechas.splice(i, 1);
      }
    },
  },
});

</script>
