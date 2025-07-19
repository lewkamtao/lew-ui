<template>
  <div>
    <div class="demo">
      <lew-flex direction="x" x="start" y="center" mode="between">
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
      </lew-flex>
      <lew-flex direction="x" x="center" y="center" mode="around">
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
      </lew-flex>
      <lew-flex direction="x" x="center" y="center">
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
      </lew-flex>
    </div>
    <div class="demo">
      <lew-flex direction="y" x="start" y="start" mode="between">
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
      </lew-flex>
      <lew-flex direction="y" x="center" y="start" mode="around">
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
      </lew-flex>
      <lew-flex direction="y" x="center" y="center">
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
        <div class="box">
          <div />
        </div>
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
  border-radius: var(--lew-border-radius-small);
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
      border-radius: var(--lew-border-radius-small);
      background-color: var(--lew-color-primary);
    }
  }
}
</style>
