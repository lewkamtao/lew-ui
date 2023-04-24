<script setup lang="ts">
import { formProps } from './form';
import { getClass } from 'lew-ui/utils';
import * as Yup from 'yup';
import { useVModel } from '@vueuse/core';
const props = defineProps(formProps);
const emit = defineEmits(['update:modelValue', 'update:options', 'change']);
const form = useVModel(props, 'modelValue', emit);
const componentOptions = useVModel(props, 'options', emit);

const getFormClassNames = computed(() => {
    const { direction } = props;
    return getClass('lew-form', { direction });
});

watch(
    () => componentOptions.value,
    (v: any) => {
        form.value = arrayToObj(v);
    },
    { deep: true }
);

const arrayToObj = (arr: any): any => {
    const obj: Record<string, unknown> = {};
    arr.forEach(({ field, value }: any) => {
        const keys = field.split('.');
        let currentObj = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!currentObj[key]) {
                currentObj[key] = {};
            }
            currentObj = currentObj[key] as Record<string, unknown>;
        }
        currentObj[keys[keys.length - 1]] = value;
    });
    return obj;
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
        if (value) {
            formObj[field] = value;
        }
    });
    schema = Yup.object().shape(obj);

    schema
        .validate(formObj, { abortEarly: false })
        .then(() => {
            opt.forEach((o: any) => {
                o.errMessage = '';
            });
        })
        .catch((err: any) => {
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
                            return JSON.parse(error.path)[0];
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
                            return JSON.parse(error.path)[0];
                        } catch {
                            return error.path;
                        }
                    },
                }));

                errors.forEach((e: any) => {
                    let index = opt.findIndex((c: any) => c.field == e.field());
                    if (index >= 0 && opt) {
                        opt[index].errMessage = e?.message;
                    }
                });
                componentOptions.value = JSON.parse(JSON.stringify(opt));
            }
        });
};

defineExpose({ validate });
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
            <div :style="`width:${labelWidth}px`" class="label-box">
                <label :class="{ 'label-required': item.rules && item.label }">
                    {{ item.label }}
                </label>
            </div>
            <div
                :style="`width:calc(100% - ${labelWidth}px)`"
                class="lew-form-main"
            >
                <lew-input
                    :key="item.field"
                    v-model="item.value"
                    v-if="item.as === 'lew-input'"
                    @change="validate(item.field)"
                    @input="validate(item.field)"
                    @clear="validate(item.field)"
                    @blur="validate(item.field)"
                    v-bind="{ ...item.props }"
                />

                <lew-checkbox
                    :key="item.field"
                    v-model="item.value"
                    v-if="item.as === 'lew-checkbox'"
                    @change="validate(item.field)"
                    v-bind="{ ...item.props }"
                />

                <lew-select
                    :key="item.field"
                    v-model="item.value"
                    v-if="item.as === 'lew-select'"
                    @change=" 
                        (e:any) => {
                            validate(item.field);
                            item.props.change(e);
                        }
                    "
                    @blur="validate(item.field)"
                    @input="validate(item.field)"
                    @clear="validate(item.field)"
                    v-bind="{ ...item.props }"
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
    .lew-form-item {
        display: flex;
        align-items: center;
        gap: 20px;
        padding-bottom: 30px;
        .label-box {
            display: inline-flex;
            justify-content: flex-end;
            label {
                position: relative;
                white-space: nowrap;
            }
            .label-required::before {
                position: absolute;
                left: -12px;
                content: '*';
                color: var(--lew-error-color-dark);
                margin-right: 4px;
            }
        }
    }
    .lew-form-main {
        width: 100%;
        position: relative;

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
