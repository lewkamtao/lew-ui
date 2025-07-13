<script setup lang="ts">
const value = ref()

const initOptionsMethod = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = [
        {
          key: 'engineering',
          label: 'Engineering',
          children: [
            {
              key: 'frontend',
              label: 'Frontend Team',
              children: [
                { key: 'react-dev', label: 'React Developer' },
                { key: 'vue-dev', label: 'Vue Developer' },
                { key: 'ui-designer', label: 'UI Designer' },
              ],
            },
            {
              key: 'backend',
              label: 'Backend Team',
              children: [
                { key: 'java-dev', label: 'Java Developer' },
                {
                  key: 'python-dev',
                  label: 'Python Developer',
                },
                { key: 'devops', label: 'DevOps Engineer' },
              ],
            },
            {
              key: 'mobile',
              label: 'Mobile Team',
              children: [
                { key: 'ios-dev', label: 'iOS Developer' },
                {
                  key: 'android-dev',
                  label: 'Android Developer',
                },
              ],
            },
          ],
        },
        {
          key: 'product',
          label: 'Product',
          children: [
            {
              key: 'pm',
              label: 'Product Management',
              children: [
                {
                  key: 'senior-pm',
                  label: 'Senior Product Manager',
                },
                {
                  key: 'associate-pm',
                  label: 'Associate Product Manager',
                },
              ],
            },
            {
              key: 'design',
              label: 'Design',
              children: [
                { key: 'ux-designer', label: 'UX Designer' },
                {
                  key: 'visual-designer',
                  label: 'Visual Designer',
                },
              ],
            },
          ],
        },
        {
          key: 'marketing',
          label: 'Marketing',
          children: [
            {
              key: 'digital',
              label: 'Digital Marketing',
              children: [
                {
                  key: 'seo-specialist',
                  label: 'SEO Specialist',
                },
                {
                  key: 'content-writer',
                  label: 'Content Writer',
                },
                {
                  key: 'social-media',
                  label: 'Social Media Manager',
                },
              ],
            },
            {
              key: 'brand',
              label: 'Brand Marketing',
              children: [
                {
                  key: 'brand-manager',
                  label: 'Brand Manager',
                },
                {
                  key: 'creative-director',
                  label: 'Creative Director',
                },
              ],
            },
          ],
        },
      ]
      resolve(res)
    }, 1000)
  })
}

const updateKey = ref(0)

const load = () => {
  updateKey.value++
}
</script>

<template>
  <lew-tree-select
    v-model="value"
    :key="updateKey"
    :initOptionsMethod="initOptionsMethod"
    placeholder="Please select department"
    width="300px"
    searchable
    clearable
    show-line
  />
  <lew-button type="ghost" style="margin-top: 20px" @click="load">
    load again {{ updateKey }}
  </lew-button>
</template>

<style scoped>
.demo-tree-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-result {
  font-size: 14px;
  color: #666;
}

.demo-description {
  font-size: 12px;
  color: #999;
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
}

.demo-description ul {
  margin: 8px 0 0 0;
  padding-left: 20px;
}

.demo-description li {
  margin: 4px 0;
}
</style>
