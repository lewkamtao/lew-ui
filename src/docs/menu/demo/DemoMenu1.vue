<script setup lang="ts">
    const options = ref([
        {
            label: 'ANALTYTICS',
            value: 'ANALTYTICS',
            children: [
                {
                    label: 'Dashboard',
                    value: 'Dashboard',
                    icon: 'columns'
                },
                {
                    label: 'Performance',
                    value: 'Performance',
                    icon: 'activity'
                }
            ]
        },
        {
            label: 'CONTNET',
            value: 'CONTNET',
            children: [
                {
                    label: 'Guides',
                    value: 'Guides',
                    icon: 'file-text',
                    tagText: 'Beta',
                    tagColor: 'success'
                },
                {
                    label: 'Hotspots',
                    value: 'Hotspots',
                    icon: 'command'
                },
                {
                    label: 'Checklists',
                    value: 'Checklists',
                    icon: 'check-square'
                },
                {
                    label: 'NPS',
                    value: 'NPS',
                    icon: 'award'
                }
            ]
        },
        {
            label: 'CUSTOMIZATION',
            value: 'CUSTOMIZATION',
            children: [
                {
                    label: 'Segments',
                    value: 'Segments',
                    icon: 'folder'
                },
                {
                    label: 'Themes',
                    value: 'Themes',
                    icon: 'hash'
                }
            ]
        }
    ]);

    let actived = ref('Guides');
</script>
<template>
    <div class="menu lew-scrollbar">
        <lew-menu
            :options="options"
            :actived="actived"
            @change="(item:any) => (actived = item.value)"
        />
    </div>
</template>

<style lang="scss" scoped>
    .menu {
        height: 600px;
        width: 320px;
        overflow-y: auto;
        box-shadow: var(--lew-form-box-shadow);
        border: 1px #eee solid;
    }
</style>
