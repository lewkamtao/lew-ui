<script setup lang="ts">
import { formProps } from './form';
import { object2class } from 'lew-ui/utils';
import * as Yup from 'yup';
import { useVModel, watchDebounced } from '@vueuse/core';
const props = defineProps(formProps);
const emit = defineEmits(['update:modelValue', 'update:options', 'change']);
const form = ref({} as any);
const componentOptions: any = useVModel(props, 'options', emit);

const getFormClassNames = computed(() => {
    const { direction, size } = props;
    return object2class('lew-form', { direction, size });
});

watchDebounced(
    () => componentOptions.value,
    (v: any) => {
        form.value = arrayToObj(v);
        emit('change', toRaw(form.value));
    },
    { deep: true, debounce: 250, maxWait: 500 }
);

onMounted(() => {
    form2componentOptions();
    form.value = arrayToObj(toRaw(componentOptions.value));
    emit('change', toRaw(form.value));
});

const arrayToObj = (arr: any): any => {
    const obj: Record<string, unknown> = {};
    arr?.forEach(({ field, value }: any) => {
        if (!field) {
            return;
        }
        const keys = field.split('.');
        let currentObj = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];

            if (!currentObj[key]) {
                currentObj[key] = {};
            }
            currentObj = currentObj[key] as Record<string, unknown>;
        }

        if (value !== undefined) {
            currentObj[keys[keys.length - 1]] = toRaw(value);
        }
    });
    return removeEmpty(obj);
};
function removeEmpty(obj: any) {
    if (Array.isArray(obj)) {
        // 如果是数组类型
        return obj
            .map((value: any) => {
                if (typeof value === 'object') {
                    value = removeEmpty(value);
                    if (Array.isArray(value) && value.length === 0) {
                        return undefined;
                    }
                    if (
                        typeof value === 'object' &&
                        Object.keys(value).length === 0
                    ) {
                        return undefined;
                    }
                }
                return value !== undefined && value !== null
                    ? value
                    : undefined;
            })
            .filter((value: any) => value !== undefined);
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) {
        return obj;
    }
    const newObj: any = {};
    keys.forEach((key) => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            const newValue = removeEmpty(value);
            if (Array.isArray(newValue) && newValue.length === 0) {
                return;
            }
            if (
                typeof newValue === 'object' &&
                Object.keys(newValue).length === 0
            ) {
                return;
            }
            newObj[key] = newValue;
        } else {
            if (value !== undefined && value !== null) {
                newObj[key] = value;
            }
        }
    });
    return newObj;
}

const flattenObject = (obj: any, prefix = '') => {
    return Object.keys(obj).reduce((acc: any, key: any) => {
        const propName = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];
        if (typeof value === 'object' && !Array.isArray(value)) {
            acc.push(...flattenObject(value, propName));
        } else {
            acc.push({ field: propName, value });
        }
        return acc;
    }, []);
};

const form2componentOptions = () => {
    if (!form.value) {
        return;
    }
    let vArr = flattenObject(form.value);

    vArr.forEach((_e: any) => {
        componentOptions.value.forEach((__e: any, i: number) => {
            if (_e.field.lastIndexOf('.') >= 0) {
                let _$fieldKey = _e.field?.substring(
                    _e.field.lastIndexOf('.') + 1
                );
                let _$fieldPrefix = _e.field?.substring(
                    0,
                    _e.field.lastIndexOf('.')
                );
                if (_$fieldKey && __e.field === _$fieldPrefix) {
                    componentOptions.value[i].value = {
                        ...componentOptions.value[i].value,
                        [_$fieldKey]: _e.value,
                    };
                }
            } else if (_e.field === __e.field) {
                componentOptions.value[i].value = _e.value;
            }
        });
    });
};

const validate = (field: string) => {
    let opt = componentOptions.value || [];
    let schema: any = Yup.object();
    let obj: any = [];
    let formObj: any = {};
    opt.forEach(({ field, rules, value }: any) => {
        if (field && rules) {
            obj[field] = rules;
        }
        if (value !== undefined) {
            formObj[field] = value;
        }
    });
    schema = Yup.object().shape(obj);
    return new Promise((resolve) => {
        schema
            .validate(formObj, { abortEarly: false })
            .then(() => {
                opt.forEach((o: any) => {
                    o.errMessage = '';
                });
                resolve(true);
            })
            .catch((err: any) => {
                resolve(false);
                if (field) {
                    // 重置
                    opt.forEach((e: any) => {
                        if (e.field === field) {
                            e.errMessage = '';
                        }
                    });

                    let errors = err.inner.map((error: any) => ({
                        ...error,
                        field: () => {
                            try {
                                let fieldName = error?.path; // 去除首尾的方括号
                                if (fieldName[0] !== '[') {
                                    return fieldName;
                                }
                                const startIndex = error?.path.indexOf('[') + 1;
                                const endIndex = error?.path.indexOf(']');
                                fieldName = error?.path.slice(
                                    startIndex,
                                    endIndex
                                ); // 去除首尾的方括号
                                if (
                                    fieldName.charAt(0) === '"' &&
                                    fieldName.charAt(fieldName.length - 1) ===
                                        '"'
                                ) {
                                    // 处理包含引号的情况
                                    fieldName = fieldName.slice(1, -1);
                                }
                                if (fieldName.includes('\\"')) {
                                    // 处理转义字符
                                    fieldName = fieldName.replace(/\\"/g, '"');
                                }
                                return fieldName;
                            } catch {
                                return error.path;
                            }
                        },
                    }));

                    errors = errors.filter((e: any) => e.field() === field);

                    let errItem = errors[0] && errors[0];
                    let index = opt.findIndex((e: any) => {
                        return e?.field === errItem?.field();
                    });
                    if (index >= 0) {
                        opt[index].errMessage = errItem?.message;
                    }
                } else {
                    // 重置
                    opt.forEach((o: any) => {
                        o.errMessage = '';
                    });

                    const errors = err.inner.map((error: any) => ({
                        ...error,
                        field: () => {
                            try {
                                let fieldName = error?.path; // 去除首尾的方括号
                                if (fieldName[0] !== '[') {
                                    return fieldName;
                                }
                                fieldName = error?.path.slice(1, -1); // 去除首尾的方括号
                                if (
                                    fieldName.charAt(0) === '"' &&
                                    fieldName.charAt(fieldName.length - 1) ===
                                        '"'
                                ) {
                                    // 处理包含引号的情况
                                    fieldName = fieldName.slice(1, -1);
                                }
                                if (fieldName.includes('\\"')) {
                                    // 处理转义字符
                                    fieldName = fieldName.replace(/\\"/g, '"');
                                }
                                return fieldName;
                            } catch {
                                return error.path;
                            }
                        },
                    }));

                    errors.forEach((e: any) => {
                        let index = opt.findIndex(
                            (c: any) => c.field == e.field()
                        );
                        if (index >= 0 && opt) {
                            opt[index].errMessage = e?.message;
                        }
                    });
                    componentOptions.value = JSON.parse(JSON.stringify(opt));
                }
            });
    });
};

const getForm = () => {
    return toRaw(form.value);
};

const setForm = (value: any) => {
    form.value = value;
    form2componentOptions();
};

defineExpose({ getForm, setForm, validate });
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
                    v-model="item.value"
                    v-if="item.as === 'input'"
                    @change="validate(item.field)"
                    @input="validate(item.field)"
                    @clear="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-textarea
                    v-model="item.value"
                    v-if="item.as === 'textarea'"
                    @change="validate(item.field)"
                    @input="validate(item.field)"
                    @clear="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-input-tag
                    v-model="item.value"
                    v-if="item.as === 'input-tag'"
                    @change="validate(item.field)"
                    @close="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-checkbox-group
                    v-model="item.value"
                    v-if="item.as === 'checkbox-group'"
                    @change="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-radio-group
                    v-model="item.value"
                    v-if="item.as === 'radio-group'"
                    @change="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-checkbox
                    v-model="item.value"
                    v-if="item.as === 'checkbox'"
                    @change="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-select
                    v-model="item.value"
                    v-if="item.as === 'select'"
                    @change=" 
                        (e:any) => {
                            validate(item.field);
                            typeof item.props.click === 'function'?item.props.change(e):'';
                        }"
                    @input="validate(item.field)"
                    @clear="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-select-multiple
                    v-model="item.value"
                    v-if="item.as === 'select-multiple'"
                    @change=" 
                        (e:any) => {
                            validate(item.field);
                            typeof item.props.click === 'function'?item.props.change(e):'';
                        } "
                    @input="validate(item.field)"
                    @clear="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-date-picker
                    style="width: 100%"
                    v-model="item.value"
                    v-if="item.as === 'date-picker'"
                    @change=" 
                        (e:any) => {
                            validate(item.field);
                            typeof item.props.click === 'function'?item.props.change(e):'';
                        }"
                    @input="validate(item.field)"
                    @clear="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-date-range-picker
                    style="width: 100%"
                    v-model="item.value"
                    v-if="item.as === 'date-range-picker'"
                    @change=" 
                        (e:any) => {
                            validate(item.field);
                            typeof item.props.click === 'function'?item.props.change(e):'';
                        }   
                    "
                    @input="validate(item.field)"
                    @clear="validate(item.field)"
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-tabs
                    v-model="item.value"
                    v-if="item.as === 'tabs'"
                    @change=" 
                        (e:any) => {
                            validate(item.field);
                            typeof item.props.click === 'function'?item.props.change(e):'';
                        }  
                    "
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-cascader
                    v-model="item.value"
                    v-if="item.as === 'cascader'"
                    @clear="validate(item.field)"
                    @change=" 
                        (e:any) => {
                            validate(item.field);
                            typeof item.props.click === 'function'?item.props.change(e):'';
                        }  
                    "
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-switch
                    v-model="item.value"
                    v-if="item.as === 'switch'"
                    @change="
                        typeof item.props.change === 'function'
                            ? item.props.change()
                            : ''
                    "
                    v-bind="{ size: size, ...item.props }"
                />

                <lew-button
                    v-model="item.value"
                    v-if="item.as === 'button'"
                    @click="
                        typeof item.props.click === 'function'
                            ? item.props.click()
                            : ''
                    "
                    v-bind="{ size: size, ...item.props }"
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
            color: var(--lew-color-error-dark);
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
                color: var(--lew-color-error-dark);
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
                color: var(--lew-color-error-dark);
                margin-left: 4px;
            }
        }
    }
}

.lew-form-item-error {
    --lew-form-box-shadow: 0px 1px 1px rgba(160, 62, 62, 0.64);
    --lew-form-border-color-focus: var(--lew-color-error-dark);
    --lew-radio-border-color-hover: var(--lew-color-error);
    --lew-checkbox-border-color-hover: var(--lew-color-error);
    --lew-checkbox-color: var(--lew-color-error);
    --lew-checkbox-color-dark: var(--lew-color-error-dark);
    --lew-checkbox-color-light: var(--lew-color-error-light);
    --lew-radio-color: var(--lew-color-error);
    --lew-radio-color-dark: var(--lew-color-error-dark);
    --lew-radio-color-light: var(--lew-color-error-light);
    --lew-form-ouline: 3px var(--lew-color-error-light) solid;
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
