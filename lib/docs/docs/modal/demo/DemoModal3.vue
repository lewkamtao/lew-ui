<script setup lang="ts">
const visible = ref(false)
const edit = ref(false)
const notify = ref(false)
const ok = () => {
    return new Promise<void>(() => {
        setTimeout(() => {
            visible.value = false
        }, 1000)
    })
}

const close = () => {
    visible.value = false
}
</script>

<template>
    <lew-flex x="start">
        <lew-button type="ghost" @click="visible = true"
            >Share Document</lew-button
        >
    </lew-flex>
    <lew-modal
        v-model:visible="visible"
        closeOnClickOverlay
        width="550px"
        :okButtonProps="{ request: ok }"
        :closeButtonProps="{ request: close }"
    >
        <template #header>
            <lew-flex x="start" class="lew-modal-header">
                <lew-tag color="blue">Share</lew-tag>
                Share Document
            </lew-flex>
        </template>
        <div class="lew-modal-body">
            <div class="share-content">
                <p class="description">
                    Share this document with your team members. They will
                    receive an email notification with access to the document.
                </p>
                <div class="share-options">
                    <div class="option">
                        <lew-checkbox label="Allow editing" v-model="edit">
                        </lew-checkbox>
                    </div>
                    <div class="option">
                        <lew-checkbox
                            label="Send email notification"
                            v-model="notify"
                        >
                        </lew-checkbox>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <lew-flex x="end" y="center" class="lew-modal-footer">
                <lew-flex x="start" gap="5" class="lew-modal-footer-tips">
                    Changes will be applied immediately
                </lew-flex>
                <lew-flex x="end" y="center" gap="8">
                    <lew-button
                        type="text"
                        color="gray"
                        :request="close"
                        size="small"
                        >Cancel</lew-button
                    >
                    <lew-button :request="ok" size="small">Share</lew-button>
                </lew-flex>
            </lew-flex>
        </template>
    </lew-modal>
</template>

<style lang="scss" scoped>
.lew-modal-body {
    width: 100%;
    height: 100%;
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-sizing: border-box;
}

.lew-modal-header {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 60px;
    font-size: 20px;
    font-weight: 600;
    padding: 0 24px;
    color: var(--lew-text-color-0);
}

.share-content {
    .description {
        font-size: 14px;
        line-height: 1.5;
        color: var(--lew-text-color-2);
        margin-bottom: 24px;
    }

    .share-options {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .option {
            display: flex;
            align-items: center;
            gap: 8px;

            input[type='checkbox'] {
                width: 16px;
                height: 16px;
                border-radius: 4px;
                border: 1px solid var(--lew-border-color);
                cursor: pointer;
            }

            label {
                font-size: 14px;
                color: var(--lew-text-color-1);
                cursor: pointer;
            }
        }
    }
}

.lew-modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-top: 1px solid var(--lew-border-color);
}

.lew-modal-footer-tips {
    font-size: 13px;
    font-weight: normal;
    color: var(--lew-text-color-3);
}
</style>
