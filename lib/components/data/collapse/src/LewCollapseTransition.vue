<script setup lang="ts">
import { computed, ref, watch } from "vue";

type DimensionType = "height" | "width";
type CachedStyles = Record<string, string> | null;

interface Props {
  name?: string;
  dimension?: DimensionType;
  duration?: number;
  easing?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "collapse",
  dimension: "height",
  duration: 150,
  easing: "ease-in-out",
});

const emit = defineEmits<{
  beforeAppear: [el: Element];
  appear: [el: Element];
  afterAppear: [el: Element];
  appearCancelled: [el: Element];
  beforeEnter: [el: Element];
  enter: [el: Element, done: () => void];
  afterEnter: [el: Element];
  enterCancelled: [el: Element];
  beforeLeave: [el: Element];
  leave: [el: Element, done: () => void];
  afterLeave: [el: Element];
  leaveCancelled: [el: Element];
}>();

// Data
const cachedStyles = ref<CachedStyles>(null);

// Computed
const transition = computed(() => {
  if (!cachedStyles.value) return "";

  const transitions: string[] = [];
  Object.keys(cachedStyles.value).forEach((key) => {
    transitions.push(`${convertToCssProperty(key)} ${props.duration}ms ${props.easing}`);
  });

  return transitions.join(", ");
});

// Watch
watch(
  () => props.dimension,
  () => {
    clearCachedDimensions();
  }
);

// Methods
function beforeAppear(el: Element) {
  emit("beforeAppear", el);
}

function appear(el: Element) {
  emit("appear", el);
}

function afterAppear(el: Element) {
  emit("afterAppear", el);
}

function appearCancelled(el: Element) {
  emit("appearCancelled", el);
}

function beforeEnter(el: Element) {
  emit("beforeEnter", el);
}

function enter(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement;
  // Because width and height may be 'auto',
  // first detect and cache the dimensions
  detectAndCacheDimensions(htmlEl);

  // The order of applying styles is important:
  // - 1. Set styles for state before transition
  // - 2. Force repaint
  // - 3. Add transition style
  // - 4. Set styles for state after transition
  // If the order is not right and you open any 2nd level submenu
  // for the first time, the transition will not work.
  setClosedDimensions(htmlEl);
  hideOverflow(htmlEl);
  forceRepaint(htmlEl);
  setTransition(htmlEl);
  setOpenedDimensions(htmlEl);

  emit("enter", el, done);

  // Call done() when the transition ends
  // to trigger the @after-enter event.
  setTimeout(done, props.duration);
}

function afterEnter(el: Element) {
  const htmlEl = el as HTMLElement;
  // Clean up inline styles
  unsetOverflow(htmlEl);
  unsetTransition(htmlEl);
  unsetDimensions(htmlEl);
  clearCachedDimensions();

  emit("afterEnter", el);
}

function enterCancelled(el: Element) {
  emit("enterCancelled", el);
}

function beforeLeave(el: Element) {
  emit("beforeLeave", el);
}

function leave(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement;
  // For some reason, @leave triggered when starting
  // from open state on page load. So for safety,
  // check if the dimensions have been cached.
  detectAndCacheDimensions(htmlEl);

  // The order of applying styles is less important
  // than in the enter phase, as long as we repaint
  // before setting the closed dimensions.
  // But it is probably best to use the same
  // order as the enter phase.
  setOpenedDimensions(htmlEl);
  hideOverflow(htmlEl);
  forceRepaint(htmlEl);
  setTransition(htmlEl);
  setClosedDimensions(htmlEl);

  emit("leave", el, done);

  // Call done() when the transition ends
  // to trigger the @after-leave event.
  // This will also cause v-show
  // to reapply 'display: none'.
  setTimeout(done, props.duration);
}

function afterLeave(el: Element) {
  const htmlEl = el as HTMLElement;
  // Clean up inline styles
  unsetOverflow(htmlEl);
  unsetTransition(htmlEl);
  unsetDimensions(htmlEl);
  clearCachedDimensions();

  emit("afterLeave", el);
}

function leaveCancelled(el: Element) {
  emit("leaveCancelled", el);
}

function detectAndCacheDimensions(el: HTMLElement) {
  // Cache actual dimensions
  // only once to void invalid values when
  // triggering during a transition
  if (cachedStyles.value) return;

  const visibility = el.style.visibility;
  const display = el.style.display;

  // Trick to get the width and
  // height of a hidden element
  el.style.visibility = "hidden";
  el.style.display = "";

  cachedStyles.value = detectRelevantDimensions(el);

  // Restore any original styling
  el.style.visibility = visibility;
  el.style.display = display;
}

function clearCachedDimensions() {
  cachedStyles.value = null;
}

function detectRelevantDimensions(el: HTMLElement): Record<string, string> {
  // These properties will be transitioned
  if (props.dimension === "height") {
    return {
      height: `${el.offsetHeight}px`,
      opacity: "1",
      paddingTop: el.style.paddingTop || getCssValue(el, "padding-top"),
      paddingBottom: el.style.paddingBottom || getCssValue(el, "padding-bottom"),
    };
  }

  if (props.dimension === "width") {
    return {
      width: `${el.offsetWidth}px`,
      opacity: "1",
      paddingLeft: el.style.paddingLeft || getCssValue(el, "padding-left"),
      paddingRight: el.style.paddingRight || getCssValue(el, "padding-right"),
    };
  }

  return {};
}

function setTransition(el: HTMLElement) {
  el.style.transition = transition.value;
}

function unsetTransition(el: HTMLElement) {
  el.style.transition = "";
}

function hideOverflow(el: HTMLElement) {
  el.style.overflow = "hidden";
}

function unsetOverflow(el: HTMLElement) {
  el.style.overflow = "";
}

function setClosedDimensions(el: HTMLElement) {
  if (!cachedStyles.value) return;
  Object.keys(cachedStyles.value).forEach((key) => {
    (el.style as any)[key] = "0";
  });
}

function setOpenedDimensions(el: HTMLElement) {
  if (!cachedStyles.value) return;
  Object.keys(cachedStyles.value).forEach((key) => {
    (el.style as any)[key] = cachedStyles.value![key];
  });
}

function unsetDimensions(el: HTMLElement) {
  if (!cachedStyles.value) return;
  Object.keys(cachedStyles.value).forEach((key) => {
    (el.style as any)[key] = "";
  });
}

function forceRepaint(el: HTMLElement) {
  // Force repaint to make sure the animation is triggered correctly.
  // Thanks: https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
  void getComputedStyle(el)[props.dimension as keyof CSSStyleDeclaration];
}

function getCssValue(el: Element, style: string): string {
  return getComputedStyle(el, null).getPropertyValue(style);
}

function convertToCssProperty(style: string): string {
  // Example: convert 'paddingTop' to 'padding-top'
  // Thanks: https://gist.github.com/tan-yuki/3450323
  const upperChars = style.match(/([A-Z])/g);

  if (!upperChars) {
    return style;
  }

  for (let i = 0, n = upperChars.length; i < n; i++) {
    style = style.replace(new RegExp(upperChars[i]), `-${upperChars[i].toLowerCase()}`);
  }

  if (style.slice(0, 1) === "-") {
    style = style.slice(1);
  }

  return style;
}
</script>

<template>
  <transition
    :name="props.name"
    @before-appear="beforeAppear"
    @appear="appear"
    @after-appear="afterAppear"
    @appear-cancelled="appearCancelled"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <slot />
  </transition>
</template>
