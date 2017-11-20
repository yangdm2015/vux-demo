<template>
  <div>
    <group v-html="ipt">

    </group>
    <span @click="test">text</span>
  </div>
</template>

<script>
  import { Group, XInput, Cell, PopupRadio, Calendar } from 'vux'
  export default {
    components: {
      Group,
      XInput, Cell, PopupRadio, Calendar
    },
    data () {
      return {
        testText: 0,
        name: '',
        id: '',
        m: 400,
        op: [],
        bc: '',
        mn: null,
        demo1: '',
        ipt: ''
      }
    },
    created() {
      this.ipt = `<x-input ref="mb"
               title="正数"
               type="number"
               required
               v-model="mn">
      </x-input>`
      this.op = [
        {value: '工商银行', key: '102'},
        {value: '农业银行', key: '103'},
        {value: '中国银行', key: '104'},
        {value: '建设银行', key: '105'},
        {value: '交通银行', key: '301'},
        {value: '中信银行', key: '302'},
        {value: '平安银行', key: '307'},
        {value: '广发银行', key: '306'},
        {value: '兴业银行', key: '309'},
        {value: '光大银行', key: '303'},
        {value: '浦发银行', key: '310'},
        {value: '民生银行', key: '305'},
        {value: '上海银行', key: '401'},
        {value: '华夏银行', key: '304'},
        {value: '邮储银行', key: '100'},
      ];
//      this.mn = 0
    },
    methods: {
      test() {
        let v = this.$refs.mb
        console.log('v = ', v)
      }
    }
  }
</script>
<style>
  .vux-popup-dialog {
    max-height: 60%;
  }
</style>
