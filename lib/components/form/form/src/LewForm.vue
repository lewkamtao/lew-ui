<script setup lang="ts">
import type { LewFormOption } from "lew-ui/types";
import { Parser } from "expr-eval";
import {
  any2px,
  formatFormByMap,
  getFormItemRequired,
  retrieveNestedFieldValue,
} from "lew-ui/utils";
import { debounce } from "lodash-es";
import * as Yup from "yup";
import { formEmits } from "./emits";
import LewFormItem from "./LewFormItem.vue";
import LewGetLabelWidth from "./LewGetLabelWidth.vue";
import { formProps } from "./props";

const props = defineProps(formProps);
const emit = defineEmits(formEmits);
const formMap = ref<Record<string, any>>({});
const formLabelRef = ref();
const autoLabelWidth = ref(0);
const formItemRefMap = ref<Record<string, any>>({});
const parser = new Parser();

const componentOptions = computed(() => props.options);

const normalizePropCache = new Map<
  string | boolean | ((formData: Record<string, any>) => boolean),
  (formData: Record<string, any>) => boolean
>();

function normalizeProp(
  value:
    | string
    | boolean
    | ((formData: Record<string, any>) => boolean)
    | undefined
) {
  if (value === undefined) {
    return () => false;
  }

  if (normalizePropCache.has(value)) {
    return normalizePropCache.get(value)!;
  }

  const normalized = (formData: Record<string, any>) => {
    if (typeof value === "function") {
      return value(formData);
    }
    if (typeof value === "string") {
      try {
        return Boolean(parser.evaluate(value, formData));
      } catch {
        return false;
      }
    }
    return Boolean(value);
  };

  normalizePropCache.set(value, normalized);
  return normalized;
}

let formSchemaCacheKey = "";
let cachedFormSchema: any = null;

function createFormSchema(options: LewFormOption[]) {
  const schemaMap = options.reduce<Record<string, any>>((acc, item) => {
    if (item.field && item.rule) {
      acc[item.field] =
        typeof item.rule === "string"
          ? new Function("Yup", `return ${item.rule}`)(Yup)
          : item.rule;
    }
    return acc;
  }, {});

  return Yup.object().shape(schemaMap);
}

const formSchema = computed(() => {
  const options = componentOptions.value;
  const keyParts: string[] = [];
  for (let i = 0; i < options.length; i++) {
    const item = options[i];
    if (item.field && item.rule) {
      keyParts.push(
        `${item.field}:${typeof item.rule === "string" ? item.rule : "object"}`
      );
    }
  }
  const currentKey = keyParts.join("|");

  if (currentKey === formSchemaCacheKey && cachedFormSchema) {
    return cachedFormSchema;
  }

  const schema = createFormSchema(options);
  formSchemaCacheKey = currentKey;
  cachedFormSchema = schema;
  return schema;
});

const getDynamicGridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
}));

function getForm() {
  const formData = formatFormByMap(toRaw(formMap.value));
  const options = componentOptions.value;
  const result: Record<string, any> = { ...formData };

  for (let i = 0; i < options.length; i++) {
    const item = options[i];
    if (item.outputFormat && item.field && result[item.field] !== undefined) {
      const _value = item.outputFormat({ item, value: result[item.field] });
      if (
        typeof _value === "object" &&
        _value !== null &&
        !Array.isArray(_value)
      ) {
        delete result[item.field];
        Object.assign(result, _value);
      } else {
        result[item.field] = _value;
      }
    }
  }
  return result;
}

function setForm(value: any = {}) {
  const options = componentOptions.value;
  for (let i = 0; i < options.length; i++) {
    const item = options[i];
    if (!item.field) continue;
    let v = retrieveNestedFieldValue(value, item.field);
    if (item.inputFormat) {
      v = item.inputFormat({ item, value: v });
    }
    resetFieldError(item.field, true);
    formMap.value[item.field] = v;
  }
}

function resetError() {
  const refMap = formItemRefMap.value;
  const keys = Object.keys(refMap);
  for (let i = 0; i < keys.length; i++) {
    resetFieldError(keys[i]);
  }
}

function resetFieldError(field: string, ignore = false) {
  const ref = formItemRefMap.value[field];
  if (!ref) return;
  ref.setIgnoreValidate(ignore);
  ref.setError("");
}

function validate() {
  return new Promise<boolean>((resolve) => {
    const refMap = formItemRefMap.value;
    const keys = Object.keys(refMap);
    for (let i = 0; i < keys.length; i++) {
      resetFieldError(keys[i], false);
    }

    formSchema.value
      .validate(formMap.value, { abortEarly: false })
      .then(() => resolve(true))
      .catch((error: any) => {
        const inner = error?.inner || [];
        for (let i = 0; i < inner.length; i++) {
          const item = inner[i];
          const path = item.path.replace(/^\["?|"?\]$/g, "");
          refMap[path]?.setError(item.message);
        }
        resolve(false);
      });
  });
}

onMounted(() => {
  if (props.labelWidth === "auto") {
    autoLabelWidth.value = formLabelRef.value?.getWidth() ?? 0;
  }
  emit("mounted");
});

provide("formMethods", props.formMethods);
provide("formSchema", formSchema);
provide("formData", formMap);

watch(
  () => props.size,
  () => {
    if (props.labelWidth === "auto") {
      nextTick(() => {
        autoLabelWidth.value = formLabelRef.value?.getWidth() ?? 0;
      });
    }
  },
  { flush: "post" }
);

const GAP_MAP: Record<string, string> = {
  small: "24px",
  medium: "26px",
  large: "28px",
};

const getFormStyle = computed(() => {
  const style: Record<string, string> = {
    width: any2px(props.width),
    minWidth: "320px",
    gap: GAP_MAP[props.size] || "26px",
    gridTemplateColumns: getDynamicGridStyle.value.gridTemplateColumns,
  };
  return style;
});

const getLabelWidth = computed(() => {
  if (props.labelWidth === "auto") {
    return any2px(autoLabelWidth.value || "auto");
  }
  return any2px(props.labelWidth);
});

function setItemRef(field: string, el: any) {
  if (el) {
    formItemRefMap.value[field] = el;
  } else {
    delete formItemRefMap.value[field];
  }
}

const itemPropsCache = new Map<string, any>();

function getItemProps(item: LewFormOption) {
  const fieldKey =
    item.field || `__index_${componentOptions.value.indexOf(item)}`;
  const currentLabelWidth = getLabelWidth.value;
  const cacheKeyFull = `${fieldKey}_${props.direction}_${props.size}_${String(
    currentLabelWidth
  )}`;

  if (itemPropsCache.has(cacheKeyFull)) {
    return itemPropsCache.get(cacheKeyFull)!;
  }

  const baseProps: any = {
    direction: props.direction,
    size: props.size,
    labelWidth: currentLabelWidth,
    ...item,
    required: getFormItemRequired(item),
  };

  baseProps.disabled = item.disabled
    ? normalizeProp(item.disabled)
    : () => Boolean(props.disabled);

  baseProps.readonly = item.readonly
    ? normalizeProp(item.readonly)
    : () => Boolean(props.readonly);

  baseProps.visible =
    item.visible === undefined ? () => true : normalizeProp(item.visible);

  itemPropsCache.set(cacheKeyFull, baseProps);

  if (itemPropsCache.size > 100) {
    const firstKey = itemPropsCache.keys().next().value;
    if (firstKey) {
      itemPropsCache.delete(firstKey);
    }
  }

  return baseProps;
}

const debouncedGetForm = debounce(() => {
  emit("change", getForm());
}, 100);

function handleChange() {
  debouncedGetForm();
}

watch(
  () => [props.direction, props.size, getLabelWidth.value],
  () => {
    itemPropsCache.clear();
  }
);

watch(
  () => componentOptions.value,
  () => {
    itemPropsCache.clear();
  },
  { deep: false }
);

defineExpose({ getForm, setForm, resetError, validate });
</script>

<template>
  <div class="lew-form" :style="getFormStyle">
    <LewGetLabelWidth
      v-if="labelWidth === 'auto'"
      ref="formLabelRef"
      :size="size"
      :options="componentOptions"
    />
    <LewFormItem
      v-for="item in componentOptions"
      :ref="(el: any) => setItemRef(item.field, el)"
      :key="item.field"
      v-model="formMap[item.field]"
      v-bind="getItemProps(item)"
      @change="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-form {
  width: 100%;
  display: grid;
  flex-shrink: 0;
}
</style>
