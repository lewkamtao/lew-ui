<template>
  <lew-flex x="start" y="end" gap="10px">
    <lew-button size="mini">
      迷你
      <template #icon> <lew-icon size="1em" type="home" /> </template>
    </lew-button>
    <lew-button size="small"
      >小型 <template #icon> <lew-icon size="1em" type="home" /> </template
    ></lew-button>
    <lew-button size="medium">
      中型
      <template #icon> <lew-icon size="1em" type="home" /> </template>
    </lew-button>
    <lew-button size="large">
      大型
      <template #icon> <lew-icon size="1em" type="home" /> </template>
    </lew-button>
  </lew-flex>
</template>
