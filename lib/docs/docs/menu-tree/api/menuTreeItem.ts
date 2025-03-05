export default {
  title: 'MenuTreeItem',
  columnsKey: 'props',
  data: [
    {
      name: 'label',
      type: 'string',
      default: "''"
    },
    {
      name: 'value',
      type: 'string | number',
      required: true
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false'
    },
    {
      name: 'isLeaf',
      type: 'boolean',
      default: 'false'
    },
    {
      name: 'renderIcon',
      type: 'Function',
      default: '() => {}'
    },
    {
      name: 'renderLabel',
      type: 'Function',
      default: '() => {}'
    },
    {
      name: 'level',
      type: 'number',
      default: '1'
    },
    {
      name: 'tagText',
      type: 'string',
      default: "''"
    },
    {
      name: 'tagType',
      type: 'string',
      default: "'light'"
    },
    {
      name: 'tagColor',
      type: 'string',
      default: "'error'"
    }
  ]
}
