<!--**
 * forked from：https://github.com/F-loat/mpvue-wxParse
 *
 * github地址: https://github.com/dcloudio/uParse
 *
 * for: uni-app框架下 富文本解析
 */-->

<template>
  <div style="width: 100%;max-width: 100%;">
    <rich-text :nodes="nodes" style="font-size: 14px;width: 100%;max-width: 100%;"></rich-text>
  </div>

</template>

<script>
  import htmlParse from '../../../common/html-parser'
  export default {
    name: 'wxParse',
    props: {
      content: {
        type: String,
        default: '',
      }
    },
    computed: {
      nodes() {
        let content = this.content.replace(/src/g,"style='width:100%!important;height: auto!important;' src").replace(/table/g,`table style="width:100%!important;"`)
        return htmlParse(content)
      }
    },
    methods: {

    },
  };
</script>
