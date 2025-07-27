<template>
  <div class="guide-wrapper">
    <lew-title>国际化</lew-title>
    <p>
      Lew UI 支持国际化配置，您可以在
      <lew-mark>main.ts</lew-mark> 入口文件中进行如下设置：
    </p>

    <div class="hl-pre lew-scrollbar">
      <div class="pre-box">
        <highlightjs
          autodetect
          code="import { setLocale } from 'lew-ui'

setLocale('en');"
        />
      </div>
    </div>

    <br>
    <br>
    <lew-title :size="16">
      支持的语言
    </lew-title>
    <p>Lew UI 目前内置支持以下 9 种语言：</p>
    <table class="language-table">
      <thead>
        <tr>
          <th>语言代码</th>
          <th>语言名称</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>zh</td>
          <td>简体中文</td>
        </tr>
        <tr>
          <td>en</td>
          <td>英语</td>
        </tr>
        <tr>
          <td>de</td>
          <td>德语</td>
        </tr>
        <tr>
          <td>es</td>
          <td>西班牙语</td>
        </tr>
        <tr>
          <td>fr</td>
          <td>法语</td>
        </tr>
        <tr>
          <td>it</td>
          <td>意大利语</td>
        </tr>
        <tr>
          <td>ja</td>
          <td>日语</td>
        </tr>
        <tr>
          <td>ko</td>
          <td>韩语</td>
        </tr>
        <tr>
          <td>pt</td>
          <td>葡萄牙语</td>
        </tr>
      </tbody>
    </table>

    <p>
      只需将
      <lew-mark>setLocale</lew-mark>
      的参数设置为上面对应的语言代码即可切换。
    </p>
  </div>
</template>

<style lang="scss" scoped>
.language-table {
  width: 300px;
  border-collapse: collapse;
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--lew-bgcolor-2);

  th,
  td {
    padding: 12px 16px;
    border: 1px solid var(--lew-bgcolor-2);
    text-align: left;
    border-bottom: 1px solid var(--lew-border-color);
  }

  th {
    background-color: var(--lew-bgcolor-1);
    font-weight: 600;
    color: var(--lew-text-color);
  }

  td {
    background-color: var(--lew-bgcolor-0);
    color: var(--lew-text-color);
    font-size: 14px;
  }
}
</style>
