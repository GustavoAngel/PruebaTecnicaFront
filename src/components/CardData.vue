<template>
    <div class="card-data" v-on:click="getDetails" v-on:keydown="getDetails" >
        <figure class="user-cart-figure">
            <img src="../assets/user.svg" class="logo-User" alt="user icon">
        </figure>
        <div style="position: relative;">
            <h3 class="userNme-h3">{{employDetail.userNme}}</h3>
            <h3 class="userId-h3">{{employDetail.userId}}</h3>
        </div>
    </div>
</template>

<style>
    *{
        margin: 0px;
    }
    .userNme-h3{
        text-align: left;
    }
    .userId-h3{
        position: absolute;
        right: 0;
    }
    .card-data{
        display: grid;
        grid-template-columns: auto 1fr ;
        grid-template-rows: auto;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 10px;
        background-color: #00C9B8;
        margin-bottom: 12px;
        margin-left: 12px;
        cursor: pointer;
    }
    .card-data:hover{
        -webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.4);
        -moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.4);
        box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.4);
    }
    .card-data figure{
        margin:5px;
        border: 2px solid white;
        border-radius: 40px;
        padding: 5px;
        background-color: #00C9B8;
    }
    .logo-User{
        width: 55px;
        height: 55px;
        object-fit: cover;
    }
    .userid-span{
        position: static;
        bottom: 0;
        right: 0;
        z-index: 5;
    }

</style>
<script lang="ts">
import { defineComponent } from 'vue';

import UtileriasCls from '../model/utilerias';

import employee from '../model/employee';

export default defineComponent({
  data() {
    return {
      empleado: 'hola',
      details: [] as any,
    };
  },
  props: ['employDetail'],
  watch: {
    employDetail(itemEdit: any) {
      const data = JSON.parse(JSON.stringify(itemEdit)) as employee;
      this.empleado = data.userNme;
    },
  },
  methods: {
    getDetails() {
      fetch(`${UtileriasCls.myAppUrl()}apimain/usuariosTurnos/${this.employDetail.userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      }).then((res) => res.json())
        .then((data) => {
          this.details = data as employee[];
        }).catch((res) => {
          console.log(res);
        });
      this.$emit('onDetails', this.employDetail);
    },
  },
});

</script>
