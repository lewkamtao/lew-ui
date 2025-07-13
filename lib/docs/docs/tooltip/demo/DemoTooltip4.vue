<script setup lang="ts">
const content = ref(`
  <div style="padding:8px;max-width:260px;font-family:system-ui">
    <h2 style="color:#1d1d1f;margin:0 0 8px;font-size:16px;font-weight:600">
      Return Policy
    </h2>
    <p style="color:#86868b;margin:0 0 8px;font-size:13px;line-height:1.3">
      You can request a no-reason return within 14 days of receiving the product, 
      provided the item is unused and in its original packaging.
    </p>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:12px">
      <div style="display:flex;align-items:center;gap:6px">
        <span style="background:#f5f5f7;color:#1d1d1f;padding:4px 8px;border-radius:4px;font-size:12px;font-weight:500">
          14 Days
        </span>
        <span style="color:#86868b;font-size:12px">
          No-reason Return
        </span>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <span style="background:#f5f5f7;color:#1d1d1f;padding:4px 8px;border-radius:4px;font-size:12px;font-weight:500">
          30 Days
        </span>
        <span style="color:#86868b;font-size:12px">
          Quality Issues Return
        </span>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <span style="background:#f5f5f7;color:#1d1d1f;padding:4px 8px;border-radius:4px;font-size:12px;font-weight:500">
          365 Days
        </span>
        <span style="color:#86868b;font-size:12px">
          Warranty Service
        </span>
      </div>
    </div>
  </div>
`)
</script>

<template>
    <lew-flex x="center" gap="50">
        <lew-tag
            v-tooltip="{
                content,
                allowHTML: true,
            }"
            oversize
            color="red"
            round
            text="Allow HTML"
        />
    </lew-flex>
</template>
