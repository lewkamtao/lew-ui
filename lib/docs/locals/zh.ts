export default {
  name: 'zh',
  image: {
    name: '图片',
    description: '图片',
    demo1: '普通',
    demo2: '加载中',
    demo3: '加载失败',
    props: {
      src: '图片源地址',
      alt: '图片替代文本',
      width: '图片宽度',
      height: '图片高度',
      objectFit: '图片填充方式',
      objectPosition: '图片位置',
      lazy: '懒加载',
      loading: '加载状态',
      title: '图片标题'
    }
  },
  input: {
    name: '',
    description: 'Image',
    demo1: 'common',
    demo2: 'loading',
    demo3: 'error',
    props: {},
    default: {
      placeholder: '请输入'
    }
  }
}
