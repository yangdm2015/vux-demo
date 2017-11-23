<template>
  <div>
    <divider>{{applicantLabel[propName]}}</divider>
    <!--value = {{value}}-->
    <!--<divider>{{propName}}{{cascadeNumber}}{{optionsName}}</divider>-->
    <group>
      <!--<template v-for="i in cascadeNumber">-->
      <popup-radio :title="cascadeName[0]" :placeholder="placeHolder[0]"
                   :options="options1"
                   v-model="option1"
                   @on-change="chg1"
                   v-if="cascade[0]">
      </popup-radio>
      <popup-radio :title="cascadeName[1]" :placeholder="placeHolder[1]"
                   :options="options2"
                   v-model="option2"
                   @on-change="chg2"
                   v-if="cascade[1]">
      </popup-radio>
      <popup-radio :title="cascadeName[2]" :placeholder="placeHolder[2]"
                   :options="options3"
                   v-model="option3"
                   @on-change="chg3"
                   v-if="cascade[2]">
      </popup-radio>
      <popup-radio :title="cascadeName[3]" :placeholder="placeHolder[3]"
                   :options="options4"
                   v-model="option4"
                   @on-change="chg4"
                   v-if="cascade[3]">
      </popup-radio>
      <!--<div @click="test">测试</div>-->
      <!--{{cascade}}{{cascadeNumber}}{{this.options1[0].value}}-->
    </group>
  </div>
</template>
<script>
  import { XButton, XInput, Group, PopupRadio, Divider } from 'vux'
  import * as options from '../../static-data/options'
  import { codeNameArray } from '../../utils/input-field-dealing-functions'
  import clone from '../../utils/clone'


  export default {
    name: '',
    data() {
      return {
        title: 'applicant',
        options: {},
        options1: [],
        option1: '',
        options2: [],
        option2: '',
        options3: [],
        option3: '',
        options4: [],
        option4: '',
        applicantLabel: clone(options.applicantLabel),
        cascade: [true, true, true, true, true],
        placeHolder: ['请选择', '请选择', '请选择', '请选择'],
        optionType: ''
      }
    },
    computed: {
      codeArray() {
        return [this.option1, this.option2, this.option3, this.option4]
      }
    },
    props: ['optionsName', 'value', 'cascadeNumber', 'propName', 'cascadeName'],
    created() {
//      console.log('********  cascade ' + this.propName + ' created!  ********')
//      console.log('this.cascadeNumber = ', this.cascadeNumber)
//      this.cascade = clone([true, true, true, true, true].slice(0, this.cascadeNumber))
//        this.cascade.pop()
//      this.$set(this, 'cascade', this.cascade.slice(0, this.cascadeNumber))
      this.cascade = this.cascade.slice(0, this.cascadeNumber)
      this.placeHolder = this.placeHolder.slice(0, this.cascadeNumber)
//      this.codeArray = this.codeArray.slice(0, this.cascadeNumber)
//      console.log('this.optionsName = ', this.optionsName)
//      console.log('this.cascadeNumber = ', this.cascadeNumber)
      this.options = clone(options[this.optionsName])
//      console.log('propName = ', this.propName)
//      console.log('optionsName = ', this.optionsName)
//      console.log('options = ', this.options)
      this.options1 = this.options.map(item => ({ key: item.value, value: item.label, children: item.children }))
//      console.log('propName = ', this.propName)
//      console.log('options1 = ', this.options1)
//      console.log('#########  cascade ' + this.propName + ' create  end!  #########')
//      this.initPlaceholder()
//      this.test()
//      console.log('value = ', this.value)
      this.initPlaceholder()
    },
    beforeDestory() {
      console.log('beforeDestory')
    },
    watch: {
      value(n, o) {
//        console.log(' in cascade, value = ', n)
//        console.log('typeof nvalue = ', typeof n, '  and nvalue = ', n)
//        if (typeof n === 'string') {
//          console.log('initPlaceholder in1ß!')
        this.initPlaceholder()
//        }
      },
      option1(n, o) {
//        console.log('option1 changed ')
        if (this.cascadeNumber === 1) {
          this.emit()
        }
      },
      option2(n, o) {
//        console.log('option2 changed ')
        if (this.cascadeNumber === 2) {
          this.emit()
        }
      },
      option3(n, o) {
//        console.log('option3 changed ')
        if (this.cascadeNumber === 3) {
          this.emit()
        }
      },
      option4(n, o) {
//        console.log('option4 changed ')
        if (this.cascadeNumber === 4) {
          this.emit()
        }
      },
    },
    methods: {
      test() {
//        console.log('this.propName = ', this.propName)
//        console.log('this.value = ', this.value)
        this.option2 = null
      },
      initPlaceholder() {

        if (this.value && typeof this.value === 'string') {
          let keys = this.value.split(',')
//          console.log(' in cascade, keys = ', keys)
          keys[0] = keys[0].slice(1, keys[0].length)
          keys[keys.length - 1] = keys[keys.length - 1].slice(0, keys[keys.length - 1].length - 1)
          this.optionType = typeof this.options1[0].key
//          console.log('optionType = ', this.optionType)
//          if (optionType === 'string') {
//
//          }
          keys.forEach((key, i) => {
            if (key.indexOf('"') > -1) {
              keys[i] = keys[i].slice(1, keys[i].length - 1)
            }
          })
//          console.log('keys = ', keys)
          if (this.optionType === 'number') {
            this.option1 = +keys[0]
          } else {
            this.option1 = keys[0]
          }

          for (let i = 0, len = keys.length; i < len; i++) {
            let j = i + 1
            if (this.optionType === 'number') {
              this['option' + j] = +keys[i]
            } else {
              this['option' + j] = keys[i]
            }

//            console.log('this[option',j,']  = ', this['option' + j])
//            console.log(' in initPlaceholder')
            this.ch(this['option' + j], j)
          }

        }

      },

      emit() {

//        console.log('$$$$$$$$$$$$$   emit!    $$$$$$$$$$$$$')
        let nameArray = []
        for (let i = 1; i < this.cascadeNumber + 1; i++) {
//          console.log('options', i, ' = ', this['options' + i])
//          console.log('option', i, i' = ', this['option' + i])
          if (this['option' + i]) {
            nameArray.push(codeNameArray(this['options' + i], this['option' + i]))
          } else {
            break
          }
        }
        nameArray = nameArray.join(' ').trim()
        let codeArray = this.codeArray.slice(0, this.cascadeNumber)
        this.$emit('code-array-changed', { codeArray, propName: this.propName, nameArray })
      },
      getNextOptions(value, formerOptions) {
        let tp = formerOptions.find(item =>
          '' + item.key === '' + value
        )
        if (tp) {
          return tp.children.map(item => ({ key: item.value, value: item.label, children: item.children }))
        } else {
          return []
        }

      },
      chg1(value) {
//        console.log('in chg1!')
        this.ch(value, 1, true)
//        this.option2=null
      },
      chg2(value) {
//        console.log('in chg2!')
        this.ch(value, 2, true)
//        if (this.cascade[2]) {
//          this.options3 = this.getNextOptions(value, this.options2)
//        }

      },
      chg3(value) {
//        console.log('in chg3!')
        this.ch(value, 3, true)
//        if (this.cascade[3]) {
//          this.options4 = this.getNextOptions(value, this.options3)
//        }
      },
      chg4(value) {
//        console.log('in chg4!')
        this.ch(value, 4, true)
//        if (this.cascadeNumber === 4) {
//          this.emit()
//        }
      },
      ch(value, i, noInit) {
//        console.log('in ch!,value = ', value, '  i = ', i)
        if (this.cascade[i]) {
          if (value) {
            if (this['options' + (i + 1)][0]) {
              if (this['options' + (i + 1)][0].key !== this.getNextOptions(value, this['options' + i])[0].key) {
//                console.log('选项需要更新1')
                this['options' + (i + 1)] = this.getNextOptions(value, this['options' + i])
                this['option' + (i + 1)] = ''
              }
            } else {
//              console.log('选项需要更新2')
              this['options' + (i + 1)] = this.getNextOptions(value, this['options' + i])
            }
          } else {
//            console.log('选项需要更新3')
            this['options' + (i + 1)] = []
            this['option' + (i + 1)] = ''
          }


        }

//        for (let j = i; j < this.cascadeNumber + 1; j++) {
//          let flag = this['options' + (j + 1)].find(it => +it.key === +this['option' + (j + 1)].key)
//          if (!flag) {
//            this['option' + (j + 1)] = null
//            console.log('option', j + 1, ' = null!')
//          }
//
//        }
      }
    },

    components: {
      PopupRadio,
      Divider,
      Group,
      XInput,
      XButton,
    },
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>