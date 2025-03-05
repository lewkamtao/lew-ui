<template>
  <div style="width: 350px" class="demo-text-trim-3">
    <!-- 文件下载场景 -->
    <div class="demo-section">
      <div class="section-title">文件下载</div>
      <lew-text-trim
        text="产品需求分析及技术方案设计文档_V2.0_20240115_最终版本_产品经理评审通过_技术团队确认.docx"
        :reserve-end="15"
      />
      <lew-text-trim
        text="企业级中后台设计系统完整设计规范及组件库使用文档_20240120_UI设计团队评审修订版本_前端开发参考.pdf"
        :reserve-end="15"
      />
    </div>

    <!-- 视频标题场景 -->
    <div class="demo-section">
      <div class="section-title">视频标题</div>
      <lew-text-trim
        text="2024年Web前端技术发展趋势深度分析与实战案例分享 - React18、Vue3、TypeScript、Vite、微前端架构实践【完整高清版】.mp4"
        :reserve-end="15"
      />
      <lew-text-trim
        text="人工智能与机器学习核心算法详解与项目实战 - 深度学习、神经网络、计算机视觉、自然语言处理【附完整源代码】.mp4"
        :reserve-end="15"
      />
    </div>

    <!-- 商品标题场景 -->
    <div class="demo-section">
      <div class="section-title">商品标题</div>
      <lew-text-trim
        text="Apple MacBook Pro 14英寸 M3 Pro芯片 32G统一内存 1TB固态硬盘 Liquid视网膜XDR显示屏 深空黑色【现货速发 全新原装正品 全国联保】"
        :reserve-end="12"
      />
      <lew-text-trim
        text="索尼（SONY）WH-1000XM5 无线降噪耳机 新品旗舰 智能降噪 蓝牙通话 多设备切换 触控操作 持久续航【官方标配 全国联保】"
        :reserve-end="12"
      />
    </div>

    <!-- 音乐标题场景 -->
    <div class="demo-section">
      <div class="section-title">音乐标题</div>
      <lew-text-trim
        text="周杰伦 - 最伟大的作品 (Greatest Works of Art) Official Music Video【4K超清收藏版 附带幕后花絮及制作特辑】"
        :reserve-end="12"
      />
      <lew-text-trim
        text="Taylor Swift - Cruel Summer (Official Music Video) [Extended Version with Behind The Scenes and Commentary]【官方高清MV】"
        :reserve-end="12"
      />
    </div>

    <!-- 新闻标题场景 -->
    <div class="demo-section">
      <div class="section-title">新闻标题</div>
      <lew-text-trim
        text="2024年人工智能发展深度报告：大模型技术突破与产业变革趋势分析 - 商业应用、技术创新、未来展望【独家深度分析】"
        :reserve-end="10"
      />
      <lew-text-trim
        text="全球科技创新趋势研究报告：量子计算、可持续发展与数字化转型 - 技术突破、产业机遇、投资方向【年度专题报道】"
        :reserve-end="10"
      />
    </div>

    <!-- 课程标题场景 -->
    <div class="demo-section">
      <div class="section-title">课程标题</div>
      <lew-text-trim
        text="Web全栈开发实战进阶课程：Vue3+TypeScript+Node.js完整技术栈 - 项目实战、性能优化、自动化测试【配套源码+课件+技术文档】"
        :reserve-end="10"
      />
      <lew-text-trim
        text="人工智能算法与应用开发：从入门到精通 - 机器学习、深度学习、强化学习、计算机视觉【完整实战案例+配套资料】"
        :reserve-end="10"
      />
    </div>
  </div>
</template>

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
