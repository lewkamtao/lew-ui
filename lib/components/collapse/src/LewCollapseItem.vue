<script setup lang="ts">
import { collapseItemProps } from './props'
import LewCollapseTransition from './LewCollapseTransition.vue'
import { isArray } from 'lodash-es'
import { LewFlex } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'

const props = defineProps(collapseItemProps)
const modelValue = defineModel()

const expandKeys: any = inject('expandKeys')

const setModelValue = () => {
    modelValue.value = isArray(expandKeys.value)
        ? expandKeys.value.includes(props.collapseKey)
        : props.collapseKey === expandKeys.value
}

watch(() => expandKeys.value, setModelValue, { deep: true })

setModelValue()

const change = () => {
    modelValue.value = !modelValue.value

    if (isArray(expandKeys.value)) {
        expandKeys.value = modelValue.value
            ? [...expandKeys.value, props.collapseKey]
            : expandKeys.value.filter(
                  (item: string) => item !== props.collapseKey,
              )
    } else {
        expandKeys.value = modelValue.value ? props.collapseKey : null
    }
}
</script>

<template>
    <div class="lew-collapse-item">
        <lew-flex
            x="start"
            y="center"
            class="lew-collapse-item-title"
            :class="{ 'lew-collapse-item-title-active': modelValue }"
            :style="{ borderRadius: any2px(radius) }"
            @click="change"
        >
            <slot v-if="$slots.title" name="title" :props="props" />
            <template v-else>
                <Icon
                    :size="16"
                    :style="{
                        transform: `rotate(${modelValue ? 90 : 0}deg)`,
                        transition: 'all 0.3s',
                    }"
                    type="chevron-right"
                />
                <lew-text-trim
                    :style="{ width: 'calc(100% - 50px)' }"
                    :text="title"
                />
            </template>
        </lew-flex>
        <lew-collapse-transition>
            <div v-if="modelValue" class="lew-collapse-item-main">
                <slot />
            </div>
        </lew-collapse-transition>
    </div>
</template>
<style scoped lang="scss">
.lew-collapse-item {
    border-bottom: 1px solid var(--lew-bgcolor-4);
    .lew-collapse-item-title {
        cursor: pointer;
        padding: 10px 0px;
        box-sizing: border-box;
        transition: all 0.15s;
        user-select: none;
    }

    .lew-collapse-item-main {
        box-sizing: border-box;
        padding-bottom: 10px;
    }
}
.lew-collapse-item:last-child {
    border-bottom: none;
}
</style>
