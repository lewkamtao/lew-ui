<script setup lang="ts">
import { Chat24Regular } from '@vicons/fluent';
import { Icon } from '@vicons/utils';
</script>

<template>
    <div style="width: 600px; margin: 0 auto">
        <lew-comment>
            <template #avatar>
                <lew-avatar
                    src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                    alt="avatar"
                    round
                />
            </template>
            <template #header>
                <lew-flex x="start">
                    <div class="nickname">蛇断了条腿</div>
                    <lew-tag size="small" type="info">作者</lew-tag>
                    <div class="datetime">1天前</div>
                </lew-flex>
            </template>
            <template #content>
                <div class="content">
                    这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容
                </div>
            </template>
            <template #footer>
                <div style="margin-top: 10px">
                    <lew-button size="small" is-icon type="normal">
                        <Icon size="16"><Chat24Regular /></Icon>
                        <span style="margin-left: 3px">回复</span>
                    </lew-button>
                </div>
            </template>
        </lew-comment>
        <lew-comment style="padding: 20px 0px 0px 50px">
            <template #avatar>
                <lew-avatar
                    src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                    alt="avatar"
                    round
                />
            </template>
            <template #header>
                <lew-flex x="start">
                    <lew-tag size="small" bold type="error">公爵</lew-tag>
                    <div class="nickname">蛇断了条腿</div>
                    <div class="datetime">1天前</div>
                </lew-flex>
            </template>
            <template #content>
                <div class="content">
                    这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容
                </div>
            </template>
            <template #footer>
                <div style="margin-top: 10px">
                    <lew-button size="small" is-icon type="normal">
                        <Icon size="16"><Chat24Regular /></Icon>
                        <span style="margin-left: 3px">回复</span>
                    </lew-button>
                </div>
            </template>
        </lew-comment>
        <lew-comment style="padding: 20px 0px 0px 50px">
            <template #avatar>
                <lew-avatar
                    src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                    alt="avatar"
                    round
                />
            </template>
            <template #header>
                <lew-flex x="start">
                    <lew-tag size="small" bold type="error">公爵</lew-tag>
                    <div class="nickname">蛇断了条腿</div>
                    <div class="datetime">1天前</div>
                </lew-flex>
            </template>
            <template #content>
                <div class="content">
                    这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容
                </div>
            </template>
            <template #footer>
                <div style="margin-top: 10px">
                    <lew-button size="small" is-icon type="normal">
                        <Icon size="16"><Chat24Regular /></Icon>
                        <span style="margin-left: 3px">回复</span>
                    </lew-button>
                </div>
            </template>
        </lew-comment>
        <lew-comment style="padding: 20px 0px 0px 50px">
            <template #avatar>
                <lew-avatar
                    src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                    alt="avatar"
                    round
                />
            </template>
            <template #header>
                <lew-flex x="start">
                    <lew-tag size="small" bold type="error">公爵</lew-tag>
                    <div class="nickname">蛇断了条腿</div>
                    <div class="datetime">1天前</div>
                </lew-flex>
            </template>
            <template #content>
                <div class="content">
                    这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容
                </div>
            </template>
            <template #footer>
                <div style="margin-top: 10px">
                    <lew-button size="small" is-icon type="normal">
                        <Icon size="16"><Chat24Regular /></Icon>
                        <span style="margin-left: 3px">回复</span>
                    </lew-button>
                </div>
            </template>
        </lew-comment>
        <lew-comment style="padding: 20px 0px 0px 50px">
            <template #avatar>
                <lew-avatar
                    src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                    alt="avatar"
                    round
                />
            </template>
            <template #header>
                <lew-flex x="start">
                    <lew-tag size="small" bold type="error">公爵</lew-tag>
                    <div class="nickname">蛇断了条腿</div>
                    <div class="datetime">1天前</div>
                </lew-flex>
            </template>
            <template #content>
                <lew-input style="width: 100%" type="textarea" class="content">
                </lew-input>
            </template>
            <template #footer>
                <lew-flex x="start" style="margin-top: 10px">
                    <lew-button size="small">回复</lew-button>
                    <lew-button type="normal" size="small">取消</lew-button>
                </lew-flex>
            </template>
        </lew-comment>
    </div>
</template>

<style lang="scss" scoped>
.nickname {
    font-size: 14px;
    font-weight: bold;
    color: var(--lew-text-color-4);
    white-space: nowrap;
}
.datetime {
    font-size: 12px;
    color: var(--lew-text-color-7);
    white-space: nowrap;
}
.content {
    margin-top: 10px;
}
</style>
