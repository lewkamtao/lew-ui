<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
    tips: {
        type: String,
        default() {
            return '';
        },
    },
    trigger: {
        type: String,
        default() {
            return 'hover';
        },
    },
    placement: {
        type: String,
        default() {
            return 'top';
        },
    },
});

let isShow = ref(false);
let isShowTimer = null;
let onresizeTimer = null;
let lewTooltipRef = ref(null);
let lewTooltipWraRef = ref(null);

let lewTooltipStyle = ref('');
let lewTooltipIconStyle = ref('');

const init = () => {
    let lewTooltipWraDom = lewTooltipWraRef.value;
    let lewTooltipDom = lewTooltipRef.value;
    let x, y, ix, iy, placement;
    placement = props.placement;
    switch (placement) {
        case 'top':
            x =
                lewTooltipWraDom.offsetLeft +
                lewTooltipWraDom.offsetWidth * 0.5 -
                lewTooltipDom.offsetWidth * 0.5;
            y =
                document.body.offsetHeight -
                lewTooltipWraDom.offsetTop +
                lewTooltipWraDom.offsetHeight -
                20;
            ix = x + lewTooltipDom.offsetWidth * 0.5 - 6;
            iy = y - 4;
            lewTooltipStyle.value = `left:${x}px;bottom:${y}px;`;
            lewTooltipIconStyle.value = `left:${ix}px;bottom:${iy}px;`;
            break;
        case 'bottom':
            x =
                lewTooltipWraDom.offsetLeft +
                lewTooltipWraDom.offsetWidth * 0.5 -
                lewTooltipDom.offsetWidth * 0.5;
            y = lewTooltipWraDom.offsetTop + lewTooltipWraDom.offsetHeight + 12;
            ix = x + lewTooltipDom.offsetWidth * 0.5 - 6;
            iy = y - 4;
            lewTooltipStyle.value = `left:${x}px;top:${y}px;`;
            lewTooltipIconStyle.value = `left:${ix}px;top:${iy}px;`;
            break;
        case 'left':
            x = lewTooltipWraDom.offsetLeft - lewTooltipDom.offsetWidth - 15;
            y =
                lewTooltipWraDom.offsetTop +
                lewTooltipWraDom.offsetHeight * 0.5 -
                lewTooltipDom.offsetHeight * 0.5;
            ix = x + lewTooltipDom.offsetWidth - 8;
            iy = y + lewTooltipDom.offsetHeight / 2 - 6;
            lewTooltipStyle.value = `left:${x}px;top:${y}px;`;
            lewTooltipIconStyle.value = `left:${ix}px;top:${iy}px;`;
            break;
        case 'right':
            x = lewTooltipWraDom.offsetLeft + lewTooltipWraDom.offsetWidth + 15;
            y =
                lewTooltipWraDom.offsetTop +
                lewTooltipWraDom.offsetHeight * 0.5 -
                lewTooltipDom.offsetHeight * 0.5;
            ix = x - 4;
            iy = y + lewTooltipDom.offsetHeight / 2 - 6;
            lewTooltipStyle.value = `left:${x}px;top:${y}px;`;
            lewTooltipIconStyle.value = `left:${ix}px;top:${iy}px;`;
            break;
        default:
            break;
    }
};

const clickOpenTips = () => {
    if (props.trigger == 'click') {
        clearTimeout(isShowTimer);
        isShow.value = !isShow.value;
    }
};

const hoverOpenTips = () => {
    clearTimeout(isShowTimer);
    if (props.trigger == 'hover') {
        isShow.value = true;
    }
};

const closeFn = () => {
    clearTimeout(isShowTimer);
    isShowTimer = setTimeout(() => {
        isShow.value = false;
    }, 250);
};

onMounted(() => {
    init();
    window.addEventListener('resize', function () {
        clearTimeout(onresizeTimer);
        onresizeTimer = setTimeout(() => {
            init();
        }, 150);
    });
});
</script>

<template>
    <div
        ref="lewTooltipWraRef"
        class="lew-tooltip-wrapper"
        @click="clickOpenTips"
        @mouseleave="closeFn"
        @mouseenter="hoverOpenTips"
    >
        <div
            class="lew-tooltip-box"
            :class="`${lewTooltipIconStyle ? 'lew-tooltip-' + placement : ''} ${
                isShow ? 'lew-tooltip-box-show' : ''
            }`"
        >
            <div :style="lewTooltipIconStyle" class="lew-tooltip-icon"></div>
            <div
                ref="lewTooltipRef"
                class="lew-tooltip"
                :style="lewTooltipStyle"
            >
                {{ tips }}
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.lew-tooltip-wrapper {
    position: relative;
    display: inline-block;

    .lew-tooltip {
        position: fixed;
        display: inline;
        width: auto;
        height: auto;
        max-width: 250px;
        box-shadow: 0 2px 50px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        padding: 12px;
        box-sizing: border-box;
        background: var(--body-bgcolor);
        z-index: 9;
        font-size: 13px;
        color: var(--text-color);
        transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
    }

    .lew-tooltip-icon {
        position: fixed;
        content: '';
        width: 12px;
        height: 12px;
        z-index: 999;
        background: var(--body-bgcolor);
        border-radius: 3px;
        transition: all 0.15s cubic-bezier(0.65, 0, 0.35, 1);
    }
    .lew-tooltip-box {
        opacity: 0;
        position: fixed;
        z-index: -1;
        transition: all 0.15s cubic-bezier(0.65, 0, 0.35, 1);
    }
    .lew-tooltip-left {
        .lew-tooltip {
            transform: translate(10px, 0px);
        }
        .lew-tooltip-icon {
            transform: rotate(-45deg) translate(10px, 0px);
        }
    }
    .lew-tooltip-right {
        .lew-tooltip {
            transform: translate(-10px, 0px);
        }
        .lew-tooltip-icon {
            transform: rotate(-45deg) translate(-10px, 0px);
        }
    }
    .lew-tooltip-top {
        .lew-tooltip {
            transform: translate(0, 10px);
        }
        .lew-tooltip-icon {
            transform: rotate(-45deg) translate(0px, 10px);
        }
    }
    .lew-tooltip-bottom {
        .lew-tooltip {
            transform: translate(0px, -10px);
        }
        .lew-tooltip-icon {
            transform: rotate(-45deg) translate(0px, -10px);
        }
    }

    .lew-tooltip-box-show {
        opacity: 1;
        z-index: 99;
        .lew-tooltip {
            transform: translate(0px, 0px);
        }
        .lew-tooltip-icon {
            transform: rotate(-45deg) translate(0px, 0px);
        }
    }
}
</style>
