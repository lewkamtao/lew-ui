<script lang="ts" setup>
import LewDate from "./LewDate.vue";
import LewDateTime from "./LewDateTime.vue";
import LewMonth from "./LewMonth.vue";
import LewQuarter from "./LewQuarter.vue";
import LewTime from "./LewTime.vue";
import LewYear from "./LewYear.vue";

defineProps({
  type: {
    type: String as PropType<
      "year" | "quarter" | "month" | "date" | "date-time" | "time"
    >,
    default: "date",
  },
});

const emit = defineEmits(["change", "confirm", "cancel"]);

const lewYearRef = ref();
const lewQuarterRef = ref();
const lewMonthRef = ref();
const lewDateRef = ref();
const lewDateTimeRef = ref();
const lewTimeRef = ref();

function init(date: string | undefined = "") {
  lewYearRef.value?.init(date);
  lewQuarterRef.value?.init(date);
  lewMonthRef.value?.init(date);
  lewDateRef.value?.init(date);
  lewDateTimeRef.value?.init(date);
  lewTimeRef.value?.init(date);
}

function handleChange(date: string | undefined) {
  emit("change", date);
}

function handleConfirm(date: string | undefined) {
  emit("confirm", date);
}

function handleCancel() {
  emit("cancel");
}

defineExpose({ init });
</script>

<template>
  <div class="lew-panel">
    <LewYear v-if="type === 'year'" ref="lewYearRef" @change="handleChange" />
    <LewQuarter
      v-if="type === 'quarter'"
      ref="lewQuarterRef"
      @change="handleChange"
    />
    <LewMonth
      v-if="type === 'month'"
      ref="lewMonthRef"
      @change="handleChange"
    />
    <LewDate v-if="type === 'date'" ref="lewDateRef" @change="handleChange" />
    <LewDateTime
      v-if="type === 'date-time'"
      ref="lewDateTimeRef"
      @change="handleChange"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
    <LewTime
      v-if="type === 'time'"
      ref="lewTimeRef"
      @change="handleChange"
      @cancel="handleCancel"
    />
  </div>
</template>
