<template>
    <div >
        <table id="tbl-data" class="table table-striped"> 
            <thead>
                <tr>
                    <th scope="col">User id</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Punch In</th>
                    <th scope="col">Punch Out</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in itemsComputados" v-bind:key="i" >
                    <td>{{item.userId}}</td>
                    <td>{{item.userNme}}</td>
                    <td>{{item.dateFormat}}</td>
                    <td>{{item.PunchInFormat}}</td>
                    <td>{{item.PunchOutFormat}}</td>
                    <td><i class="far fa-edit fa-lg text-info" v-on:click="updatedItem(item,item._id)" style="cursor: pointer;"></i></td>
                    <td><i class="far fa-trash-alt fa-lg text-danger" v-on:click="deleteItem(item._id,i)"  style="cursor: pointer;"></i></td>
                </tr>
            </tbody>
         </table>
    </div>
</template>
<script>
import propsServer from '@/model/propsServer';

 export default {
        data(){
            return {
                turnsPreview:[]
            }
        },
        created(){
            this.getTurns()
        },
        methods:{
            getTurns(){
                // eslint-disable-next-line
                fetch(propsServer.urlApi+"apimain/").then(res=> res.json()).then(data=> {this.turnsPreview=data; });;
            },
            deleteItem(item,i){
                //Confirm with the user action
                if (confirm('¿Seguro que deseas eliminar el registro?')) {
                    
                    fetch(propsServer.urlApi+"apimain/"+item,{
                    method:'DELETE',
                    body: JSON.stringify([this.recordLocal]),
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    }
                    });

                    this.turnsPreview.splice(i,1);    
                }                
            },
            updatedItem(item,_id){
                this.$emit('updatedItem',item,_id);                    
            }        
        },computed:{
            itemsComputados() {
                let items= [];
                if (this.turnsPreview.length>0) {
                    items= this.turnsPreview.map(function (i) {
                    i.dateFormat= i.date.substring(0,10)
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
        props: {
       
        }
    }
</script>