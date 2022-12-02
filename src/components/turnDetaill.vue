<template>
       <div class="row" style="margin: 20px;">

                <label for="userIdInput"  >User id:
                    <input type="text" id="userIdInput" class="form-control" placeholder="Enter User Id" v-model="recordLocal.userId"  />                
                </label>
                <label for="UserNameInput" >User Name:
                    <input type="text" id="UserNameInput" class="form-control" placeholder="Enter User Name" v-model="recordLocal.userNme"/>
                </label>

                <label>Date:
                    <input type="date" class="form-control" v-model="recordLocal.date"/>  
                </label> 
                <label>Punch in:
                    <input type="time" class="form-control" id="inTime" v-model="recordLocal.PunchIn"/> 
                </label> 

                <label >Punch out:
                    <input type="time" class="form-control" v-model="recordLocal.PunchOut"/>
                </label> 
                <button class="btn btn-danger float-end" v-on:click="saveRecord" >
                    <div v-if="!recordLocal.idRecord">        
                        Save
                    </div>
                    <div v-else-if="recordLocal.idRecord">        
                        Update record
                    </div>
                </button>      
                <button class="btn btn-danger float-end" v-if="recordLocal.idRecord" v-on:click="recordLocal=''" >
                    Cancel update
                </button>
            </div>
</template>

<script>    

    import employee from '../model/employeeTurn'
    import propsServer from '@/model/propsServer';
    //Export default VUE structure for this app
    export default {
        data(){
            return {
                recordLocal: new employee(),
                idRecord:'',
                errors:[]
            }
        },
        methods:{
            checkForm()
            {
                //Array to save errors validation user. reset
                this.errors=[];
                //Validate userId
                if (this.recordLocal.userId===undefined || this.recordLocal.userId.trim()==='' ) {
                    this.errors.push('User id Required');
                }
                //Validate userNme
                if (this.recordLocal.userNme===undefined || this.recordLocal.userNme.trim()==='' ) {
                    this.errors.push('User name Required');
                }
                //Validate date
                if (this.recordLocal.date===undefined || this.recordLocal.PunchOut.trim()==='' ) {
                    this.errors.push('date of turn Required');
                }
                //Validate PunchIn
                if (this.recordLocal.PunchIn===undefined || this.recordLocal.PunchOut.trim()==='' ) {
                    this.errors.push('Punch in Required');
                }
                //Validate PunchOut
                if (this.recordLocal.PunchOut===undefined || this.recordLocal.PunchOut.trim()==='' ) {
                    this.errors.push('Punch out Required');
                }
                //Message for user
                let userMessage=''
                this.errors.forEach(element => {
                    userMessage +='\n-'+element;
                });
                const pass = this.errors.length===0;
                
                if (!pass) {
                    alert('Please check the followind data'+userMessage);    
                }

                return pass;
            },
            saveRecord(){
                if (this.checkForm()) {
                    //Reference this scope
                    const thisRef=this;
                    if (!this.recordLocal.idRecord) {
                        fetch(propsServer.urlApi+"apimain",{
                        method:'POST',
                        body: JSON.stringify([this.recordLocal]),
                        headers:{
                            'Accept':'application/json',
                            'Content-type':'application/json'
                        }
                        }).then(function () {
                            thisRef.$emit('newTurnAdded'); 
                            thisRef.$toast.info(`Record updated!!!`,{
                                                position:"top-right",
                                                duration:1750,
                                                max:1
                                                });   
                            thisRef.recordLocal=new employee();                
                        }).catch(function () {
                            //Show status file in front user
                            thisRef.$toast.error(`Server not available, please try again later.`,{
                                                                position:"top-right",
                                                                duration:1750,
                                                                max:1
                                                                }); 
                        });
                    }
                    else
                    {
                        fetch(propsServer.urlApi+"apimain/"+this.recordLocal.idRecord,{
                        method:'PUT',
                        body: JSON.stringify([this.recordLocal]),
                        headers:{
                            'Accept':'application/json',
                            'Content-type':'application/json'
                        }
                        }).then(function () {
                            thisRef.$emit('newTurnAdded');   
                            thisRef.$toast.info(`Record updated!!!`,{
                                                position:"top-right",
                                                duration:1750,
                                                max:1
                                                });     
                            thisRef.recordLocal=new employee();                
                        }).catch(function () {
                            //Show status file in front user
                            thisRef.$toast.error(`Server not available, please try again later.`,{
                                                                position:"top-right",
                                                                duration:1750,
                                                                max:1
                                                                }); 
                        });
                    }

                }
                               
            }
        },
        props: ["recordEdit"]
        ,watch:{
            recordEdit(itemEdit)
            {
                const itemLocal=JSON.parse(JSON.stringify(itemEdit));
                this.recordLocal =itemLocal;
                this.recordLocal.date = itemLocal.date.substring(0,10);
                let timeAuxIn=new Date(itemLocal.PunchIn).toLocaleTimeString();
                if (timeAuxIn.split(':')[0].length===1) {
                    timeAuxIn= 0+timeAuxIn;
                }

                let timeAuxOut=new Date(itemLocal.PunchOut).toLocaleTimeString();
                if (timeAuxOut.split(':')[0].length===1) {
                    timeAuxOut= 0+timeAuxOut;
                }
                this.recordLocal.PunchIn = timeAuxIn;
                this.recordLocal.PunchOut = timeAuxOut;
            },
            idRecord(){

            }
        }
    }
</script>

<style>
    button{
        margin: 5px;
    }
    label{
        text-align: left;
        margin-bottom: 12px;
    }
</style>