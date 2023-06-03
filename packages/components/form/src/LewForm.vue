<script setup lang="ts">
import { object2class } from 'lew-ui/utils'
import * as Yup from 'yup'
import { useVModel, watchDebounced } from '@vueuse/core'
import { formProps } from './form'

const props = defineProps(formProps)
const emit = defineEmits(['update:modelValue', 'update:options', 'change'])
const form = ref({} as any)
const componentOptions: any = useVModel(props, 'options', emit)

const getFormClassNames = computed(() => {
  const { direction, size } = props
  return object2class('lew-form', { direction, size })
})

watchDebounced(
  () => componentOptions.value,
  (v: any) => {
    form.value = arrayToObj(v)
    emit('change', toRaw(form.value))
  },
  { deep: true, debounce: 250, maxWait: 500 },
)

onMounted(() => {
  form2componentOptions()
  form.value = arrayToObj(toRaw(componentOptions.value))
  emit('change', toRaw(form.value))
})

function arrayToObj(arr: any): any {
  const obj: Record<string, unknown> = {}
  arr?.forEach(({ field, value }: any) => {
    if (!field)
      return

    const keys = field.split('.')
    let currentObj = obj

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]

      if (!currentObj[key])
        currentObj[key] = {}

      currentObj = currentObj[key] as Record<string, unknown>
    }

    if (value !== undefined)
      currentObj[keys[keys.length - 1]] = toRaw(value)
  })
  return removeEmpty(obj)
}
function removeEmpty(obj: any) {
  if (Array.isArray(obj)) {
    // 如果是数组类型
    return obj
      .map((value: any) => {
        if (typeof value === 'object') {
          value = removeEmpty(value)
          if (Array.isArray(value) && value.length === 0)
            return undefined

          if (
            typeof value === 'object'
                        && Object.keys(value).length === 0
          )
            return undefined
        }
        return value !== undefined && (value !== null
          ? value
          : undefined)
      })
      .filter((value: any) => value !== undefined)
  }
  const keys = Object.keys(obj)
  if (keys.length === 0)
    return obj

  const newObj: any = {}
  keys.forEach((key) => {
    const value = obj[key]
    if (typeof value === 'object' && value !== null) {
      const newValue = removeEmpty(value)
      if (Array.isArray(newValue) && newValue.length === 0)
        return

      if (
        typeof newValue === 'object'
                && Object.keys(newValue).length === 0
      )
        return

      newObj[key] = newValue
    }
    else {
      if (value !== undefined && value !== null)
        newObj[key] = value
    }
  })
  return newObj
}

function flattenObject(obj: any, prefix = '') {
  return Object.keys(obj).reduce((acc: any, key: any) => {
    const propName = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    if (typeof value === 'object' && !Array.isArray(value))
      acc.push(...flattenObject(value, propName))
    else
      acc.push({ field: propName, value })

    return acc
  }, [])
}

function form2componentOptions() {
  if (!form.value)
    return

  const vArr = flattenObject(form.value)

  vArr.forEach((_e: any) => {
    componentOptions.value.forEach((__e: any, i: number) => {
      if (_e.field.lastIndexOf('.') >= 0) {
        const _$fieldKey = _e.field?.substring(
          _e.field.lastIndexOf('.') + 1,
        )
        const _$fieldPrefix = _e.field?.substring(
          0,
          _e.field.lastIndexOf('.'),
        )
        if (_$fieldKey && __e.field === _$fieldPrefix) {
          componentOptions.value[i].value = {
            ...componentOptions.value[i].value,
            [_$fieldKey]: _e.value,
          }
        }
      }
      else if (_e.field === __e.field) {
        componentOptions.value[i].value = _e.value
      }
    })
  })
}

function validate(field: string) {
  const opt = componentOptions.value || []
  let schema: any = Yup.object()
  const obj: any = []
  const formObj: any = {}
  opt.forEach(({ field, rules, value }: any) => {
    if (field && rules)
      obj[field] = rules

    if (value !== undefined)
      formObj[field] = value
  })
  schema = Yup.object().shape(obj)
  return new Promise((resolve) => {
    schema
      .validate(formObj, { abortEarly: false })
      .then(() => {
        opt.forEach((o: any) => {
          o.errMessage = ''
        })
        resolve(true)
      })
      .catch((err: any) => {
        resolve(false)
        if (field) {
          // 重置
          opt.forEach((e: any) => {
            if (e.field === field)
              e.errMessage = ''
          })

          let errors = err.inner.map((error: any) => ({
            ...error,
            field: () => {
              try {
                let fieldName = error?.path // 去除首尾的方括号
                if (fieldName[0] !== '[')
                  return fieldName

                fieldName = error?.path.slice(1, -1) // 去除首尾的方括号
                if (
                  fieldName.charAt(0) === '"'
                                    && fieldName.charAt(fieldName.length - 1)
                                        === '"'
                ) {
                  // 处理包含引号的情况
                  fieldName = fieldName.slice(1, -1)
                }
                if (fieldName.includes('\\"')) {
                  // 处理转义字符
                  fieldName = fieldName.replace(/\\"/g, '"')
                }
                return fieldName
              }
              catch {
                return error.path
              }
            },
          }))

          errors = errors.filter((e: any) => e.field() === field)

          const errItem = errors[0] && errors[0]
          const index = opt.findIndex((e: any) => {
            return e?.field === errItem?.field()
          })
          if (index >= 0)
            opt[index].errMessage = errItem?.message
        }
        else {
          // 重置
          opt.forEach((o: any) => {
            o.errMessage = ''
          })

          const errors = err.inner.map((error: any) => ({
            ...error,
            field: () => {
              try {
                let fieldName = error?.path // 去除首尾的方括号
                if (fieldName[0] !== '[')
                  return fieldName

                fieldName = error?.path.slice(1, -1) // 去除首尾的方括号
                if (
                  fieldName.charAt(0) === '"'
                                    && fieldName.charAt(fieldName.length - 1)
                                        === '"'
                ) {
                  // 处理包含引号的情况
                  fieldName = fieldName.slice(1, -1)
                }
                if (fieldName.includes('\\"')) {
                  // 处理转义字符
                  fieldName = fieldName.replace(/\\"/g, '"')
                }
                return fieldName
              }
              catch {
                return error.path
              }
            },
          }))

          errors.forEach((e: any) => {
            const index = opt.findIndex(
              (c: any) => c.field === e.field(),
            )
            if (index >= 0 && opt)
              opt[index].errMessage = e?.message
          })
          componentOptions.value = JSON.parse(JSON.stringify(opt))
        }
      })
  })
}

function getForm() {
  return toRaw(form.value)
}

function setForm(value: any) {
  form.value = value
  form2componentOptions()
}

defineExpose({ getForm, setForm, validate })
</script>

<template>
  <div
    class="lew-form"
    :class="getFormClassNames"
    :style="`width:${width}px`"
  >
    <div
      v-for="item in componentOptions"
      :key="item.field"
      class="lew-form-item"
    >
      <div
        :style="direction === 'x' ? `width:${labelWidth}px` : ''"
        class="label-box"
      >
        <label :class="{ 'label-required': item.rules && item.label }">
          {{ item.label }}
        </label>
      </div>
      <div
        :style="
          direction === 'x'
            ? `width:calc(100% - ${labelWidth + 10}px)`
            : ''
        "
        class="lew-form-main"
        :class="{ 'lew-form-item-error': item.errMessage }"
      >
        <lew-input
          v-if="item.as === 'input'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="validate(item.field)"
          @input="validate(item.field)"
          @clear="validate(item.field)"
        />

        <lew-textarea
          v-if="item.as === 'textarea'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="validate(item.field)"
          @input="validate(item.field)"
          @clear="validate(item.field)"
        />

        <lew-input-tag
          v-if="item.as === 'input-tag'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="validate(item.field)"
          @close="validate(item.field)"
        />

        <lew-checkbox-group
          v-if="item.as === 'checkbox-group'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="validate(item.field)"
        />

        <lew-radio-group
          v-if="item.as === 'radio-group'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="validate(item.field)"
        />

        <lew-checkbox
          v-if="item.as === 'checkbox'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="validate(item.field)"
        />

        <lew-select
          v-if="item.as === 'select'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="
            (e:any) => {
              validate(item.field);
              typeof item.props.click === 'function' ? item.props.change(e) : '';
            } "
          @input="validate(item.field)"
          @clear="validate(item.field)"
        />

        <lew-select-multiple
          v-if="item.as === 'select-multiple'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="
            (e:any) => {
              validate(item.field);
              typeof item.props.click === 'function' ? item.props.change(e) : '';
            } "
          @input="validate(item.field)"
          @clear="validate(item.field)"
        />

        <lew-date-picker
          v-if="item.as === 'date-picker'"
          v-model="item.value"
          style="width: 100%"
          v-bind="{ size, ...item.props }"
          @change="
            (e:any) => {
              validate(item.field);
              typeof item.props.click === 'function' ? item.props.change(e) : '';
            }"
          @input="validate(item.field)"
          @clear="validate(item.field)"
        />

        <lew-date-range-picker
          v-if="item.as === 'date-range-picker'"
          v-model="item.value"
          style="width: 100%"
          v-bind="{ size, ...item.props }"
          @change="
            (e:any) => {
              validate(item.field);
              typeof item.props.click === 'function' ? item.props.change(e) : '';
            }
          "
          @input="validate(item.field)"
          @clear="validate(item.field)"
        />
        <lew-tabs
          v-if="item.as === 'tabs'"
          v-model="item.value"
          v-bind="{ ...item.props }"
          @change="
            (e:any) => {
              validate(item.field);
              typeof item.props.click === 'function' ? item.props.change(e) : '';
            }
          "
        />

        <lew-switch
          v-if="item.as === 'switch'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @change="
            typeof item.props.change === 'function'
              ? item.props.change()
              : ''
          "
        />

        <lew-button
          v-if="item.as === 'button'"
          v-model="item.value"
          v-bind="{ size, ...item.props }"
          @click="
            typeof item.props.click === 'function'
              ? item.props.click()
              : ''
          "
        />

        <transition name="slide-fade">
          <div v-if="item.errMessage" class="error-message">
            {{ item.errMessage }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-form {
    width: 100%;
    .lew-form-item {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        padding-bottom: 30px;
        .label-box {
            display: inline-flex;
            justify-content: flex-end;
            label {
                display: flex;
                align-items: center;
                white-space: nowrap;
            }
        }
    }
    .lew-form-main {
        width: 100%;
        position: relative;
        display: inline-flex;
        align-items: center;
        .error-message {
            position: absolute;
            left: 0px;
            bottom: 0px;
            font-size: 12px;
            transition: all 0.25s;
            transform: translateY(calc(100% + 4px));
            color: var(--lew-error-color-dark);
        }
    }
}
.lew-form-size-small {
    .lew-form-item {
        .label-box {
            margin-top: 5px;
        }
    }
    .lew-form-main {
        min-height: calc(var(--lew-form-item-height-small) + 2px);
    }
}

.lew-form-size-medium {
    .lew-form-item {
        .label-box {
            margin-top: 7px;
        }
    }
    .lew-form-main {
        min-height: calc(var(--lew-form-item-height-medium) + 2px);
    }
}

.lew-form-size-large {
    .lew-form-item {
        .label-box {
            margin-top: 9px;
        }
    }
    .lew-form-main {
        min-height: calc(var(--lew-form-item-height-large) + 2px);
    }
}

.lew-form-direction-x {
    .lew-form-item {
        gap: 10px;
        .label-box {
            display: inline-flex;
            justify-content: flex-end;
            .label-required::before {
                content: '*';
                color: var(--lew-error-color-dark);
                margin-right: 4px;
            }
        }
    }
}
.lew-form-direction-y {
    .lew-form-item {
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        gap: 5px;
        .label-box {
            display: inline-flex;
            justify-content: flex-start;
            .label-required::after {
                content: '*';
                color: var(--lew-error-color-dark);
                margin-left: 4px;
            }
        }
    }
}

.lew-form-item-error {
    --lew-form-box-shadow: 0px 1px 1px rgba(160, 62, 62, 0.64);
    --lew-form-border-color-focus: var(--lew-error-color-dark);
    --lew-radio-border-color-hover: var(--lew-error-color);
    --lew-checkbox-border-color-hover: var(--lew-error-color);
    --lew-checkbox-color: var(--lew-error-color);
    --lew-checkbox-color-dark: var(--lew-error-color-dark);
    --lew-checkbox-color-light: var(--lew-error-color-light);
    --lew-radio-color: var(--lew-error-color);
    --lew-radio-color-dark: var(--lew-error-color-dark);
    --lew-radio-color-light: var(--lew-error-color-light);
    --lew-form-ouline: 3px var(--lew-error-color-light) solid;
}

.slide-fade-leave-active,
.slide-fade-enter-active {
    transition: all 0.15s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(100%) !important;
    opacity: 0;
}
</style>
