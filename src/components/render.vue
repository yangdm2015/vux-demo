<script>
  import { applicantDefault } from '@/static-data/init-data'
  import { inputFieldSetting } from '@/static-data/fields-setting'
  import clone from '@/utils/clone'
  import { Group, XInput, Cell, PopupRadio } from 'vux'
  function has (arr, item) {
    return arr.indexOf(item) > -1
  }
  function hasKey (obj, key) {
    return has(Object.keys(obj), key)
  }

  function getProp (obj, propName) {
    let arr = []

    function _getProp (obj, propName) {
      let flag = false
      let prop = null
      if (typeof obj === 'object') {
        if (hasKey(obj, propName)) {
          arr.push(propName)
          flag = true
          prop = obj[propName]
        } else {
          let a = Object.keys(obj)
          for (let i = 0, len = a.length; i < len; i++) {
            let key = a[i]
            let item = obj[key]
            arr.push(key)
            console.log('item = ', item)
            if (_getProp(item, propName).flag) {
              flag = true
              prop = item[propName]
              break
            }
            arr.pop()
          }
        }
      }
      return {flag, prop}
    }

    let result = _getProp(obj, propName)
    return {...result, arr}
  }

  let a = {d: {}, e: 2, b: {c: 1}}
  let result = getProp(a, "c")
  console.log('getProp(a,"c") = ', result)
  function getHandler (obj, arr) {
    return obj[arr[0]]
  }

  let handler = getHandler(a, result.arr)
  console.log('handler = ', handler)
  handler.a = 5
  console.log('handler = ', handler)
  console.log('a = ', a)
  //  a['b']['c'] = 6
  //  console.log('a = ', a)
  export default {
    render: function (createElement) {
      let self = this
      return createElement(
        'group',
        [
          createElement('x-' + inputFieldSetting[0].type, {
            attrs: {
              title: this.title,
            },
            props: {
              value: this.inputModel1,
              required: true
            },
            on: {
              input: function (event) {
                self.inputModel1 = event
              }
            }
          }),
          createElement('span', {}, this.inputModel1),
          createElement('x-input', {
            attrs: {
              title: this.title,

            },
            props: {
              value: this.inputModel2,
              required: null,
            },
            on: {
              input: function (event) {
                self.inputModel2 = event
              }
            }
          }),
          createElement('span', {}, this.inputModel2),
        ]
      )
    },
    components: {
      Group,
      XInput, Cell, PopupRadio
    },
    data(){
      return {
        title: '测试输入框',
        inputModel1: '输入1',
        inputModel2: '输入2',
        applicant: clone(applicantDefault)
      }
    },
    created(){

    },
    methods: {
      idCheck(value){
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
