<script setup lang="ts">
const data = ref({
    name: 'Steve Jobs',
    title: 'Co-founder of Apple Inc.',
    birth: 'February 24, 1955',
    death: 'October 5, 2011',
    achievements: [
        'Founded Apple Inc.',
        'Launched Macintosh computer',
        'Founded NeXT',
        'Acquired Pixar',
        'Returned to Apple and launched iPod, iPhone, iPad',
    ],
    quote: 'Stay hungry, stay foolish.',
})
</script>

<template>
    <lew-popover trigger="hover" placement="bottom-start">
        <template #trigger>
            <lew-avatar
                shape="circle"
                src="https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/146d572968e09c8bdc4f45ef58ca110_cn9qli_.jpeg"
            />
        </template>
        <template #popover-body>
            <div class="popover-body">
                <div class="header">
                    <h3 class="name">{{ data.name }}</h3>
                    <span class="title">{{ data.title }}</span>
                </div>

                <div class="info">
                    <div class="info-item">
                        <span class="label">Birth</span>
                        <span class="value">{{ data.birth }}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Death</span>
                        <span class="value">{{ data.death }}</span>
                    </div>
                </div>

                <div class="achievements">
                    <h4>Major Achievements</h4>
                    <ul>
                        <li
                            v-for="(item, index) in data.achievements"
                            :key="index"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <div class="quote">
                    <p>"{{ data.quote }}"</p>
                </div>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.popover-body {
    padding: 16px;
    box-sizing: border-box;
    width: 320px;

    .header {
        margin-bottom: 16px;

        .name {
            margin: 0 0 4px;
            font-size: 18px;
            font-weight: 600;
            color: var(--lew-text-color-1);
        }

        .title {
            font-size: 14px;
            color: var(--lew-text-color-2);
        }
    }

    .info {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--lew-bgcolor-2);
        border-radius: 8px;

        .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;

            &:last-child {
                margin-bottom: 0;
            }

            .label {
                color: var(--lew-text-color-2);
            }

            .value {
                color: var(--lew-text-color-1);
                font-weight: 500;
            }
        }
    }

    .achievements {
        margin-bottom: 16px;

        h4 {
            margin: 0 0 8px;
            font-size: 14px;
            color: var(--lew-text-color-1);
        }

        ul {
            margin: 0;
            padding-left: 20px;

            li {
                margin-bottom: 4px;
                font-size: 13px;
                color: var(--lew-text-color-2);
                line-height: 1.5;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    .quote {
        padding-top: 16px;
        border-top: 1px solid var(--lew-border-color);

        p {
            margin: 0;
            font-size: 14px;
            color: var(--lew-text-color-2);
            font-style: italic;
            text-align: center;
        }
    }
}
</style>
