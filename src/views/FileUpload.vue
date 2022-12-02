<template>
    <div class="upload-main-div">
      <h1>File upload</h1>
<label for="file-input" class="label-input">
            <span>Subir archivo</span>
            <input type="file" accept=".xlsx"
            v-on:change="newUpload"
            class="form-control"  id="file-input"/>
      </label>
        <button class="primary-button Send-info-button"
        v-on:click="sendInfo" v-on:keydown="sendInfo">
        Enviar info</button>
        <div class="table-div">
            <h5 class="preview-title">Preview</h5>
            <table class="table" >
            <thead>
                <tr class="head-tr">
                    <th scope="col">User id</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Punch In</th>
                    <th scope="col">Punch Out</th>
                </tr>
            </thead>
            <tbody>
                <tr class="body-tr" v-for="(item,i) in turnsPreview" v-bind:key="i">
                <td>{{item.userId}}</td>
                <td>{{item.userNme}}</td>
                <td>{{item.date.toLocaleDateString()}}</td>
                <td>{{item.PunchIn.toTimeString().substring(0,8)}}</td>
                <td>{{item.PunchOut.toTimeString().substring(0,8)}}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import readXlsxFile from 'read-excel-file';

import Employee from '../model/employee';

import UtileriasCls from '../model/utilerias';

let turnsPreviewlocale: Employee[];

export default defineComponent({
  data() {
    return {
      turnsPreview: [] as any,
      mensaje: 'hola msj',
    };
  },
  methods: {
    newUpload(e: { target: any; }) {
      //  Reference to object DOM
      const input = e.target;
      //  Reference for this scope, to be able to access it in another thread
      //    const thisRef = this;
      //    Read xlsx async
      readXlsxFile(input.files[0]).then((data) => {
        //  Resert array
        this.turnsPreview = [];
        //  read xlxs and parse object local js
        for (let i = 1; i < data.length; i += 1) {
          //  Created item
          const element = new Employee(
            data[i][0].toString(),
            data[i][1].toString(),
            new Date(data[i][2].toString()),
            new Date(data[i][3].toString()),
            new Date(data[i][4].toString()),
          );
          this.turnsPreview.push(element);
          //    add this item to array
          //    this.turnsPreview.push(element);
        }
        //  this.turnsPreview.push(json Element);
        //  console.log(element);
        //  Show status file in front user
        //  thisRef.$toast.info(`File upload preview`,{
        //                                 position:"top-right",
        //                                 duration:1750,
        //                                 max:1
        //                                 });
      });
    },
    sendInfo() {
      //  Request api
      fetch(`${UtileriasCls.myAppUrl()}apimain`, {
        //  Type of request
        method: 'POST',
        //  Content of request
        body: JSON.stringify(this.turnsPreview),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      }).then(() => {
        console.log('enviado');
      }).catch(() => {
        console.log('error');
      });
      //  Reset arrray
      this.turnsPreview = [];
    },
  },
  computed: {
    itemFormateado(): Employee[] {
      return turnsPreviewlocale;
    },
  },
});
</script>

<style>

.Send-info-button{
    margin-top: 12px;
    margin-bottom: 12px;
}

.label-input{
        display: flex;
        flex-direction: column;
        margin-bottom: 4px;
        text-align: start;
    }
.label-input span{
    display: flex;
    flex-direction: row;
}
.table{
    width: 80%;
    border-collapse:collapse;
}
.table-div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.preview-title{
    margin-bottom: 12px;
}
.head-tr{
    height: 35px;
    background-color: #00C9B8;
    color: white;
}
.body-tr{
    border-bottom: 1.6px solid rgb(139, 139, 139);
}
</style>
