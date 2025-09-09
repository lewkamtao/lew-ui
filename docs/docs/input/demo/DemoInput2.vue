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

function getSuffixTooltip() {
  const domainDesc = {
    '.com': 'The common top-level domain for commercial websites',
    '.cn': 'The national top-level domain for China',
    '.org': 'Domain for non-profit organizations',
    '.net': 'Domain for network service providers',
  }[selectValues.domain]

  return domainDesc
}

function getPrefixesTooltip() {
  const protocolDesc
    = selectValues.protocol === 'https://'
      ? 'Secure encrypted hypertext transfer protocol'
      : 'Standard hypertext transfer protocol'

  return protocolDesc
}
</script>

<template>
  <lew-flex gap="20px" x="start" direction="y">
    <lew-input
      v-model="inputValues.email"
      auto-width
      min-width="180px"
      clearable
      suffix="text"
      suffix-value="@gmail.com"
      placeholder="Please enter your email"
    />
    <lew-input
      v-model="inputValues.website"
      v-model:prefix-value="selectValues.protocol"
      v-model:suffix-value="selectValues.domain"
      prefixes="select"
      :prefixes-options="options.protocols"
      suffix="select"
      width="500px"
      :suffix-options="options.domains"
      :suffix-tooltip="getSuffixTooltip"
      :prefixes-tooltip="getPrefixesTooltip"
      placeholder="Please enter the website name"
    />
    <lew-input
      v-model="inputValues.address"
      v-model:prefix-value="selectValues.city"
      prefixes="select"
      width="500px"
      :prefixes-options="options.cities"
      placeholder="Please enter the detailed address"
    />
  </lew-flex>
</template>
