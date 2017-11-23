<template>

</template>
<script>
  export default {
    name: '',
    props: ['value'],
    data() {
      return {}
    },
    watch: {
      value(v){
//        debugger
        this.$emit('input', v)
      }
    },
    created(){
//      debugger
      this.$emit('input', this.value)
//      console.log('autofill created')
    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
