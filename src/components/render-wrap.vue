<template>
  <anchored-heading :level="1">
    <div class="cc">
      <span class="dsd">Hello world!</span>
      <span class="dsd">ds!</span>
      <span class="dsd">ssd!</span>
    </div>
  </anchored-heading>
</template>
<script>
  import anchoredHeading from './render.vue'

  export default {

    components: {
      anchoredHeading
    },
    data() {
      return {
        testText: '',
        name: '',
        id: '',
        m: 400,
        op: [],
        bc: ''
      }
    },
    created() {

    },
    methods: {
      idCheck(value) {
        let {pass, tip} = this.IdentityCodeValid(value)
        console.log('tip = ', tip)
        if (pass) {
          return {valid: true}
        } else {
          return {valid: false, msg: tip}
        }
      }
    }

  }
</script>
<style>
  .vux-popup-dialog {
    max-height: 60%;
  }
</style>
