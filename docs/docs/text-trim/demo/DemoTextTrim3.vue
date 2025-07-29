<template>
  <div style="width: 300px" class="demo-text-trim-3">
    <div class="demo-section">
      <div class="section-title">
        File Names
      </div>
      <lew-text-trim
        text="very_long_file_name_with_multiple_extensions.tar.gz"
        :reserve-end="8"
      />
      <lew-text-trim
        text="project_backup_2024_03_15_final_version.zip"
        :reserve-end="8"
      />
    </div>

    <div class="demo-section">
      <div class="section-title">
        Code Files
      </div>
      <lew-text-trim
        text="src/components/very/deep/nested/component/implementation.ts"
        :reserve-end="15"
      />
      <lew-text-trim
        text="lib/utils/helpers/string/formatting/implementation.js"
        :reserve-end="15"
      />
    </div>

    <div class="demo-section">
      <div class="section-title">
        Document Paths
      </div>
      <lew-text-trim
        text="documents/projects/2024/quarter1/reports/financial_summary.pdf"
        :reserve-end="12"
      />
      <lew-text-trim
        text="user/downloads/important/documents/contracts/agreement.docx"
        :reserve-end="12"
      />
    </div>

    <div class="demo-section">
      <div class="section-title">
        URLs
      </div>
      <lew-text-trim
        text="https://example.com/very/long/path/to/specific/resource"
        :reserve-end="10"
      />
      <lew-text-trim
        text="https://subdomain.example.com/path/to/another/resource"
        :reserve-end="10"
      />
    </div>

    <div class="demo-section">
      <div class="section-title">
        Email Addresses
      </div>
      <lew-text-trim
        text="very.long.email.address.for.specific.department@company.com"
        :reserve-end="15"
      />
      <lew-text-trim
        text="user.name.with.multiple.parts@subdomain.domain.com"
        :reserve-end="15"
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
      font-weight: bold;
      margin-bottom: 4px;
      color: var(--lew-color-primary-dark);
    }
  }
}
</style>
