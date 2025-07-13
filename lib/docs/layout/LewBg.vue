<script setup lang="ts"></script>

<template>
  <div class="bg-wrapper">
    <div class="g-bg">
      <div class="g-polygon g-polygon-1"></div>
      <div class="g-polygon g-polygon-2"></div>
      <div class="g-polygon g-polygon-3"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
}
.g-polygon {
  position: absolute;
  opacity: 0.5;
  animation: moveAndRotate 20s infinite alternate;
}
.g-polygon-1 {
  position: absolute;
  left: 20vw;
  top: 10vh;
  z-index: 1;
  width: 50vw;
  height: 20vh;
  transform: rotate(30deg);
  background: #0077ff;
  clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
  animation-delay: 0s;
}

.g-polygon-2 {
  position: absolute;
  left: 0;
  bottom: 10vh;
  z-index: 1;
  width: 50vw;
  height: 20vh;
  transform: rotate(-10deg);
  background: #ff006f;
  clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
  animation-delay: -5s;
}

.g-polygon-3 {
  position: absolute;
  right: 0;
  bottom: 10vh;
  z-index: 1;
  width: 50vw;
  height: 20vh;
  transform: rotate(80deg);
  background: rgb(200, 0, 255);
  clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
  animation-delay: -10s;
}
.g-bg::before {
  position: fixed;
  content: '';
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(150px);
  background-color: rgba($color: #fff, $alpha: 0.9);
  z-index: 5;
}

.lew-dark {
  .g-bg::before {
    background-color: rgba($color: #000000, $alpha: 0.4);
  }
}

@keyframes moveAndRotate {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10vw, 10vh) rotate(90deg);
  }
  50% {
    transform: translate(-5vw, -5vh) rotate(180deg);
  }
  75% {
    transform: translate(-10vw, 5vh) rotate(270deg);
  }
  100% {
    transform: translate(5vw, -10vh) rotate(360deg);
  }
}
</style>
