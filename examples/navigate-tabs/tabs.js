Vue.component('tabs', {
  template: '\
    <div class="tabs"> \
      <div class="tabs-bar"> \
        <!-- 标签页标题，这里要用v-for --> \
        <div \
          :class="tabCls(item)" \
          v-for="(item, index) in navList" \
          @click="handleChange(index)"> \
          {{ item.label }} \
        </div> \
      </div> \
      <div class="tabs-content"> \
        <!-- 这里的slot就是嵌套的pane --> \
        <slot></slot> \
      </div> \
    </div>',
  props: {
    // 这里的value是为了可以使用v-model
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      // 因为不能修改value，所以复制一份自己维护
      currentValue: this.value,
      // 用于渲染 tabs 的标题
      navList: []
    }
  },
  methods: {
    tabCls (item) {
      return [
        'tabs-tab',
        {
          // 给当前选中的tab加一个class
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    getTabs () {
      // 通过便历子组件，得到所有的pane组件
      return this.$children.filter(item => {
        return item.$options.name === 'pane'
      })
    },
    updateNav () {
      this.navList = []

      // 使用箭头函数来将上下文绑定到父级
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
      })
      this.updateStatus()
    },
    updateStatus () {
      // 显示当前选中的tab对应的pane组件，隐藏没有选中的
      this.getTabs().forEach((pane, index) => {
        return pane.show = (pane.name || index) === this.currentValue
      })
    },
    handleChange (index) {
      var nav = this.navList[index]
      var name = nav.name
      // 改变当前选中的tab，并触发下面的watch
      this.currentValue = name
      // 更新value
      this.$emit('input', name)
      // 触发一个自定义事件，供父级使用
      this.$emit('on-click', name)
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue () {
      // 在当前选中的tab发生变化时，更新pane的显示状态
      this.updateStatus()
    }
  }
})