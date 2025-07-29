<script lang="ts" setup>
const value = ref(['1'])
const companies = [
  {
    id: '1',
    name: 'Apple',
    description:
      'Apple Inc. is an American multinational technology company that designs, manufactures, and markets consumer electronics, computer software, and online services. Founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in 1976, Apple is known for its innovative products such as the iPhone, iPad, Mac computers, and Apple Watch.',
  },
  {
    id: '2',
    name: 'Google',
    description:
      'Google is a technology company that specializes in Internet-related services and products. Founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University, Google is now one of the most valuable companies in the world, known for its search engine, online advertising, and cloud computing services.',
  },
  {
    id: '3',
    name: 'Microsoft',
    description:
      'Microsoft Corporation is an American technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers. Founded by Bill Gates and Paul Allen in 1975, Microsoft is best known for its Windows operating system and Office productivity suite.',
  },
  {
    id: '4',
    name: 'Tencent',
    description:
      'Tencent Holdings Limited is a Chinese multinational conglomerate holding company founded in 1998. Tencent is one of the largest technology companies in the world, offering a wide range of internet services and products, including social media, entertainment, and online payment systems.',
  },
  {
    id: '5',
    name: 'Amazon',
    description:
      'Amazon.com, Inc. is an American multinational technology company founded by Jeff Bezos in 1994. Amazon is the world\'s largest online retailer and cloud computing company, known for its e-commerce platform, Amazon Prime subscription service, and Amazon Web Services (AWS) cloud computing platform.',
  },
  {
    id: '6',
    name: 'Tesla',
    description:
      'Tesla, Inc. is an American electric vehicle and clean energy company founded by Elon Musk, Martin Eberhard, Marc Tarpenning, JB Straubel, and Ian Wright in 2003. Tesla is known for its electric vehicles, energy storage solutions, and solar products, aiming to accelerate the world\'s transition to sustainable energy.',
  },
]

const companies1 = [
  {
    id: '1123',
    name: 'iPhone',
    description:
      'Apple Inc. is an American multinational technology company that designs, manufactures, and markets consumer electronics, computer software, and online services. Founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in 1976, Apple is known for its innovative products such as the iPhone, iPad, Mac computers, and Apple Watch.',
  },
  {
    id: '2123a',
    name: 'iPad',
    description:
      'Google is a technology company that specializes in Internet-related services and products. Founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University, Google is now one of the most valuable companies in the world, known for its search engine, online advertising, and cloud computing services.',
  },
]
</script>

<template>
  <lew-collapse v-model="value" :width="400">
    <lew-collapse-item
      v-for="item in companies"
      :key="item.id"
      :title="item.name"
      :collapse-key="item.id"
    >
      <template v-if="item.name === 'Apple'">
        <lew-collapse v-model="value" width="100%" style="padding-left: 20px">
          <lew-collapse-item
            v-for="subItem in companies1"
            :key="subItem.id"
            :title="subItem.name"
            :collapse-key="subItem.id"
          >
            <div>
              {{ subItem.description }}
            </div>
          </lew-collapse-item>
        </lew-collapse>
      </template>
      <template v-else>
        <div>
          {{ item.description }}
        </div>
      </template>
    </lew-collapse-item>
  </lew-collapse>
</template>
