<script setup lang="ts">
import { Settings } from 'lucide-vue-next'
const visible = ref(false)
</script>

<template>
    <lew-flex x="start">
        <lew-button type="fill" @click="visible = true">
            <Settings :size="16" />
            System Preferences
        </lew-button>
    </lew-flex>
    <lew-modal
        v-model:visible="visible"
        closeOnClickOverlay
        closeByEsc
        width="420px"
        title="System Preferences"
        :closeButtonProps="{
            request: () => {
                visible = false
            },
        }"
        :okButtonProps="{
            request: () => {
                visible = false
            },
        }"
    >
        <div class="modal-body">
            <div class="preferences-content">
                <div class="preference-item">
                    <div class="preference-icon">🔔</div>
                    <div class="preference-info">
                        <h3>Notifications</h3>
                        <p>Manage how you receive notifications and alerts</p>
                    </div>
                </div>
                <div class="preference-item">
                    <div class="preference-icon">🔒</div>
                    <div class="preference-info">
                        <h3>Security</h3>
                        <p>Configure security settings and privacy options</p>
                    </div>
                </div>
                <div class="preference-item">
                    <div class="preference-icon">🌙</div>
                    <div class="preference-info">
                        <h3>Appearance</h3>
                        <p>Customize the look and feel of your interface</p>
                    </div>
                </div>
            </div>
        </div>
    </lew-modal>
</template>

<style lang="scss" scoped>
.modal-body {
    width: 100%;
    height: 100%;
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-sizing: border-box;
}

.preferences-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.preference-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border-radius: 8px;
    background-color: var(--lew-bgcolor-1);
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--lew-bgcolor-2);
    }

    .preference-icon {
        font-size: 24px;
        opacity: 0.9;
    }

    .preference-info {
        h3 {
            font-size: 15px;
            font-weight: 600;
            color: var(--lew-text-color-0);
            margin-bottom: 4px;
        }

        p {
            font-size: 13px;
            color: var(--lew-text-color-2);
            line-height: 1.4;
        }
    }
}
</style>
