<script setup lang="ts">
import { LewButton, LewDrawer } from 'lew-ui'
import { Check, Copy } from 'lucide-vue-next'

const props = defineProps<{
  visible: boolean
  mdcPath: string
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const visible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value),
})

const mdcContent = ref<string>('')
const rawContent = ref<string>('') // 保存原始内容用于复制
const loading = ref(false)
const error = ref<string>('')
const hasMarkdownIt = ref(false)
const isCopied = ref(false)

// 使用 markdown-it 渲染 markdown
let markdownIt: any = null

// 初始化 markdown-it
async function initMarkdownIt() {
  try {
    // 动态导入 markdown-it
    // @ts-expect-error markdown-it 可能未安装，有降级处理
    const markdownItModule = await import('markdown-it')
    // markdown-it 在 ES 模块中的导出方式
    // 可能是 default 导出，也可能是命名导出，或者直接就是构造函数
    let MarkdownIt: any = null
    if (markdownItModule.default) {
      MarkdownIt = markdownItModule.default
    }
    else if (typeof markdownItModule === 'function') {
      MarkdownIt = markdownItModule
    }
    else {
      // 尝试从模块中获取
      MarkdownIt = (markdownItModule as any).MarkdownIt || markdownItModule
    }

    if (MarkdownIt && typeof MarkdownIt === 'function') {
      // 创建 markdown-it 实例，启用 GFM 和换行
      markdownIt = new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
      })
      hasMarkdownIt.value = true
      console.log('[LewMdcDrawer] markdown-it initialized successfully', {
        hasMarkdownIt: hasMarkdownIt.value,
        markdownItType: typeof markdownIt,
        renderType: typeof markdownIt?.render,
      })
    }
    else {
      console.warn('[LewMdcDrawer] MarkdownIt is not a constructor', {
        MarkdownItType: typeof MarkdownIt,
        moduleKeys: Object.keys(markdownItModule),
      })
      hasMarkdownIt.value = false
    }
  }
  catch (err) {
    console.warn('[LewMdcDrawer] markdown-it library not found, using plain text', err)
    hasMarkdownIt.value = false
  }
}

onMounted(() => {
  initMarkdownIt()
})

// 尝试加载 mdc 文件的多个可能路径
async function tryLoadMdc(paths: string[]): Promise<string | null> {
  for (const path of paths) {
    try {
      const mdcModule = await import(/* @vite-ignore */ `${path}?raw`)
      return mdcModule.default || mdcModule
    }
    catch {
      // 继续尝试下一个路径
      continue
    }
  }
  return null
}

// 渲染 markdown 内容
function renderMarkdown(content: string) {
  if (markdownIt && hasMarkdownIt.value && typeof markdownIt.render === 'function') {
    try {
      // 使用 markdown-it 渲染 markdown
      const html = markdownIt.render(content)
      mdcContent.value = typeof html === 'string' ? html : String(html)
      console.log('[LewMdcDrawer] Markdown rendered successfully', {
        contentLength: content.length,
        htmlLength: mdcContent.value.length,
        hasMarkdownIt: hasMarkdownIt.value,
        markdownItExists: !!markdownIt,
        renderMethodExists: typeof markdownIt.render === 'function',
      })
    }
    catch (parseErr) {
      console.error('[LewMdcDrawer] Failed to parse markdown:', parseErr)
      // 如果解析失败，降级显示原始内容
      mdcContent.value = content
    }
  }
  else {
    console.warn('[LewMdcDrawer] markdown-it not available', {
      hasMarkdownIt: hasMarkdownIt.value,
      markdownItExists: !!markdownIt,
      renderMethodExists: markdownIt ? typeof markdownIt.render === 'function' : false,
    })
    mdcContent.value = content
  }
}

// 加载 mdc 文件
watch(
  () => props.mdcPath,
  async (newPath) => {
    if (!newPath) {
      mdcContent.value = ''
      rawContent.value = ''
      return
    }

    loading.value = true
    error.value = ''

    try {
      // 直接从传入的路径加载（getMdcPath 已经返回了正确的路径）
      const loadedContent = await tryLoadMdc([newPath])

      if (!loadedContent) {
        // 从路径中提取组件名用于错误提示
        const componentName = newPath.split('/').slice(-2, -1)[0] || 'unknown'
        throw new Error(`MDC file not found for component: ${componentName}`)
      }

      // 移除 frontmatter（--- 之间的内容）
      const rawText = typeof loadedContent === 'string' ? loadedContent : String(loadedContent)
      let content = rawText
      const frontmatterRegex = /^---\n[\s\S]*?\n---\n/
      content = content.replace(frontmatterRegex, '')

      // 保存原始内容用于复制
      rawContent.value = content

      // 渲染 markdown
      renderMarkdown(content)
    }
    catch (err: any) {
      error.value = err?.message || 'Failed to load MDC file'
      console.error('[LewMdcDrawer] Failed to load MDC:', err)
    }
    finally {
      loading.value = false
    }
  },
  { immediate: true },
)

// 当 markdown-it 初始化完成后，重新渲染内容
watch(hasMarkdownIt, (newVal) => {
  if (newVal && rawContent.value) {
    console.log('[LewMdcDrawer] markdown-it ready, re-rendering content')
    renderMarkdown(rawContent.value)
  }
})

function handleClose() {
  visible.value = false
}

// 复制 mdc 内容
async function copyMdcContent() {
  if (!rawContent.value)
    return

  try {
    await navigator.clipboard.writeText(rawContent.value)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
  catch (err) {
    console.error('复制失败:', err)
    // 降级方案：使用传统的复制方法
    const textArea = document.createElement('textarea')
    textArea.value = rawContent.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
}
</script>

<template>
  <!-- eslint-disable vue/component-name-in-template-casing -->
  <lew-drawer
    v-model:visible="visible"
    title="组件文档 (MDC)"
    position="right"
    width="60%"
    :close-on-click-overlay="true"
    :close-by-esc="true"
    :hide-footer="true"
    @close="handleClose"
  >
    <div class="mdc-drawer-content">
      <div v-if="loading" class="mdc-loading">
        加载中...
      </div>
      <div v-else-if="error" class="mdc-error">
        <p>加载失败: {{ error }}</p>
        <p>请确保 MDC 文件路径正确</p>
      </div>
      <div v-else-if="mdcContent" class="mdc-content" :class="{ 'mdc-html': hasMarkdownIt }">
        <div v-if="hasMarkdownIt" v-html="mdcContent" />
        <pre v-else>{{ mdcContent }}</pre>
      </div>
      <div v-else class="mdc-empty">
        暂无内容
      </div>
    </div>
    <template #footer>
      <div class="mdc-drawer-footer">
        <lew-button
          v-if="rawContent"
          type="light"
          color="normal"
          size="small"
          @click="copyMdcContent"
        >
          <Check v-if="isCopied" :size="16" class="copy-icon success" />
          <Copy v-else :size="16" class="copy-icon" />
          <span style="margin-left: 6px">{{ isCopied ? '已复制' : '复制 MDC 内容' }}</span>
        </lew-button>
      </div>
    </template>
  </lew-drawer>
</template>

<style lang="scss" scoped>
.mdc-drawer-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 20px;
  border-top: 1px solid var(--lew-border-color);

  .copy-icon {
    transition: color 0.2s;

    &.success {
      color: var(--lew-color-success);
    }
  }
}

.mdc-drawer-content {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}

.mdc-loading,
.mdc-error,
.mdc-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--lew-text-color-2);
}

.mdc-error {
  flex-direction: column;
  gap: 10px;
  color: var(--lew-color-error);
}

.mdc-content {
  line-height: 1.8;
  color: var(--lew-text-color-1);

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
    color: var(--lew-text-color-0);
  }

  :deep(h1) {
    font-size: 2em;
    border-bottom: 1px solid var(--lew-border-color);
    padding-bottom: 10px;
  }

  :deep(h2) {
    font-size: 1.5em;
    border-bottom: 1px solid var(--lew-border-color);
    padding-bottom: 8px;
  }

  :deep(h3) {
    font-size: 1.25em;
  }

  :deep(p) {
    margin-bottom: 16px;
  }

  :deep(ul),
  :deep(ol) {
    margin-bottom: 16px;
    padding-left: 30px;
  }

  :deep(li) {
    margin-bottom: 8px;
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
    border: 1px solid var(--lew-border-color);
  }

  :deep(th),
  :deep(td) {
    padding: 12px;
    text-align: left;
    border: 1px solid var(--lew-border-color);
  }

  :deep(th) {
    background-color: var(--lew-bgcolor-1);
    font-weight: 600;
  }

  :deep(tr:nth-child(even)) {
    background-color: var(--lew-bgcolor-0);
  }

  :deep(code) {
    padding: 2px 6px;
    background-color: var(--lew-bgcolor-1);
    border-radius: 4px;
    font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
    font-size: 0.9em;
  }

  :deep(pre) {
    padding: 16px;
    background-color: var(--lew-bgcolor-1);
    border-radius: var(--lew-border-radius-small);
    overflow-x: auto;
    margin-bottom: 16px;

    code {
      padding: 0;
      background-color: transparent;
    }
  }

  :deep(blockquote) {
    margin: 16px 0;
    padding: 0 16px;
    border-left: 4px solid var(--lew-color-primary);
    color: var(--lew-text-color-2);
  }

  :deep(hr) {
    margin: 24px 0;
    border: none;
    border-top: 1px solid var(--lew-border-color);
  }

  :deep(a) {
    color: var(--lew-color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(strong) {
    font-weight: 600;
  }

  :deep(em) {
    font-style: italic;
  }
}

.mdc-content:not(.mdc-html) {
  white-space: pre-wrap;
  font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
  font-size: 14px;
}
</style>
