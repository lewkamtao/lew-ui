<script setup lang="ts">
const bindOptions = {
  labelWidth: 110,
  direction: 'y',
  columns: 4,
  options: [
    {
      label: '文本框',
      as: 'input',
      props: {
        showCount: true,
        maxLength: 30
      },
      id: 'input_20240707_153645_yubqcjkze',
      span: 1,
      field: '21d',
      gridArea: 'auto  / 1 / auto  / 2'
    },
    {
      label: '单选选择器',
      as: 'select',
      props: {
        clearable: true,
        options: [
          {
            label: '广东',
            value: '1'
          },
          {
            label: '深圳',
            value: '2'
          },
          {
            label: '杭州',
            value: '3'
          },
          {
            label: '上海',
            value: '4'
          },
          {
            label: '北京',
            value: '5'
          }
        ]
      },
      id: 'select_20240707_153643_d1jzk56ts',
      span: 2,
      field: 'wqewqe',
      gridArea: 'auto  / 2 / auto  / 4'
    },
    {
      label: '表单大小',
      as: 'tabs',
      field: 'qwe',
      props: {
        itemWidth: 'auto',
        width: 'auto',
        options: [
          {
            label: 'small',
            value: 'small'
          },
          {
            label: 'medium',
            value: 'medium'
          },
          {
            label: 'large',
            value: 'large'
          }
        ]
      },
      id: 'tabs_20240707_153645_xff8apf23',
      span: 1,
      gridArea: 'auto  / 4 / auto  / 5'
    },
    {
      label: '占位盒子',
      as: '',
      id: '_20240707_153737_q72t2j301',
      span: 2,
      gridArea: 'auto  / 1 / auto  / 3'
    },
    {
      label: '表单大小',
      as: 'tabs',
      field: 'dssd',
      props: {
        itemWidth: 'auto',
        width: 'auto',
        options: [
          {
            label: 'small',
            value: 'small'
          },
          {
            label: 'medium',
            value: 'medium'
          },
          {
            label: 'large',
            value: 'large'
          }
        ]
      },
      id: 'tabs_20240707_153644_3osli0aq2',
      span: 2,
      gridArea: 'auto  / 3 / auto  / 5'
    },
    {
      field: 'field_eg5rlbdbw',
      label: '多选选择器',
      as: 'select-multiple',
      props: {
        clearable: true,
        options: [
          {
            label: '广东',
            value: '1'
          },
          {
            label: '深圳',
            value: '2'
          },
          {
            label: '杭州',
            value: '3'
          },
          {
            label: '上海',
            value: '4'
          },
          {
            label: '北京',
            value: '5'
          }
        ]
      },
      id: 'select-multiple_20240707_153904_zds25o6w3',
      span: 1,
      gridArea: 'auto  / 1 / auto  / 2'
    },
    {
      field: 'field_i3stb7836',
      label: '多选选择器',
      as: 'select-multiple',
      props: {
        clearable: true,
        options: [
          {
            label: '广东',
            value: '1'
          },
          {
            label: '深圳',
            value: '2'
          },
          {
            label: '杭州',
            value: '3'
          },
          {
            label: '上海',
            value: '4'
          },
          {
            label: '北京',
            value: '5'
          }
        ]
      },
      id: 'select-multiple_20240707_153904_ofgt75loz',
      span: 1,
      gridArea: 'auto  / 2 / auto  / 3'
    },
    {
      field: 'field_4w5004xp8',
      label: '多选选择器',
      as: 'select-multiple',
      props: {
        clearable: true,
        options: [
          {
            label: '广东',
            value: '1'
          },
          {
            label: '深圳',
            value: '2'
          },
          {
            label: '杭州',
            value: '3'
          },
          {
            label: '上海',
            value: '4'
          },
          {
            label: '北京',
            value: '5'
          }
        ]
      },
      id: 'select-multiple_20240707_153904_eajq9nrue',
      span: 1,
      gridArea: 'auto  / 3 / auto  / 4'
    },
    {
      field: 'field_uoswf571w',
      label: '多选选择器',
      as: 'select-multiple',
      props: {
        clearable: true,
        options: [
          {
            label: '广东',
            value: '1'
          },
          {
            label: '深圳',
            value: '2'
          },
          {
            label: '杭州',
            value: '3'
          },
          {
            label: '上海',
            value: '4'
          },
          {
            label: '北京',
            value: '5'
          }
        ]
      },
      id: 'select-multiple_20240707_153902_r1d78x0e3',
      span: 1,
      gridArea: 'auto  / 4 / auto  / 5'
    },
    {
      label: '单选框',
      as: 'radio-group',
      props: {
        options: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '2'
          },
          {
            label: '不公开',
            value: '3'
          }
        ]
      },
      id: 'radio-group_20240707_153903_k5b0j7k1h',
      span: 1,
      field: 'field_wacon5sg8',
      gridArea: 'auto  / 1 / auto  / 2'
    },
    {
      label: '多行文本框',
      as: 'textarea',
      props: {
        clearable: true,
        showCount: true,
        maxLength: 300
      },
      id: 'textarea_20240707_153645_dmp46512g',
      span: 2,
      field: 'asddsa',
      gridArea: 'auto  / 2 / auto  / 4'
    },
    {
      label: '多选框',
      as: 'checkbox-group',
      props: {
        round: true,
        block: true,
        options: [
          {
            label: '唱歌',
            value: '1'
          },
          {
            label: '跳舞',
            value: '2'
          },
          {
            label: 'Rap',
            value: '3'
          },
          {
            label: '上海',
            value: '4'
          }
        ]
      },
      id: 'checkbox-group_20240707_153903_ypjbaa43o',
      span: 1,
      field: 'field_h9onjotni',
      gridArea: 'auto  / 4 / auto  / 5'
    },
    {
      label: '文本框',
      as: 'input',
      props: {
        showCount: true,
        maxLength: 30
      },
      id: 'input_20240707_153644_vnftt8ljo',
      span: 2,
      field: 'asdasd',
      gridArea: 'auto  / 1 / auto  / 3'
    },
    {
      label: '多行文本框',
      as: 'textarea',
      props: {
        clearable: true,
        showCount: true,
        maxLength: 300
      },
      id: 'textarea_20240707_153643_7drc7pq6y',
      span: 2,
      field: 'asd.asd.asd.as.das.d',
      gridArea: 'auto  / 3 / auto  / 5'
    },
    {
      label: '单选框',
      as: 'radio-group',
      props: {
        options: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '2'
          },
          {
            label: '不公开',
            value: '3'
          }
        ]
      },
      id: 'radio-group_20240707_153902_5a80v9fi6',
      span: 1,
      field: 'field_i71v8oztn',
      gridArea: 'auto  / 1 / auto  / 2'
    },
    {
      label: '单选框',
      as: 'radio-group',
      props: {
        options: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '2'
          },
          {
            label: '不公开',
            value: '3'
          }
        ]
      },
      id: 'radio-group_20240707_153900_ppsrs437n',
      span: 1,
      field: 'field_m452sp9sg',
      gridArea: 'auto  / 2 / auto  / 3'
    }
  ]
}
</script>

<template>
  <lew-flex x="start" y="start" :gap="50">
    <lew-form v-bind="bindOptions" />
  </lew-flex>
</template>
