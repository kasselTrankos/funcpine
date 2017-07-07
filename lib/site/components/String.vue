<style>
  .founded{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .elm{
    cursor: pointer;
    background-color: tomato;
    color: white;
    font-weight: bold;
    text-align: center;
  }
  .elm:hover{
    background-color: red;
  }
</style>

<template>
  <div class="row founded">
    <p class="elm" v-for="(el, key, index) in path">{{ getStr(el, index) }}</p>
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
  props:{
    path:{
      type: Array,
      required: true
    }
  }
}
</script>