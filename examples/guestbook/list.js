Vue.component('list', {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  render (h) {
    var _this = this

    var list = []
    this.list.forEach((msg, index) => {
      var node = h('div', {
        attrs: {
          class: 'list-item'
        }
      }, [
        h('span', msg.name + ': '),
        h('div', {
          attrs: {
            class: 'list-msg'
          }
        }, [
          h('p', msg.message),
          h('a', {
            attrs: {
              class: 'list-reply'
            },
            on: {
              click () {
                _this.handleReply(index)
              }
            }
          }, '回复')
        ])
      ])
      list.push(node)
    });
    if (this.list.length) {
      return h('div', {
        attrs: {
          class: 'list'
        }
      }, list)
    } else {
      return h('div', {
        attrs: {
          class: 'list-nothing'
        }
      }, '留言板列表为空')
    }
  },
  methods: {
    handleReply (index) {
      this.$emit('reply', index)
    }
  },
})