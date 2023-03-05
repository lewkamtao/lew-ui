<script setup lang="ts">
import { _props } from './props';
import { getPx } from 'lew-ui/utils';

const props = defineProps(_props);

const { round, width, height, status, statusPosition, errorSrc } = props;

let loading = ref(true);
let imgRef = ref<HTMLImageElement>();
let count = 8000;
let speed = 500;
let loadErr = ref(false);
let imgSrc = ref(props.src);

watch(
    () => props.src,
    () => {
        if (props.src) {
            imgSrc.value = props.src;
            setImg();
        }
    }
);

onMounted(() => {
    setImg();
});

const setImg = () => {
    var timer = setInterval(function () {
        count -= speed;
        if (count < 0) {
            loading.value = false;
            loadErr.value = true;
            clearInterval(timer);
        }
        if (imgRef.value?.complete) {
            loading.value = false;
            //判断图片是否加载完成
            clearInterval(timer);
            //图片加载完成，写入对应的请求
        }
    }, speed);
};

const imgOnError = () => {
    imgSrc.value = errorSrc;
};

const imageClassObject = computed(() => {
    return {
        'lew-avatar-round': round,
        skeletons: loading.value && !loadErr.value,
    };
});

const styleObject = computed(() => {
    return {
        width: getPx(width),
        height: getPx(height),
    };
});

const dotClassObject = computed(() => {
    return {
        [`dot-${status}`]: status,
        [`dot-${statusPosition}`]: statusPosition,
    };
});
</script>

<template>
    <div class="lew-avatar" :style="styleObject">
        <div class="lew-avatar-box" :class="imageClassObject">
            <img
                v-if="imgSrc"
                ref="imgRef"
                v-show="!loading"
                :src="imgSrc"
                :onerror="imgOnError"
                :alt="alt"
                lazy
            />
        </div>
        <span v-if="status" class="dot" :class="dotClassObject"> </span>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    position: relative;
    display: inline-block;

    .lew-avatar-box {
        width: 100%;
        height: 100%;
        border-radius: var(--lew-border-radius);
        overflow: hidden;
        background-color: #eee;
    }

    img {
        width: 100%;
        height: 100%;
        background-color: var(--lew-bgcolor-2);
        border-radius: var(--lew-border-radius);
    }

    .dot {
        position: absolute;
        top: -0.3rem;
        left: -0.3rem;
        content: '';
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        z-index: 99;
        border: 2px var(--lew-white-color) solid;
    }

    .dot-online {
        background-color: var(--lew-success-color);
    }

    .dot-busy {
        background-color: var(--lew-error-color);
    }

    .dot-offline {
        background-color: var(--lew-normal-color-dark);
    }

    .dot-processing {
        background-color: var(--lew-info-color);
    }

    .dot-away {
        background-color: var(--lew-warning-color);
    }

    .dot-top-left {
        top: -0.25rem;
        left: -0.25rem;
    }

    .dot-top-right {
        top: -0.25rem;
        left: auto;
        right: -0.25rem;
    }

    .dot-bottom-left {
        top: auto;
        bottom: -0.25rem;
        left: -0.25rem;
    }

    .dot-bottom-right {
        top: auto;
        bottom: -0.25rem;
        left: auto;
        right: -0.25rem;
    }
}
.lew-avatar-round.lew-avatar-box {
    border-radius: 50%;
}
</style>
