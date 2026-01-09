<script setup lang="ts">
import { renderDescription } from "docs/lib/utils";
import docsLocale from "docs/locals";
import RenderComponent from "lew-ui/_components/RenderComponent.vue";
import { Check, Code2, Copy, ExternalLink } from "lucide-vue-next";
import LewCodeHighlighter from "./LewCodeHighlighter.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "",
  },
  tipsContent: {
    type: String,
    default: "",
  },
  tipsType: {
    type: String,
    default: "info",
  },
  tipsTitle: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    default: "",
  },
  demoIndex: {
    type: Number,
    default: -1,
  },
  componentName: {
    type: String,
    default: "",
  },
});

const router = useRouter();

function getStandaloneDemoUrl() {
  if (props.demoIndex >= 0 && props.componentName) {
    const componentPath = props.componentName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    const path = `/${componentPath}/demo_${props.demoIndex + 1}`;
    return router.resolve(path).href;
  }
  return "#";
}

// 状态
const isShowCode = ref(false);
const isCodeLoading = ref(false);
const isCodeRendering = ref(false);
const isCopied = ref(false);

// 最小 loading 时间
const MIN_LOADING_TIME = 300;

let codeMountedResolve: (() => void) | null = null;

function onCodeMounted() {
  if (codeMountedResolve) {
    codeMountedResolve();
    codeMountedResolve = null;
  }
}

async function toggleCodeDisplay() {
  if (isShowCode.value) {
    isShowCode.value = false;
    // 延迟清理，等待动画完成
    setTimeout(() => {
      if (!isShowCode.value) {
        isCodeRendering.value = false;
      }
    }, 350);
  } else {
    isCodeLoading.value = true;
    isCodeRendering.value = true;

    const minLoadingPromise = new Promise<void>((resolve) =>
      setTimeout(resolve, MIN_LOADING_TIME)
    );
    const codeMountedPromise = new Promise<void>((resolve) => {
      codeMountedResolve = resolve;
    });

    await Promise.all([minLoadingPromise, codeMountedPromise]);

    isCodeLoading.value = false;
    isShowCode.value = true;
  }
}

const checkHasContent = computed(() => (text: string) =>
  text && text.indexOf("components.") !== 0
);

async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code);
    isCopied.value = true;
    LewMessage.success(docsLocale.t("base.copySuccess"));
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    isCopied.value = true;
  }
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="demo-box">
    <!-- 标题区域 -->
    <div class="demo-header">
      <lew-title :id="title" size="18px" class="demo-title">
        {{ title }}
      </lew-title>
      <lew-tag v-if="checkHasContent(tag)" type="light" color="blue" size="small">
        {{ tag }}
      </lew-tag>
    </div>

    <!-- 提示信息 -->
    <lew-alert
      v-if="checkHasContent(tipsContent)"
      :type="checkHasContent(tipsType) ? tipsType : 'info'"
      :title="tipsTitle"
      :content="tipsContent"
      class="demo-alert"
    />

    <!-- 描述区域 -->
    <div v-if="checkHasContent(description)" class="demo-desc">
      <RenderComponent :render-fn="renderDescription(description)" />
    </div>

    <!-- Demo 卡片 -->
    <div class="demo-card">
      <!-- 右上角工具按钮 -->
      <div class="card-actions">
        <!-- 展开代码按钮 -->
        <button
          v-if="code"
          class="action-btn"
          :class="{ 'action-btn--active': isShowCode }"
          :disabled="isCodeLoading"
          :title="isShowCode ? docsLocale.t('base.close') : docsLocale.t('base.showCode')"
          @click="toggleCodeDisplay"
        >
          <Code2 :size="15" />
        </button>

        <!-- 新窗口打开 -->
        <a
          v-if="demoIndex >= 0 && componentName"
          class="action-btn"
          :href="getStandaloneDemoUrl()"
          target="_blank"
          rel="noopener noreferrer"
          title="在新窗口打开"
        >
          <ExternalLink :size="15" />
        </a>
      </div>

      <!-- Demo 内容区域 -->
      <div class="demo-content lew-scrollbar">
        <slot />
      </div>

      <!-- Loading 进度条 - 在代码块上方 -->
      <div v-if="isCodeLoading" class="code-loading">
        <div class="code-loading-bar" />
      </div>

      <!-- 代码区域 - 使用 grid 动画实现平滑展开 -->
      <div
        v-if="isCodeRendering && code"
        class="code-wrapper"
        :class="{ 'code-wrapper--expanded': isShowCode }"
      >
        <div class="code-inner">
          <div class="code-container">
            <!-- 复制按钮 -->
            <button
              class="code-copy-btn"
              :class="{ 'code-copy-btn--copied': isCopied }"
              @click="copyCode(code)"
            >
              <Check v-if="isCopied" :size="14" />
              <Copy v-else :size="14" />
            </button>
            <div class="code-scroll lew-scrollbar">
              <LewCodeHighlighter :code="code" lang="vue" @vue:mounted="onCodeMounted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-box {
  margin: 32px 0;
}

// 标题区域
.demo-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.demo-title {
  text-transform: capitalize;
}

// 提示信息
.demo-alert {
  margin-bottom: 12px;
}

// 描述区域
.demo-desc {
  margin-bottom: 16px;
  color: var(--lew-text-color-5);
  font-size: 14px;
  line-height: 1.6;
}

// Demo 卡片
.demo-card {
  position: relative;
  background-color: var(--lew-bgcolor-0);
  border-radius: var(--lew-border-radius-small);
  border: 1px solid var(--lew-border-color-2);
  transition: border-color 0.2s ease;
  box-shadow: var(--lew-box-shadow);

  &:hover {
    border-color: var(--lew-border-color-3);
  }
}

// 右上角工具按钮
.card-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: var(--lew-bgcolor-2);
  border: 1px solid var(--lew-border-color-3);
  border-radius: var(--lew-border-radius-small);
  color: var(--lew-text-color-3);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: var(--lew-bgcolor-3);
    color: var(--lew-text-color-1);
    border-color: var(--lew-border-color-4);
  }

  &:active {
    transform: scale(0.95);
  }

  &--active {
    color: var(--lew-color-primary);
    border-color: var(--lew-color-primary);
    background-color: var(--lew-color-primary-light);

    &:hover {
      background-color: var(--lew-color-primary-light);
      border-color: var(--lew-color-primary-dark);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Demo 内容区域
.demo-content {
  padding: 48px 32px 32px;
  overflow-x: auto;
  background-color: var(--lew-bgcolor-0);
  border-radius: var(--lew-border-radius-small);
}

// Loading 进度条
.code-loading {
  height: 2px;
  background-color: var(--lew-bgcolor-3);
  overflow: hidden;
  position: relative;
}

.code-loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  background: linear-gradient(
    90deg,
    var(--lew-color-primary-light),
    var(--lew-color-primary),
    var(--lew-color-primary-light)
  );
  animation: loading-slide 1s ease-in-out infinite;
}

@keyframes loading-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

// 代码区域
.code-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  &--expanded {
    grid-template-rows: 1fr;
  }
}

.code-inner {
  overflow: hidden;
}

.code-container {
  position: relative;
  border-top: 1px solid rgba($color: #555, $alpha: 0.45);
}

.code-scroll {
  max-height: 500px;
  overflow: auto;
}

.code-copy-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--lew-bgcolor-2);
  border: 1px solid var(--lew-border-color-2);
  border-radius: var(--lew-border-radius-small);
  color: var(--lew-text-color-5);
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;

  .code-container:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: var(--lew-bgcolor-3);
    color: var(--lew-text-color-3);
    border-color: var(--lew-border-color-3);
  }

  &:active {
    transform: scale(0.95);
  }

  &--copied {
    color: var(--lew-color-success);
    border-color: var(--lew-color-success-light);
    background-color: var(--lew-color-success-light);
    opacity: 1;
  }
}

// 响应式
@media (max-width: 767px) {
  .demo-content {
    padding: 40px 20px 20px;
  }
}
</style>
