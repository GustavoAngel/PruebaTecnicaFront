<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
      En esta version de la prueba tecnica se hace uso de las siguiente tecnologias.
    </p>
    <div class="subStack-container">
      <ul class="Stack-ul">
        <li>Mondb      -- Base de datos</li>
        <li>Express.js -- Node.js web framework</li>
        <li>Vue.js     -- js framework</li>
        <li>Node.js    -- Backend</li>
        <li>Typescript -- Backend</li>
      </ul>
    </div>
    </div>
  </template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      msg: String,
    },
  })
export default class HelloWorld extends Vue {
    msg!: string
}
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  .Stack-ul{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  .subStack-container{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
