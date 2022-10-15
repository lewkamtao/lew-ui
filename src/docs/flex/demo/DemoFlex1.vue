<template>
    <div>
        <div class="demo">
            <lew-flex direction="row" x="start" y="start" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
            <lew-flex direction="row" x="center" y="start" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
            <lew-flex direction="row" x="end" y="start" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
        </div>
        <div class="demo">
            <lew-flex direction="row" x="start" y="center" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
            <lew-flex direction="row" x="center" y="center" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
            <lew-flex direction="row" x="end" y="center" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
        </div>
        <div class="demo">
            <lew-flex direction="row" x="start" y="end" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
            <lew-flex direction="row" x="center" y="end" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
            <lew-flex direction="row" x="end" y="end" gap="20px">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </lew-flex>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.demo {
    display: flex;
    justify-content: center;
    align-items: center;
}
.lew-flex {
    border: 1px var(--lew-bgcolor-2) solid;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-bgcolor-1);
    margin-bottom: 20px;
    width: 200px;
    height: 200px;
    padding: 5px;
    box-sizing: border-box;
    margin: 10px;
    .box {
        box-sizing: border-box;
        > div {
            display: inline-block;
            padding: 10px;
            font-size: 14px;
            border-radius: var(--lew-border-radius);
            background-color: var(--lew-primary-color);
        }
    }
}
</style>
