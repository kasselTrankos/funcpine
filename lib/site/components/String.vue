<style>
  .founded{
    text-align: center;
    display:inline-block;
    width: 100%;

  }
  .elm{
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
  .elm:hover{
    color: #363C7F;
  }
</style>

<template>
  <div class="row founded">
    <p class="col-md-12 elm" v-for="(el, key, index) in path">{{ getStr(el, index) }}</p>
  </div>

</template>

<script type="text/babel">
module.exports = {
  mounted(){


  },
  methods:{
    getStr(value, index){
      if(index==0) {
        if(value.type=='Object')  return value.str
          return `[${value.str}]`;
      }
      if(value.type=='Array') return `[${value.str}]`;
      return `.${value.str}`;
    }
  },
  watch:{
    'path': (oldval, newval)=>{
      console.log(oldval, newval, 'STRING IS');
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