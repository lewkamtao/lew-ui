<template>
    <lew-flex wrap x="start" y="end" gap="20">
        <lew-button size="medium" round loading text="Submit" type="fill" />
        <lew-button size="medium" round loading text="Submit" type="light" />
        <lew-button size="medium" round loading text="Submit" type="ghost" />
        <lew-button size="medium" round loading text="Submit" type="text" />
        <lew-button type="fill" round loading icon="message-circle" />
        <lew-button type="light" round loading icon="message-circle" />
    </lew-flex>
</template>
<style lang="scss" scoped>
.lew-button {
    font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
}
</style>
