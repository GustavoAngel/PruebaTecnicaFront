<template>
    <div class="container">
        <h1>Registrar turno</h1>
        <div class="form">
            <div>
                <label for="userId" class="label-input">User Id:
                    <input type="text" id="userId" v-model="registro.userId"
                    class="input-control">
                </label>
                <label for="userName" class="label-input">User Name:
                    <input type="text" id="userName" v-model="registro.userNme"
                    placeholder="Escribir nombre de usuario"
                    class="input-control">
                </label>
                <label for="userDate" class="label-input">Fecha:
                    <input type="date" id="userDate"  v-model="registro.date"
                    class="input-control">
                </label>
                <label for="userTimeIn" class="label-input">Hora de entrada:
                    <input type="time" id="userTimeIn" v-model="registro.PunchIn"
                    class="input-control">
                </label>
                <label for="userTimeOut" class="label-input">Hora de salida:
                    <input type="time" id="userTimeOut" v-model="registro.PunchOut"
                    class="input-control">
                </label>
                <button class="primary-button"
                v-on:click="saveRecord" v-if="!isEdit" >Registrar</button>
                <button class="primary-button" v-if="isEdit"
                v-on:click="editRecord" >Guardar cambios</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Employee from '../model/employee';

import UtileriasCls from '../model/utilerias';

export default defineComponent({
  data() {
    return {
      registro: new Employee(),
      isEdit: false,
      idedit: String,
    };
  },
  created() {
    this.isEditComponent(this.$route.query.id);
  },
  methods: {
    checkForm() {
      if (this.registro.userId.trim() === '' || this.registro.userNme.trim() === '' || this.registro.date === '') {
        window.alert('Datos incompletos.');
        return false;
      }
      return true;
    },
    saveRecord() {
      if (!this.checkForm()) {
        return;
      }
      fetch(`${UtileriasCls.myAppUrl()}apimain/`, {
        method: 'POST',
        body: JSON.stringify([this.registro]),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      }).then((e) => {
        this.registro = new Employee();
        window.alert('Registro guardado con exito.');
      }).catch(() => {
        //  Show status file in front user
        alert('Error en el server');
      });
    },
    editRecord() {
      if (!this.checkForm()) {
        return;
      }
      fetch(`${UtileriasCls.myAppUrl()}apimain/${this.idedit}`, {
        method: 'PUT',
        body: JSON.stringify([this.registro]),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      }).then(() => {
        this.registro = new Employee();
        this.isEdit = false;
        window.alert('Registro actualizado con exito.');
      }).catch(() => {
        window.alert('Server no disponible.');
      });
    },
    isEditComponent(id:any) {
      if (id !== null && id !== undefined) {
        this.isEdit = true;
        this.idedit = id;
        fetch(`${UtileriasCls.myAppUrl()}apimain/GetTurno/${id}`, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }).then((res) => res.json()).then((data) => {
          const recordLocal = data as Employee;
          recordLocal.date = (recordLocal.date as Date).toString().substring(0, 10);
          const ddd = new Date(recordLocal.PunchIn).toISOString().split('T')[1].substring(0, 5);
          recordLocal.PunchIn = ddd.split(':')[0].length < 2 ? `0${ddd}` : ddd;
          const timeAux = new Date(recordLocal.PunchOut).toISOString().split('T')[1].substring(0, 5);
          recordLocal.PunchOut = timeAux.split(':')[0].length < 2 ? `0${timeAux}` : timeAux;
          this.registro = recordLocal;
        }).catch((res) => {
          console.log(res);
          window.alert('Servidor no disponible');
        });
      }
    },
  },
});
</script>
<style>
--root{
    --lg: 1rem;
}
.inactive{
    display: none;
}
h1{
    color: black;
}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-self: center;
}
.form div{
    display: flex;
    width: 600px;
    flex-direction: column;
    align-self: center;
}
.label-input{
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
    text-align: start;
}
.label-input input{
    min-width: 250px;
    width: 100%;
    max-width: 600px;
    height: 24px;
    margin-bottom: 12px;
    align-self: center;
}
.primary-button{
    border-radius: 8px;
    align-self: flex-end;
    border: 0;
    height: 30px;
    width: 150px;
    color: white;
    background-color: #00c9b8;
    cursor: pointer;
}
.primary-button:hover{
    background-color: #008d81;
}

@media (max-width:640px) {
    .primary-button{
        width: 100%;
        font-weight: bold;
        font-size: var(--lg);
    }
    .form div{
        margin-left: 24px;
        margin-right: 24px;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-self: center;
    }
}
</style>
<style src="../styles/add-view-style.css"></style>
