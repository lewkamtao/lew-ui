<script lang="ts" setup>
const options = ref<any[]>([
  {
    label: 'Language',
    value: 'language',
    children: [
      {
        label: 'Chinese',
        value: 'chinese',
        checked: true,
        checkable: true,
        onClick: (item: any) => setTheme(item, 'language'),
      },
      {
        label: 'English',
        value: 'english',
        checkable: true,
        onClick: (item: any) => setTheme(item, 'language'),
      },
    ],
  },
  {
    label: 'Theme',
    value: 'theme',
    children: [
      {
        label: 'Light',
        value: 'light',
        type: 'radio',
        checked: true,
        checkable: true,
        onClick: (item: any) => setTheme(item, 'theme'),
      },
      {
        label: 'Dark',
        type: 'radio',
        value: 'dark',
        checkable: true,
        onClick: (item: any) => setTheme(item, 'theme'),
      },
    ],
  },
  {
    label: 'Font Style (Editor)',
    value: 'font',
  },
  {
    label: 'About',
    value: 'about',
  },
  {
    isDividerLine: true,
  },
  {
    label: 'Help',
    value: 'help',
  },
  {
    label: 'Check for Updates',
    checkable: true,
    checked: true,
    value: 'check-update',
    onClick: (item: any) => setUpdate(item),
  },
]);

const setTheme = (item: any, type = 'theme') => {
  // Find the index of the Theme item
  const themeIndex = options.value.findIndex(
    (item: any) => item.value === type
  );
  if (themeIndex !== -1 && options.value[themeIndex].children) {
    // Create new children array to maintain reactivity
    const newChildren = options.value[themeIndex].children!.map(
      (child: any) => {
        if (child.checkable) {
          return {
            ...child,
            checked: child.label === item.label,
          };
        }
        return child;
      }
    );

    // Update the entire options array to trigger reactive update
    let newOptions = options.value.map((item: any, index: number) => {
      if (index === themeIndex) {
        return {
          ...item,
          children: newChildren,
        };
      }
      return item;
    });
    options.value = newOptions;
  }
};

const setUpdate = (item: any) => {
  item.checked = !item.checked;
};
</script>
<template>
  <lew-flex>
    <div
      v-context-menu="{
        options,
      }"
      class="box"
    >
      Right-click here
    </div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: var(--lew-bgcolor-2);
  border-radius: var(--lew-border-radius-small);
  font-size: 16px;
  color: var(--lew-text-color-5);
}
</style>
