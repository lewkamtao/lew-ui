export default {
  name: 'en',
  image: {
    name: 'Image',
    description: 'Image',
    demo1: 'common',
    demo2: 'loading',
    demo3: 'error',
    props: {
      src: 'Image source',
      alt: 'Image alternative text',
      width: 'Image width',
      height: 'Image height',
      objectFit: 'Image object fit',
      objectPosition: 'Image object position',
      lazy: 'Lazy load image',
      loading: 'Loading image',
      title: 'Image title'
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
      placeholder: 'Please input'
    }
  }
}
