<template>
  <div>
    <group>
      <x-input ref="mb"
               title="正数"
               type="number"
               required
               v-model="mn">
        <!--<img slot="right" class="weui-vcode-img" src="https://i.loli.net/2017/09/18/59bf7f32425d5.jpg">-->
        <span slot="right">万元</span>
      </x-input>
      <!--<x-input is-type="china-mobile"-->
      <!--title="手机号码格式化"-->
      <!--v-model="testText"-->
      <!--mask="999 9999 9999"-->
      <!--:max="13">-->
      <!--</x-input>-->
      <!--<x-input is-type="china-name"-->
      <!--title="中国人名"-->
      <!--v-model="name"-->
      <!--:max="13">-->
      <!--</x-input>-->
      <!--<calendar v-model="demo1"-->
      <!--title="demo1"-->
      <!--disable-past-->
      <!--placeholder="placeholder">-->
      <!--</calendar>-->
      <popup-radio title='开户银行'
                   :options="op"
                   v-model="bc"
                   ref="bank[0]"
                   :readonly="false">
      </popup-radio>
      <x-button type="primary"
                @click.native="test">
        测试按钮
      </x-button>
      <!--<popup-radio title="options" :options="options1" v-model="option1"></popup-radio>-->

    </group>
    <span @click="fuzhi">fuzhi</span>
    <span @click="test">text</span>
    <span @click="ptime">ptime</span>
  </div>
</template>

<script>
  import { Group, XInput, PopupRadio, Calendar, XButton } from 'vux'
  function calendarFormat (value, type) {
    console.log('calendarFormat ', value)
    let deal = value.split('T')[0]
    console.log('deal = ', deal)
    return value
  };
  function positiveNumbeVerify (value) {
    console.log('!!!!!!!positiveNumbeVerify ', value)
    console.log('typeof value = ', typeof value)
    if (typeof +value === 'number') {

      let tmp = {valid: +value > 0}
      if (!tmp.valid) {
        tmp.msg = '请输入正数'
      }
      return tmp
    } else {
      return {valid: true}
    }
  }
  export default {
    components: {
      Group, XButton,
      XInput, PopupRadio, Calendar
    },
    data () {
      return {
        option1: '',
        options1: ['A', 'B', 'C'],
        testText: 0,
        name: '',
        id: '',
        m: 400,
        op: [],
        bc: '',
        mn: null,
        demo1: ''
      }
    },
    created(){
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
      ptime(){
        console.log('demo1 = ', this.demo1)
      },
      positiveNumbeVerify, calendarFormat,
      fuzhi(){
        console.log('this.$refs = ', this.$refs)
        this.mn = 0
      },
      test() {
        let v = this.$refs.mb
        console.log('v = ', v)
      },
      idCheck (value) {
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
