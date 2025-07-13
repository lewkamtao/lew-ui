<script setup lang="ts">
const inputValues = reactive({
  email: '',
  website: '',
  address: '',
})

const selectValues = reactive({
  protocol: 'https://',
  domain: '.com',
  city: 'New York',
})

const options = {
  cities: [
    { label: 'New York', value: 'New York' },
    { label: 'London', value: 'London' },
    { label: 'Tokyo', value: 'Tokyo' },
    { label: 'Berlin', value: 'Berlin' },
    { label: 'Canberra', value: 'Canberra' },
  ],
  protocols: [
    { label: 'http://', value: 'http://' },
    { label: 'https://', value: 'https://' },
  ],
  domains: [
    { label: '.com', value: '.com' },
    { label: '.cn', value: '.cn' },
    { label: '.org', value: '.org' },
    { label: '.net', value: '.net' },
  ],
}

const getSuffixTooltip = () => {
  const domainDesc = {
    '.com': 'The common top-level domain for commercial websites',
    '.cn': 'The national top-level domain for China',
    '.org': 'Domain for non-profit organizations',
    '.net': 'Domain for network service providers',
  }[selectValues.domain]

  return domainDesc
}

const getPrefixesTooltip = () => {
  const protocolDesc =
    selectValues.protocol === 'https://'
      ? 'Secure encrypted hypertext transfer protocol'
      : 'Standard hypertext transfer protocol'

  return protocolDesc
}
</script>

<template>
  <lew-flex :gap="20" x="start" direction="y">
    <lew-input
      v-model="inputValues.email"
      auto-width
      min-width="180px"
      clearable
      suffix="text"
      suffixValue="@gmail.com"
      placeholder="Please enter your email"
    />
    <lew-input
      v-model="inputValues.website"
      v-model:prefixValue="selectValues.protocol"
      v-model:suffixValue="selectValues.domain"
      prefixes="select"
      :prefixesOptions="options.protocols"
      suffix="select"
      width="500px"
      :suffixOptions="options.domains"
      :suffixTooltip="getSuffixTooltip"
      :prefixesTooltip="getPrefixesTooltip"
      placeholder="Please enter the website name"
    />
    <lew-input
      v-model="inputValues.address"
      v-model:prefixValue="selectValues.city"
      prefixes="select"
      width="500px"
      :prefixesOptions="options.cities"
      placeholder="Please enter the detailed address"
    />
  </lew-flex>
</template>
