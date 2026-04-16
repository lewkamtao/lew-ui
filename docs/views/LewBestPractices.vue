<script setup lang="ts">
import docsLocale from 'docs/locals'
import * as Yup from 'yup'
import DocHeading from '../layout/DocHeading.vue'
import LewCodeHighlighter from '../layout/LewCodeHighlighter.vue'

const tab = ref('import')

const tabOptions = computed(() => [
  { label: docsLocale.t('bestPractices.tabImport'), value: 'import', type: 'light' as const },
  { label: docsLocale.t('bestPractices.tabForm'), value: 'form', type: 'light' as const },
  { label: docsLocale.t('bestPractices.tabFeedback'), value: 'feedback', type: 'light' as const },
  { label: docsLocale.t('bestPractices.tabTheme'), value: 'theme', type: 'light' as const },
])

const codeImport = `// 按需引入组件与类型，样式在入口一次性引入
import { LewButton, LewForm, LewMessage } from 'lew-ui'
import type { LewFormOption } from 'lew-ui/types'
import 'lew-ui/styles'

// 避免：import LewUI from 'lew-ui' 后整包注册（不利于 Tree-shaking）`

const codeForm = `LewMessage.request({ loadingMessage: '提交中…' }, () =>
  new Promise((resolve) => {
    formRef.value
      .validate()
      .then((ok: boolean) => {
        if (!ok) {
          resolve({ type: 'warning', content: '请修正表单', duration: 2000 })
          return
        }
        api()
          .then(() =>
            resolve({ type: 'success', content: '已保存', duration: 1500 }),
          )
          .catch((e) =>
            resolve({ type: 'error', content: e.message, duration: 3000 }),
          )
      })
  }),
)`

const codeTheme = `/* 业务全局样式：覆盖语义 token，而不是组件内部 class */
:root,
.lew-light {
  --lew-color-primary: 79 70 229; /* 示例：indigo */
  --lew-border-radius-small: 10px;
}`

const formRef = ref()
const busy = ref(false)

const formOptions = computed(() => [
  {
    field: 'displayName',
    label: docsLocale.t('bestPractices.formFieldName'),
    as: 'input' as const,
    rule: Yup.string()
      .trim()
      .min(2, docsLocale.t('bestPractices.formErrMin2'))
      .required(docsLocale.t('bestPractices.formErrRequired')),
    props: {
      clearable: true,
      placeholder: docsLocale.t('bestPractices.formPhName'),
    },
  },
  {
    field: 'email',
    label: docsLocale.t('bestPractices.formFieldEmail'),
    as: 'input' as const,
    rule: Yup.string()
      .trim()
      .email(docsLocale.t('bestPractices.formErrEmail'))
      .required(docsLocale.t('bestPractices.formErrRequired')),
    props: {
      clearable: true,
      placeholder: docsLocale.t('bestPractices.formPhEmail'),
    },
  },
])

onMounted(() => {
  formRef.value?.setForm?.({ displayName: '', email: '' })
})

function resetForm() {
  formRef.value?.setForm?.({ displayName: '', email: '' })
}

function mockSubmit() {
  if (!formRef.value)
    return
  busy.value = true
  LewMessage.request(
    { loadingMessage: docsLocale.t('bestPractices.formLoadingMsg') },
    () =>
      new Promise<{ type: 'success' | 'warning' | 'error', content: string, duration?: number }>((resolve) => {
        formRef.value
          .validate()
          .then((ok: boolean) => {
            if (!ok) {
              busy.value = false
              resolve({
                type: 'warning',
                content: docsLocale.t('bestPractices.formSubmitInvalid'),
                duration: 2200,
              })
              return
            }
            window.setTimeout(() => {
              busy.value = false
              resolve({
                type: 'success',
                content: docsLocale.t('bestPractices.formSubmitOk'),
                duration: 1800,
              })
            }, 800)
          })
          .catch(() => {
            busy.value = false
            resolve({ type: 'error', content: 'Unexpected error', duration: 2500 })
          })
      }),
  )
}

function showToast() {
  LewMessage.success(docsLocale.t('bestPractices.feedbackToast'))
}

function showNotification() {
  LewNotification.info({
    title: docsLocale.t('bestPractices.feedbackNotifyTitle'),
    content: docsLocale.t('bestPractices.feedbackNotifyContent'),
    duration: 6000,
    showProgress: true,
  })
}

function showDangerDialog() {
  LewDialog.warning({
    title: docsLocale.t('bestPractices.feedbackDialogTitle'),
    content: docsLocale.t('bestPractices.feedbackDialogContent'),
  })
}

async function copySnippet(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    LewMessage.success(docsLocale.t('bestPractices.copyDone'))
  }
  catch {
    LewMessage.error('Copy failed')
  }
}
</script>

<template>
  <div class="bp-page lew-scrollbar">
    <div class="bp-inner">
      <section class="bp-hero">
        <DocHeading class="bp-hero-title" color="primary" :bold="600" size="28px">
          {{ docsLocale.t('bestPractices.heroTitle') }}
        </DocHeading>
        <p class="bp-lead">
          {{ docsLocale.t('bestPractices.heroDesc') }}
        </p>
      </section>

      <lew-tabs v-model="tab" class="bp-tabs" :options="tabOptions" />

      <div v-show="tab === 'import'" class="bp-panel">
        <h2 class="bp-h2">
          {{ docsLocale.t('bestPractices.importTitle') }}
        </h2>
        <p class="bp-p">
          {{ docsLocale.t('bestPractices.importDesc') }}
        </p>
        <lew-flex x="end" style="margin-bottom: 8px">
          <lew-button type="light" size="small" @click="copySnippet(codeImport)">
            {{ docsLocale.t('bestPractices.copyBtn') }}
          </lew-button>
        </lew-flex>
        <LewCodeHighlighter :code="codeImport" lang="ts" max-height="320px" />
      </div>

      <div v-show="tab === 'form'" class="bp-panel">
        <h2 class="bp-h2">
          {{ docsLocale.t('bestPractices.formTitle') }}
        </h2>
        <p class="bp-p">
          {{ docsLocale.t('bestPractices.formDesc') }}
        </p>
        <lew-flex gap="16px" y="start" class="bp-split">
          <div class="bp-demo-card">
            <p class="bp-hint">
              {{ docsLocale.t('bestPractices.formHint') }}
            </p>
            <LewForm
              ref="formRef"
              class="bp-form"
              :options="formOptions"
            />
            <lew-flex gap="10px" style="margin-top: 16px">
              <lew-button
                type="fill"
                color="primary"
                :loading="busy"
                :disabled="busy"
                @click="mockSubmit"
              >
                {{ docsLocale.t('bestPractices.formSubmit') }}
              </lew-button>
              <lew-button type="light" :disabled="busy" @click="resetForm">
                {{ docsLocale.t('bestPractices.formReset') }}
              </lew-button>
            </lew-flex>
          </div>
          <div class="bp-code-wrap">
            <lew-flex x="end" style="margin-bottom: 8px">
              <lew-button type="light" size="small" @click="copySnippet(codeForm)">
                {{ docsLocale.t('bestPractices.copyBtn') }}
              </lew-button>
            </lew-flex>
            <LewCodeHighlighter :code="codeForm" lang="ts" max-height="360px" />
          </div>
        </lew-flex>
      </div>

      <div v-show="tab === 'feedback'" class="bp-panel">
        <h2 class="bp-h2">
          {{ docsLocale.t('bestPractices.feedbackTitle') }}
        </h2>
        <p class="bp-p">
          {{ docsLocale.t('bestPractices.feedbackDesc') }}
        </p>
        <div class="bp-demo-card bp-row">
          <lew-button type="light" @click="showToast">
            {{ docsLocale.t('bestPractices.btnToast') }}
          </lew-button>
          <lew-button type="light" @click="showNotification">
            {{ docsLocale.t('bestPractices.btnNotify') }}
          </lew-button>
          <lew-button type="fill" color="danger" @click="showDangerDialog">
            {{ docsLocale.t('bestPractices.btnConfirm') }}
          </lew-button>
        </div>
        <h3 class="bp-h3">
          {{ docsLocale.t('bestPractices.a11yTitle') }}
        </h3>
        <p class="bp-p">
          {{ docsLocale.t('bestPractices.a11yDesc') }}
        </p>
      </div>

      <div v-show="tab === 'theme'" class="bp-panel">
        <h2 class="bp-h2">
          {{ docsLocale.t('bestPractices.themeTitle') }}
        </h2>
        <p class="bp-p">
          {{ docsLocale.t('bestPractices.themeDesc') }}
        </p>
        <lew-alert type="info" style="margin-bottom: 12px">
          {{ docsLocale.t('bestPractices.themeTip') }}
        </lew-alert>
        <lew-flex x="end" style="margin-bottom: 8px">
          <lew-button type="light" size="small" @click="copySnippet(codeTheme)">
            {{ docsLocale.t('bestPractices.copyBtn') }}
          </lew-button>
        </lew-flex>
        <LewCodeHighlighter :code="codeTheme" lang="scss" max-height="280px" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bp-page {
  min-height: calc(100vh - 60px);
  padding: 40px 24px 120px;
  box-sizing: border-box;
  background: var(--lew-bgcolor-4);
}

.bp-inner {
  max-width: 1040px;
  margin: 0 auto;
}

.bp-hero {
  margin-bottom: 28px;
}

.bp-hero-title {
  margin-bottom: 12px;
}

.bp-lead {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: var(--lew-text-color-2);
  max-width: 820px;
}

.bp-tabs {
  margin-bottom: 24px;
}

.bp-panel {
  animation: bp-fade 0.25s ease;
}

@keyframes bp-fade {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bp-h2 {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
  color: var(--lew-text-color-0);
}

.bp-h3 {
  margin: 28px 0 10px;
  font-size: 17px;
  font-weight: 700;
  color: var(--lew-text-color-1);
}

.bp-p {
  margin: 0 0 18px;
  line-height: 1.7;
  color: var(--lew-text-color-2);
}

.bp-hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--lew-text-color-3);
}

.bp-split {
  align-items: stretch;
  flex-wrap: wrap;
}

.bp-demo-card {
  flex: 1 1 280px;
  padding: 20px;
  border-radius: var(--lew-border-radius-medium);
  background: var(--lew-bgcolor-0);
  border: var(--lew-border-1);
  box-sizing: border-box;
}

.bp-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.bp-code-wrap {
  flex: 1 1 320px;
  min-width: 280px;
}

.bp-form {
  max-width: 420px;
}

@media (max-width: 767px) {
  .bp-page {
    padding: 24px 16px 100px;
  }
}
</style>
