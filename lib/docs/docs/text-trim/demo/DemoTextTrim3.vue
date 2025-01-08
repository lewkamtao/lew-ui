<template>
  <div style="width: 320px" class="demo-text-trim-3">
    <!-- 文件下载场景 -->
    <div class="demo-section">
      <div class="section-title">文件下载</div>
      <lew-text-trim
        text="产品需求分析及技术方案设计_20240115_最终版.docx"
        :reserve-end="15"
      />
      <lew-text-trim
        text="企业级中后台设计系统完整设计规范_20240120_评审版.pdf"
        :reserve-end="15"
      />
    </div>

    <!-- 视频标题场景 -->
    <div class="demo-section">
      <div class="section-title">视频标题</div>
      <lew-text-trim
        text="2024年Web前端技术发展趋势分析与实战案例分享【完整版】.mp4"
        :reserve-end="15"
      />
      <lew-text-trim
        text="人工智能与机器学习核心算法详解【附实战代码】.mp4"
        :reserve-end="15"
      />
    </div>

    <!-- 商品标题场景 -->
    <div class="demo-section">
      <div class="section-title">商品标题</div>
      <lew-text-trim
        text="Apple MacBook Pro 14英寸 M3 Pro芯片 32G内存 1TB固态硬盘【现货发售】"
        :reserve-end="12"
      />
      <lew-text-trim
        text="索尼（SONY）WH-1000XM5 无线降噪耳机【官方标配】"
        :reserve-end="12"
      />
    </div>

    <!-- 音乐标题场景 -->
    <div class="demo-section">
      <div class="section-title">音乐标题</div>
      <lew-text-trim
        text="周杰伦 - 最伟大的作品【官方完整版MV】"
        :reserve-end="12"
      />
      <lew-text-trim
        text="Taylor Swift - Cruel Summer【官方高清MV】"
        :reserve-end="12"
      />
    </div>

    <!-- 新闻标题场景 -->
    <div class="demo-section">
      <div class="section-title">新闻标题</div>
      <lew-text-trim
        text="2024年人工智能发展报告：大模型应用与产业变革【深度分析】"
        :reserve-end="10"
      />
      <lew-text-trim
        text="全球科技创新趋势：量子计算与可持续发展【专题报道】"
        :reserve-end="10"
      />
    </div>

    <!-- 课程标题场景 -->
    <div class="demo-section">
      <div class="section-title">课程标题</div>
      <lew-text-trim
        text="Web全栈开发实战：Vue3+TypeScript+Node.js【配套资料】"
        :reserve-end="10"
      />
      <lew-text-trim
        text="人工智能算法与应用：从入门到精通【实战教程】"
        :reserve-end="10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LewTextTrim } from 'lew-ui'
</script>

<style lang="scss" scoped>
.demo-text-trim-3 {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .demo-section {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .section-title {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }
  }
}
</style>
