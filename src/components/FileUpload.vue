<template>
    <div class="row">
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
//Imports modules for this component read y send xlsx to server 
import readXlsxFile from 'read-excel-file';
import employee from '../model/employeeTurn';
import propsServer from '@/model/propsServer';

export default {
    data() {
        return {
            textSearch: "BROWSE",
            turnsPreview: []
        };
    },
    methods: {
        newUpload(e) {
            //Reference to object DOM 
            const input = e.target;
            //Reference for this scope, to be able to access it in another thread
            const thisRef = this;
            //Read xlsx async
            readXlsxFile(input.files[0]).then(function (data) {
                //Resert array
                thisRef.turnsPreview = [];
                //read xlxs and parse object local js
                for (let i = 1; i < data.length; i++) {
                    //Created item 
                    let element = new employee(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]);
                    //add this item to array 
                    thisRef.turnsPreview.push(element);
                }
                //Show status file in front user
                thisRef.$toast.info(`File upload preview`,{
                                                position:"top-right",
                                                duration:1750,
                                                max:1
                                                }); 
            });
        },
        sendInfo() {
            //Reference for this scope, to be able to access it in another thread
            const thisRef=this;
            //Request api 
            fetch(propsServer.urlApi+"apimain", {
                //Type of request
                method: "POST",
                //Content of request 
                body: JSON.stringify(this.turnsPreview),
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }).then(function () {
                //Show status file in front user
                thisRef.$toast.success(`File sent successfully!!!`,{
                                                position:"top-right",
                                                duration:1750,
                                                max:1
                                                }); 
            }).catch(function () {
                   //Show status file in front user
                   thisRef.$toast.error(`Server not available, please try again later.`,{
                                                position:"top-right",
                                                duration:1750,
                                                max:1
                                                }); 
            });
               
            //Reset arrray
            this.turnsPreview = [];
            //Reset control input file in  screen 
            document.getElementById('file-input').value='';
        }
    },
    computed: {
        itemsComputados() {
                //Array  for items display in screen
                let items= [];
                //Validate what turnsPreview have minimun 1 item
                if (this.turnsPreview.length>0) {
                    //Process data and formated for display
                    items= this.turnsPreview.map(function (i) {
                    //Format yyyy-MM-dd
                    i.dateFormat= i.date.toLocaleDateString('en-CA');
                    // Aux variable for formated data
                    let timeAuxIn=new Date(i.PunchIn).toLocaleTimeString();
                    //Validate for correct format 
                    if (timeAuxIn.split(':')[0].length===1) {
                        timeAuxIn= 0+timeAuxIn;
                    }
                    // Aux variable for formated data
                    let timeAuxOut=new Date(i.PunchOut).toLocaleTimeString();
                    //Validate for correct format 
                    if (timeAuxOut.split(':')[0].length===1) {
                        timeAuxOut= 0+timeAuxOut;
                    }
                    //New format time
                    i.PunchInFormat = timeAuxIn;
                    //New format time
                    i.PunchOutFormat = timeAuxOut;
                    //Retunr new item with format friendly
                    return i;
                });
                }
                //Return new Items with format friendly
                return items;
        }
    }
}
</script>

<style scoped>
    .buttonLocal{
        height: 35px;
        width: 150px;
        margin: 5px 20px;
    }

    #file-input{
        margin: 5px 20px;
    }
    

</style>