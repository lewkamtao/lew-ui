<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
    <lew-flex direction="column">
        <lew-flex width="320px" direction="row" mode="between">
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'top-start',
                    trigger: 'mouseenter',
                }"
                >top-start</lew-button
            >
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'top',
                    trigger: 'mouseenter',
                }"
                >top</lew-button
            >
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'top-end',
                    trigger: 'mouseenter',
                }"
                >top-end</lew-button
            ></lew-flex
        >
        <lew-flex width="320px" direction="row" mode="between">
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'left-start',
                    trigger: 'mouseenter',
                }"
                >left-start</lew-button
            >

            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'right-start',
                    trigger: 'mouseenter',
                }"
                >right-start</lew-button
            ></lew-flex
        >
        <lew-flex width="320px" direction="row" mode="between">
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'left',
                    trigger: 'mouseenter',
                }"
                >left</lew-button
            >

            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'right',
                    trigger: 'mouseenter',
                }"
                >right</lew-button
            ></lew-flex
        >
        <lew-flex width="320px" direction="row" mode="between">
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'left-end',
                    trigger: 'mouseenter',
                }"
                >left-end</lew-button
            >

            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'right-end',
                    trigger: 'mouseenter',
                }"
                >right-end</lew-button
            ></lew-flex
        >
        <lew-flex width="320px" direction="row" mode="between">
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'bottom-start',
                    trigger: 'mouseenter',
                }"
                >bottom-start</lew-button
            >
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'bottom',
                    trigger: 'mouseenter',
                }"
                >bottom</lew-button
            >
            <lew-button
                v-tooltip="{
                    content:
                        '人们每天忙忙碌碌，争取金钱和地位，沉溺于琐事和俗务，这些事物充斥着人生。这种没有空白的生命，最终有几个不是赢了别人，输了自己。',
                    placement: 'bottom-end',
                    trigger: 'mouseenter',
                }"
                >bottom-end</lew-button
            ></lew-flex
        >
    </lew-flex>
</template>
