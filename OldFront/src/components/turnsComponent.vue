<template>
    <div class="jumbtron">
    <h2 class="display-4 text-center">Technical test 2</h2>
    <hr>
    <div class="row">
        <div class="col-md-5">
            <TurnDetaill id="TurnDetaillC" v-bind:recordEdit="recordEdit" v-on:newTurnAdded="newTurnAdded" ></TurnDetaill>
        </div>
        <div class="col-md-7">
            <TurnList ref="componente" v-on:updatedItem="updatedItem" ></TurnList>
        </div>
    </div>
</div>
</template>

<script>
import TurnDetaill from './turnDetaill.vue';
import TurnList from './turnsList.vue';
import employee from '../model/employeeTurn';

export default {
    data() {
        return {
            recordEdit: new employee()
        };
    },
    methods:{
        newTurnAdded(){
            this.$refs.componente.getTurns();
        },
        updatedItem(item,i)
        {
            const itemLocal=JSON.parse(JSON.stringify(item));
            this.recordEdit= itemLocal;
            this.recordEdit.idRecord= i;
        }
    },
    components: { TurnDetaill,TurnList }
}
</script>