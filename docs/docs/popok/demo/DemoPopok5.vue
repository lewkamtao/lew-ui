<script setup lang="ts">
import { LewButton, LewTag } from "lew-ui";
import { h } from "vue";

function ok() {
  LewMessage.success("Confirmed");
}
function cancel() {
  LewMessage.info("Cancelled");
}
// 优化为苹果风格的简洁英文提示，无按钮
const content = h(
  "div",
  {
    style: {
      color: "#1d1d1f",
      padding: "12px 0",
      fontSize: "15px",
      lineHeight: "1.6",
    },
  },
  [
    h(
      "ul",
      { style: { margin: "0 0 8px 0", paddingLeft: "20px", color: "#6e6e73" } },
      [
        h("li", null, "All data will be permanently removed."),
        h("li", null, "This action affects all related information."),
        h("li", null, ["Please make sure you have a backup."]),
      ]
    ),
    h(
      "div",
      { style: { color: "#d93026", fontWeight: 500, marginTop: "8px" } },
      "This action is irreversible."
    ),
  ]
);
</script>

<template>
  <lew-popok
    width="400px"
    title="Delete Confirmation"
    type="error"
    :content="content"
    placement="bottom-start"
    ok-text="Delete"
    cancel-text="Cancel"
    :ok="ok"
    :cancel="cancel"
    trigger="hover"
  >
    <LewButton text="Hover to trigger" type="text" color="red" />
  </lew-popok>
</template>
