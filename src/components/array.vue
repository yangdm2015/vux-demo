<template>
  <div>
    <ul>
      <li v-for="i in a">{{i.value}}</li>
    </ul>
    <span @click="test">test</span>
  </div>
</template>

<script>
  import { Group, XInput, Cell, PopupRadio } from 'vux'

  export default {
    components: {
      Group,
      XInput, Cell, PopupRadio
    },
    data () {
      return {
        a: []
      }
    },
    created(){
      this.a = [
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

    },
    methods: {
      test () {
        this.a = [{value: 'ee', key: '301'},
          {value: 'ss', key: '302'},
          {value: 'rr', key: '307'},
          {value: 'dd', key: '306'},]
      }
    }

  }
</script>
<style>
  .vux-popup-dialog {
    max-height: 60%;
  }
</style>
