<script setup lang="ts">
import Plyr from 'plyr';
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
    src: {
        type: String,
        default:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
    },
});
let playerRef: any = ref(null);
let player: any;

onMounted(() => {
    player = new Plyr(playerRef.value, {
        settings: ['quality', 'speed', 'loop'],
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'pip',
            'airplay',
            'fullscreen',
        ],
        keyboard: { focused: true, global: false },
    });
});

onUnmounted(() => {
    player.destroy();
});
</script>

<template>
    <video
        id="player"
        ref="playerRef"
        playsinline
        controls
        data-poster="/path/to/poster.jpg"
    >
        <source :src="src" type="video/mp4" />
        <source :src="src" type="video/webm" />
        <!-- Captions are optional -->
        <track
            kind="captions"
            label="English captions"
            src="/path/to/captions.vtt"
            srclang="en"
            default
        />
    </video>
</template>

<style lang="scss" scoped>
.lew-fancy-img {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;

    img {
        width: 100%;
        height: 100%;
        border-radius: var(--lew-border-radius);
    }

    .round {
        border-radius: 50%;
    }
}
</style>
