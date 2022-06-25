<script setup lang="ts">
defineProps({
    round: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: '',
    },
    statusPosition: {
        type: String,
        default: '',
    },
    src: {
        type: String,
        default: '',
    },
    alt: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div class="lew-avatar">
        <img :src="src" :class="{ round: round }" :alt="alt" />
        <span
            v-if="status"
            class="dot"
            :class="`dot-${status} dot-${statusPosition}`"
        >
        </span>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;

    img {
        width: 100%;
        height: 100%;
        border-radius: var(--lew-border-radius);
    }

    .round {
        border-radius: 50%;
    }

    .dot {
        position: absolute;
        top: -0.25rem;
        left: -0.25rem;
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
</style>
