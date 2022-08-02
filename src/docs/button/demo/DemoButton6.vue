<template>
    <lew-flex wrap x="start" gap="20px">
        <lew-button type="blank">小</lew-button>
        <lew-button type="primary" is-icon size="small" disabled>
            <Info24Regular />
        </lew-button>
        <lew-button type="info" is-icon size="small" disabled>
            <CheckmarkCircle24Regular />
        </lew-button>
        <lew-button type="warning" is-icon size="small">
            <Warning24Regular />
        </lew-button>
        <lew-button type="error" is-icon size="small">
            <ErrorCircle24Regular />
        </lew-button>
        <lew-button type="success" is-icon size="small">
            <AlertUrgent20Regular />
        </lew-button>
        <lew-button type="normal" is-icon loading size="small">
            <Alert24Regular />
        </lew-button>
    </lew-flex>
    <lew-flex wrap x="start" gap="20px">
        <lew-button type="blank">大</lew-button>
        <lew-button type="primary" is-icon>
            <Info24Regular />
        </lew-button>
        <lew-button type="info" is-icon>
            <CheckmarkCircle24Regular />
        </lew-button>
        <lew-button type="warning" is-icon disabled>
            <Warning24Regular />
        </lew-button>
        <lew-button type="error" is-icon disabled>
            <ErrorCircle24Regular />
        </lew-button>
        <lew-button type="success" is-icon>
            <AlertUrgent20Regular />
        </lew-button>
        <lew-button type="normal" is-icon>
            <Alert24Regular />
        </lew-button>
    </lew-flex>
    <lew-flex wrap x="start" gap="20px">
        <lew-button type="blank">超大</lew-button>
        <lew-button type="primary" is-icon size="large">
            <Info24Regular />
        </lew-button>
        <lew-button type="info" is-icon size="large">
            <CheckmarkCircle24Regular />
        </lew-button>
        <lew-button type="warning" is-icon size="large">
            <Warning24Regular />
        </lew-button>
        <lew-button type="error" is-icon size="large">
            <ErrorCircle24Regular />
        </lew-button>
        <lew-button type="success" is-icon size="large" disabled>
            <AlertUrgent20Regular />
        </lew-button>
        <lew-button type="normal" is-icon size="large" disabled>
            <Alert24Regular />
        </lew-button>
    </lew-flex>
</template>
<script lang="ts" setup>
import {
    Info24Regular,
    Warning24Regular,
    CheckmarkCircle24Regular,
    ErrorCircle24Regular,
    Alert24Regular,
    AlertUrgent20Regular,
} from '@vicons/fluent';
</script>
