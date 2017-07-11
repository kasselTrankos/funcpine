<style>
  .founded{
    margin: 10px 0;
    text-align: center;
    display:inline-block;
    width: 100%;

  }

  .each, .elm{
    float: none;
    display:inline-block;
    text-align: left;
    width: auto;
    text-align:left;
    margin:0 auto;
    display: inline-block;
    padding: 0px;
    cursor: pointer;
    font: 12px Verdana;
    /*background-color: #CDE897;*/
    color: #597F7B;
    font-weight: bold;

  }
 .each {
    padding-left: 15px;

  }
  .each:after {
    content: ", ";
  }
  .each:last-child:after {
    content: "";
  }
  .elm:active, .elm:hover{
    background-color:#F1DDFF;
  }
  .elm:hover{
    color: #363C7F;
  }
</style>

<template>
  <div class="row founded">
    <div class="each"  v-for="(item, k, i) in path">
      <p class="col-md-12 elm"  v-for="(el, key, index) in item" v-on:mouseover ="overHandler(el, key, k)"  v-on:mouseout ="outHandler()" >{{ getStr(el, key) }}</p>
    </div>
  </div>

</template>

<script type="text/babel">
module.exports = {
  mounted(){
  },
  methods:{
    overHandler(e, index, preindex){
      this.$emit('clickStr', {id: index, parent: preindex});
    },
    outHandler(){
      this.$emit('clickStr', {});
    },
    ///move soon at pine.js
    getStr(value, index){
      if(index==0) {
        if(value.type=='Object')  return value.str
        else return `[${value.str}]`;
      }else{
        if(value.type=='Array') return `[${value.str}]`;
        else return `.${value.str}`;
      }
      
    }
  },
  watch:{
    'path': (oldval, newval)=>{
      // console.log(oldval, newval, 'STRING IS');
    }
  },
  props:{
    path:{
      type: Array,
      required: true
    }
  }
}
</script>