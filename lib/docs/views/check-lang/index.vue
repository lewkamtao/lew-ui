<script setup lang="ts">
import { messages, Language } from '../../locals/index';
import { en, zh, de, pt, fr, it, es, ko, ja } from '../../../locals/index';
import { ref, computed } from 'vue';
import { useDark } from '@vueuse/core';
useDark({
  selector: 'html',
  valueDark: 'lew-dark',
  valueLight: 'lew-light',
});
const docs_langs = messages;
const component_langs = { en, zh, de, pt, fr, it, es, ko, ja };

// 配置文件来源类型
type ConfigSource = 'docs' | 'component';

// 当前选择的配置文件来源
const currentSource = ref<ConfigSource>('docs');

// 根据当前来源获取语言配置
const currentLangs = computed(() => {
  return currentSource.value === 'docs' ? docs_langs : component_langs;
});

// 以中文为基准语言
const baseLanguage = 'zh';
const baseMessages = computed(() => currentLangs.value[baseLanguage]);

// 存储所有差异结果
const diffResults = ref<Record<string, string[]>>({});

// 可选语言列表，按差异数量从多到少排序
const languages = computed(() => {
  const langs = Object.keys(currentLangs.value).filter(
    (lang) => lang !== baseLanguage
  ) as Language[];

  // 按差异数量从多到少排序
  return langs.sort((a, b) => {
    const countA = diffResults.value[a]?.length || 0;
    const countB = diffResults.value[b]?.length || 0;
    return countB - countA;
  });
});

// 递归比较对象差异，检查键是否存在，并标记多余的键
function compareObjects(base: any, target: any, path = ''): string[] {
  const differences: string[] = [];

  // 检查基准对象中的所有键
  for (const key in base) {
    const currentPath = path ? `${path}.${key}` : key;

    // 目标对象中不存在该键
    if (!(key in target)) {
      differences.push(`缺失: ${currentPath}`);
      continue;
    }

    // 如果是对象，递归比较
    if (
      typeof base[key] === 'object' &&
      base[key] !== null &&
      typeof target[key] === 'object' &&
      target[key] !== null
    ) {
      differences.push(...compareObjects(base[key], target[key], currentPath));
    }
  }

  // 检查目标对象中多余的键
  for (const key in target) {
    const currentPath = path ? `${path}.${key}` : key;

    // 基准对象中不存在该键
    if (!(key in base)) {
      differences.push(`多余: ${currentPath}`);
    }
  }

  return differences;
}

// 执行比较并生成结果
function generateDiff() {
  diffResults.value = {};

  Object.keys(currentLangs.value)
    .filter((lang) => lang !== baseLanguage)
    .forEach((lang) => {
      const targetMessages = currentLangs.value[lang as Language];
      const differences = compareObjects(baseMessages.value, targetMessages);
      diffResults.value[lang as Language] = differences;
    });
}

// 切换配置文件来源
function changeSource(source: ConfigSource) {
  currentSource.value = source;
  generateDiff();
  // 重置当前选择的语言为第一个语言
  if (languages.value.length > 0) {
    currentLang.value = languages.value[0];
  }
}

// 初始化时生成差异
generateDiff();

// 当前选择的语言，初始化为第一个语言
const currentLang = ref<Language>(languages.value[0] || 'en');

// 切换语言
function changeLang(lang: Language) {
  currentLang.value = lang;
}

// 获取当前语言的差异数量
const currentDiffCount = computed(() => {
  return diffResults.value[currentLang.value]?.length || 0;
});

// 获取差异类型的样式
function getDiffItemClass(diff: string): string {
  if (diff.startsWith('缺失:')) {
    return 'missing';
  } else if (diff.startsWith('多余:')) {
    return 'extra';
  }
  return '';
}

// 复制所有差异信息
async function copyAllDifferences() {
  let copyText = ``;

  // 只复制当前激活语言的差异信息
  const differences = diffResults.value[currentLang.value];
  if (differences && differences.length > 0) {
    copyText += `发现 ${currentLang.value} 与 ${baseLanguage} 有 ${differences.length} 处差异, 请深度分析这两个文件的差异，并且以 ${baseLanguage} 为基准帮我调整成结构一模一样的。\n\n`;
    copyText += `${currentLang.value} 语言差异详情:\n`;
    differences.forEach((diff, index) => {
      copyText += `${index + 1}. ${diff}\n`;
    });
  } else {
    copyText += `${currentLang.value} 语言: 无差异 ✓\n`;
  }

  try {
    await navigator.clipboard.writeText(copyText);

    // 显示成功提示
    const copyButton = document.querySelector('.copy-button') as HTMLElement;
    if (copyButton) {
      const originalText = copyButton.textContent;
      copyButton.textContent = '复制成功!';
      copyButton.classList.add('copied');

      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.classList.remove('copied');
      }, 2000);
    }
  } catch (error) {
    console.error('复制失败:', error);
    // 降级方案：使用传统的复制方法
    const textArea = document.createElement('textarea');
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
</script>

<template>
  <div class="check-lang">
    <div class="lang-header">
      <h1>语言配置文件审查</h1>
      <p>以中文(zh)为基准，检查其他语言配置的差异</p>

      <div class="source-selector">
        <div class="source-tabs">
          <div
            v-for="source in ['docs', 'component']"
            :key="source"
            :class="['source-tab', { active: currentSource === source }]"
            @click="changeSource(source as ConfigSource)"
            tabindex="0"
            role="button"
            :aria-pressed="currentSource === source"
            @keydown.enter="changeSource(source as ConfigSource)"
            @keydown.space.prevent="changeSource(source as ConfigSource)"
          >
            {{ source === 'docs' ? '文档配置' : '组件配置' }}
          </div>
        </div>
      </div>

      <div class="lang-selector">
        <div class="lang-tabs">
          <div
            v-for="lang in languages"
            :key="lang"
            :class="['lang-tab', { active: currentLang === lang }]"
            @click="changeLang(lang)"
            tabindex="0"
            role="button"
            :aria-pressed="currentLang === lang"
            @keydown.enter="changeLang(lang)"
            @keydown.space.prevent="changeLang(lang)"
          >
            {{ lang }}
            <span
              :class="[
                'badge',
                { 'badge-success': !diffResults[lang]?.length },
              ]"
              v-if="diffResults[lang]?.length !== undefined"
            >
              {{ diffResults[lang]?.length }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="diff-results">
      <div class="diff-header">
        <div v-if="currentDiffCount > 0" class="diff-summary">
          发现 {{ currentLang }} 与 {{ baseLanguage }} 有
          {{ currentDiffCount }} 处差异, 请以 {{ baseLanguage }} 为基准帮我修复
        </div>
        <div v-else class="diff-summary complete">恭喜！没有发现差异</div>

        <button
          class="copy-button"
          @click="copyAllDifferences"
          title="复制所有差异信息"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path
              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
            ></path>
          </svg>
          复制报告
        </button>
      </div>

      <div class="diff-list">
        <div
          v-for="(diff, index) in diffResults[currentLang]"
          :key="index"
          :class="['diff-item', getDiffItemClass(diff)]"
        >
          {{ diff }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.check-lang {
  padding: 32px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text',
    'Helvetica Neue', Arial, sans-serif;

  .lang-header {
    margin-bottom: 36px;

    h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--lew-text-color-1);
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    p {
      color: var(--lew-text-color-4);
      font-size: 17px;
      line-height: 1.5;
      margin-bottom: 32px;
      letter-spacing: -0.01em;
    }
  }

  .source-selector {
    margin-bottom: 20px;
    background: var(--lew-bgcolor-2);
    padding: 4px;
    border-radius: var(--lew-border-radius-medium);
    display: inline-block;

    .source-tabs {
      display: flex;
      gap: 4px;

      .source-tab {
        padding: 10px 20px;
        border-radius: var(--lew-border-radius-small);
        background-color: transparent;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;
        font-weight: 500;
        color: var(--lew-text-color-4);
        border: none;
        position: relative;
        user-select: none;
        outline: none;

        &:hover {
          color: var(--lew-text-color-2);
        }

        &:focus-visible {
          box-shadow: 0 0 0 2px var(--lew-color-primary-light);
          outline: none;
        }

        &:active {
          transform: scale(0.98);
        }

        &.active {
          background-color: var(--lew-bgcolor-0);
          color: var(--lew-color-primary);
          font-weight: 600;
          box-shadow: var(--lew-box-shadow);

          &:hover {
            background-color: var(--lew-bgcolor-0);
          }
        }
      }
    }
  }

  .lang-selector {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    span {
      font-size: 15px;
      color: var(--lew-text-color-1);
      font-weight: 500;
    }

    .lang-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .lang-tab {
        display: flex;
        justify-content: center;
        padding: 8px 12px;
        width: 50px;
        border-radius: 24px;
        background-color: var(--lew-bgcolor-2);
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        font-size: 14px;
        font-weight: 500;
        color: var(--lew-text-color-1);
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
        outline: none;

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 18px;
          padding: 0 6px;
          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          border-radius: 9px;
          background-color: var(--lew-bgcolor-4);
          color: var(--lew-text-color-1);

          &.badge-success {
            background-color: var(--lew-color-success);
            color: var(--lew-color-white-text);
          }
        }

        &:hover {
          background-color: var(--lew-bgcolor-3);
          transform: translateY(-1px);
          box-shadow: var(--lew-box-shadow);
        }

        &:focus-visible {
          box-shadow: 0 0 0 3px var(--lew-color-primary-light);
          border-color: var(--lew-color-primary);
          outline: none;
        }

        &:active {
          transform: translateY(0);
        }

        &.active {
          background-color: var(--lew-color-primary);
          color: var(--lew-color-white-text);
          box-shadow: 0 2px 8px var(--lew-color-primary-light);

          .badge {
            background-color: rgba(255, 255, 255, 0.25);
            color: var(--lew-color-white-text);

            &.badge-success {
              background-color: rgba(255, 255, 255, 0.5);
              color: var(--lew-color-white-text);
            }
          }

          &:hover {
            background-color: var(--lew-color-primary-dark);
          }
        }
      }
    }
  }

  .diff-results {
    overflow-y: auto;
    max-height: calc(100vh - 320px);
    border-radius: var(--lew-border-radius-large);
    box-shadow: var(--lew-box-shadow);
    background-color: var(--lew-bgcolor-0);
    backdrop-filter: blur(20px);

    .diff-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 20px;
      background-color: var(--lew-color-danger-light);
      border-radius: var(--lew-border-radius-large)
        var(--lew-border-radius-large) 0 0;
      margin-bottom: 0;
      border-bottom: var(--lew-border-1);

      .diff-summary {
        color: var(--lew-color-danger);
        font-weight: 500;
        font-size: 15px;
        letter-spacing: -0.01em;
        flex: 1;

        &.complete {
          color: var(--lew-color-success);
        }
      }

      .copy-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background-color: var(--lew-bgcolor-0);
        border: 1px solid var(--lew-border-color);
        border-radius: var(--lew-border-radius-small);
        color: var(--lew-text-color-2);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        outline: none;
        user-select: none;

        svg {
          width: 16px;
          height: 16px;
        }

        &:hover {
          background-color: var(--lew-bgcolor-1);
          border-color: var(--lew-color-primary);
          color: var(--lew-color-primary);
          transform: translateY(-1px);
          box-shadow: var(--lew-box-shadow);
        }

        &:focus-visible {
          box-shadow: 0 0 0 2px var(--lew-color-primary-light);
          border-color: var(--lew-color-primary);
        }

        &:active {
          transform: translateY(0);
        }

        &.copied {
          background-color: var(--lew-color-success);
          color: var(--lew-color-white-text);
          border-color: var(--lew-color-success);

          &:hover {
            background-color: var(--lew-color-success-dark);
            color: var(--lew-color-white-text);
          }
        }
      }
    }

    .diff-list {
      border-radius: 0 0 var(--lew-border-radius-large)
        var(--lew-border-radius-large);
      overflow: hidden;

      .diff-item {
        padding: 16px 20px;
        border-bottom: var(--lew-border-1);
        font-family: 'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas,
          monospace;
        font-size: 13px;
        line-height: 1.6;
        white-space: pre-wrap;
        word-break: break-all;
        color: var(--lew-text-color-2);
        letter-spacing: 0;

        &.missing {
          background-color: var(--lew-color-danger-light);
          color: var(--lew-color-danger);
          border-left: 3px solid var(--lew-color-danger);
        }

        &.extra {
          background-color: var(--lew-color-info-light);
          color: var(--lew-color-info);
          border-left: 3px solid var(--lew-color-info);
        }

        &:last-child {
          border-bottom: none;
        }

        &:nth-child(odd):not(.missing):not(.extra) {
          background-color: var(--lew-bgcolor-1);
        }

        &:hover:not(.missing):not(.extra) {
          background-color: var(--lew-bgcolor-2);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .check-lang {
    padding: 24px 16px;

    .lang-header {
      h1 {
        font-size: 28px;
      }

      p {
        font-size: 15px;
      }
    }

    .source-selector,
    .lang-selector {
      flex-direction: column;
      align-items: flex-start;

      span {
        margin-bottom: 12px;
      }

      .source-tabs,
      .lang-tabs {
        width: 100%;
      }
    }

    .diff-results {
      .diff-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;

        .copy-button {
          align-self: stretch;
          justify-content: center;
        }
      }
    }
  }
}
</style>
