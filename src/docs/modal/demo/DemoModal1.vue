<script setup lang="ts">
import * as Yup from 'yup'

const modalVisible1 = ref(false)
const modalVisible2 = ref(false)
const form = ref({})
const options = ref([
  {
    field: 'username',
    label: '用户名',
    as: 'input',
    rules: Yup.string().required(),
  },
  {
    field: 'password',
    label: '密码',
    as: 'input',
    rules: Yup.string().min(6).required(),
    props: {
      type: 'password',
    },
  },
])
const data: any = [
  {
    id: 1,
    name: '小明',
    age: '14',
    sex: 1,
    intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
    hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
  },
  {
    id: 2,
    name: '小卢',
    age: '24',
    sex: 1,
    intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
    hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
  },
  {
    id: 3,
    name: '小娟',
    age: '25',
    sex: 0,
    intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
    hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
  },
  {
    id: 4,
    name: '小贝',
    age: '22',
    sex: 0,
    intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
    hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
  },
  {
    id: 5,
    name: '小飞',
    age: '13',
    sex: 3,
    intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
    hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
  },
]

const columns = [
  {
    title: 'id',
    field: 'id',
    width: 60,
    x: 'center',
  },
  {
    title: '姓名',
    width: 120,
    field: 'name',
  },
  {
    title: '年龄',
    field: 'age',
    width: 80,
    x: 'center',
  },
  {
    title: '性别',
    field: 'sex',
    width: 80,
    x: 'center',
  },
  {
    title: '成绩',
    width: 80,
    field: 'fraction',
    x: 'center',
  },
  {
    title: '介绍',
    width: 180,
    field: 'intro',
  },
]

onMounted(() => {
  document.onkeydown = function (event) {
    const e = event || window.event || arguments.callee.caller.arguments[0]
    if (e && e.keyCode === 27) {
      // 按 Esc
      modalVisible1.value = false
      modalVisible2.value = false
    }
  }
})
</script>

<template>
  <lew-flex x="start">
    <lew-button text="登录" @click="modalVisible1 = true" />
    <lew-button text="展示表格" @click="modalVisible2 = true" />
  </lew-flex>

  <lew-modal
    v-model:visible="modalVisible1"
    close-on-click-overlay
    width="350px"
  >
    <div class="modal-body">
      <lew-title :bold="700" style="margin-bottom: 20px">
        登录你的账户
      </lew-title>
      <lew-form
        v-model="form"
        class="form-box"
        :options="options"
        :label-width="40"
      />
      <lew-flex x="end">
        <lew-button
          text="关闭"
          type="normal"
          @click="modalVisible1 = false"
        />
        <lew-button text="立即登录" @click="modalVisible1 = false" />
      </lew-flex>
    </div>
  </lew-modal>
  <lew-modal v-model:visible="modalVisible2" width="1250px">
    <div class="modal-body">
      <lew-table :data-source="data" :columns="columns">
        <template #fraction="{ row }">
          <lew-flex>
            <lew-badge
              v-if="row.fraction >= 60"
              round
              type="success"
            />
            <lew-badge v-else round type="error" />
            <span>{{ row.fraction >= 60 ? '良好' : '很差' }}</span>
          </lew-flex>
        </template>
      </lew-table>
      <br>

      <lew-flex x="end">
        <lew-button
          text="关闭"
          type="normal"
          @click="modalVisible2 = false"
        />

        <lew-button text="提交" @click="modalVisible2 = false" />
      </lew-flex>
    </div>
  </lew-modal>
</template>

<style lang="scss" scoped>
.modal-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
}
</style>
