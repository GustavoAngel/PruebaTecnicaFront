<template>
    <div class="row">
            <!-- <label for="file-input" class="btn btn-danger buttonLocal float-right"  >{{textSearch}}</label> -->
            <input type="file" accept=".xlsx"  class="form-control" v-on:change="newUpload" id="file-input"/>
            <button v-on:click="sendInfo" v-if="turnsPreview.length>0" class="btn btn-danger buttonLocal float-right"> Send info</button>
        
         <h5>Preview</h5>
         <table id="tbl-data" class="table table-striped"> 
            <thead>
                <tr>
                    <th scope="col">User id</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Punch In</th>
                    <th scope="col">Punch Out</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in itemsComputados" v-bind:key="i" >
                <td>{{item.userId}}</td>
                <td>{{item.userNme}}</td>
                <td>{{item.dateFormat}}</td>
                <td>{{item.PunchInFormat}}</td>
                <td>{{item.PunchOutFormat}}</td>
                </tr>
            </tbody>
         </table>
    </div>
</template>

<script>

import readXlsxFile from 'read-excel-file';
import employee from '../model/employeeTurn';


export default {
    data() {
        return {
            textSearch: "BROWSE",
            turnsPreview: []
        };
    },
    methods: {
        newUpload(e) {
            const input = e.target;
            const s = this;
            readXlsxFile(input.files[0]).then(function (data) {
                s.turnsPreview = [];
                for (let i = 1; i < data.length; i++) {
                    let element = new employee(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]);
                    s.turnsPreview.push(element);
                }
            });
        },
        sendInfo() {
            const thisRef=this;
            fetch("http://localhost:3000/apimain/", {
                method: "POST",
                body: JSON.stringify(this.turnsPreview),
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }).then(function () {
                thisRef.$toast.success(`File sent successfully!!!`,{
                                                position:"top-right",
                                                duration:1750,
                                                max:1
                                                }); 
            });
            
            this.turnsPreview = [];
            document.getElementById('file-input').value='';
        }
    },
    computed: {
        itemsComputados() {
            let items= [];
                if (this.turnsPreview.length>0) {
                    items= this.turnsPreview.map(function (i) {
                    i.dateFormat= i.date.toLocaleDateString();
                    let timeAuxIn=new Date(i.PunchIn).toLocaleTimeString();
                    if (timeAuxIn.split(':')[0].length===1) {
                        timeAuxIn= 0+timeAuxIn;
                    }

                    let timeAuxOut=new Date(i.PunchOut).toLocaleTimeString();
                    if (timeAuxOut.split(':')[0].length===1) {
                        timeAuxOut= 0+timeAuxOut;
                    }
                    i.PunchInFormat = timeAuxIn;
                    i.PunchOutFormat = timeAuxOut;
                    return i;
                });
                }
                return items;
        }
    },
    components: {  }
}

</script>

<style scoped>
    .buttonLocal{
        height: 35px;
        width: 150px;
        margin: 15px;
    }

</style>