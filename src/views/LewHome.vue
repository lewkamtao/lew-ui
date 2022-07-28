<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
    };

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
    const interval: any = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: {
                    x: randomInRange(0.1, 0.3),
                    y: Math.random() - 0.2,
                },
            }),
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: {
                    x: randomInRange(0.7, 0.9),
                    y: Math.random() - 0.2,
                },
            }),
        );
    }, 300);
});

const router = useRouter();
let v = ref('');
let lewPopoverRef = ref();
const submit = () => {
    LewMessage.error(v.value || '密码不可为空');
    lewPopoverRef.value.hide();
};
const open = (type: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewDialog[type]({
        title: '删除确认',
        content: '删除之后无法恢复，请确定',
        ok: () => {
            console.log('确定');
        },
        cancel: () => {
            console.log('取消');
        },
    });
};
let user = ref({
    username: '',
    password: '',
    age: '',
    sex: 0,
    hobby: [],
    school: '',
    home: '',
    dark: true,
    pay: '',
});

let sex_options = ref([
    { label: '未知', value: 0 },
    { label: '男', value: 1 },
    { label: '女', value: 2 },
]);

let hobby_options = ref([
    { label: '唱歌', value: 1 },
    { label: '跳', value: 2 },
    { label: 'rap', value: 3 },
    { label: '打篮球', value: 44 },
]);
let home_options = ref([
    {
        label: '广东',
        value: '1',
    },
    {
        label: '深圳',
        value: '2',
    },
    {
        label: '杭州',
        value: '3',
    },
    {
        label: '上海',
        value: '4',
    },
    {
        label: '北京',
        value: '5',
    },
]);

const breadcrumb_options = ref([
    {
        label: '首页',
        to: '/',
    },
    {
        label: 'Vue',
        to: 'https://vuejs.org/',
    },
    {
        label: '商品列表',
        to: '',
    },
    {
        label: '商品详情',
        to: '',
        active: true,
    },
]);

const tab_soptions = ref([
    { label: '北京', value: '1' },
    { label: '上海', value: '2' },
    { label: '广州', value: '3' },
    { label: '深圳', value: '4' },
    { label: '乌鲁木齐', value: '5' },
]);

let dropdown_options = ref([
    {
        label: '西游记',
        value: '1',
    },
    {
        label: '水浒传',
        value: '2',
    },
    {
        label: '三国演义',
        value: '3',
    },
    {
        label: '红楼梦',
        value: '4',
    },
]);

let list = ref([
    {
        type: 'info',
        title: '成功发送一条消息',
        content: '',
    },
    {
        type: 'normal',
        title: '成功发送一条消息',
        content: '',
    },
    {
        type: 'warning',
        title: '成功发送一条消息',
        content: '',
    },

    {
        type: 'error',
        title: '成功发送一条消息',
        content: '',
    },
    {
        type: 'success',
        title: '成功发送一条消息',
        content: '',
    },
]);

const message = (type: string) => {
    LewMessage[type]('这是一条demo消息');
};
</script>

<template>
    <div class="home-wrapper">
        <div class="startbox">
            <div class="slogan">
                少就是
                <div class="dm">
                    <div class="text"><span>多</span> <span>美</span></div>
                </div>
            </div>
            <p>一个 Vue 3 组件库</p>
            <lew-button @click="router.push('/Avatar')" style="margin-top: 10px"
                >开始使用</lew-button
            >
        </div>
        <div class="home">
            <lew-flex direction="y" gap="40px">
                <lew-flex class="item" direction="column" x="end" gap="40px">
                    <lew-flex direction="column" x="end" gap="0px">
                        <lew-title size="16px" :bold="200"
                            >Lew Design</lew-title
                        >
                        <lew-title size="24px" :bold="400"
                            >Lew Design</lew-title
                        >
                        <lew-title size="32px" :bold="600"
                            >Lew Design</lew-title
                        >
                        <lew-title size="40px" :bold="900"
                            >Lew Design</lew-title
                        >
                    </lew-flex>
                    <lew-flex x="end" gap="20px">
                        <lew-badge round value="99+">
                            <lew-avatar
                                src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                            ></lew-avatar>
                        </lew-badge>
                        <lew-badge type="info" round value="99+">
                            <lew-avatar
                                src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                            ></lew-avatar>
                        </lew-badge>
                        <lew-avatar
                            src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                            status="online"
                            status-position="bottom-left"
                        />
                        <lew-avatar
                            src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
                            status="processing"
                            status-position="bottom-right"
                        />
                    </lew-flex>
                    <lew-flex x="end" gap="20px">
                        <lew-tag type="primary">primary</lew-tag>
                        <lew-tag type="success">success</lew-tag>
                        <lew-tag type="error">error</lew-tag>
                        <lew-tag type="warning">warning</lew-tag>
                        <lew-tag type="normal">normal</lew-tag>
                    </lew-flex>

                    <lew-flex x="end" gap="20px">
                        <lew-button type="normal">取消</lew-button>
                        <lew-button>确定</lew-button>
                        <lew-button loading type="warning">确定</lew-button>
                        <lew-button type="error">确定</lew-button>
                        <lew-button type="success">确定</lew-button>
                    </lew-flex>
                    <lew-flex x="end">
                        <lew-breadcrumb :options="breadcrumb_options">
                        </lew-breadcrumb
                    ></lew-flex>

                    <lew-flex x="end" style="width: 380px">
                        <lew-tabs :options="tab_soptions"
                    /></lew-flex>

                    <lew-flex gap="20px" x="end">
                        <lew-dropdown :options="dropdown_options">
                            <lew-button type="normal">trigger hover</lew-button>
                        </lew-dropdown>
                        <lew-dropdown
                            :options="dropdown_options"
                            trigger="click"
                            placement="top"
                        >
                            <lew-button type="normal">trigger click</lew-button>
                        </lew-dropdown></lew-flex
                    >
                </lew-flex>

                <lew-flex class="item" direction="column">
                    <lew-flex direction="column" class="form-box">
                        <lew-form-item direction="y" title="Input">
                            <LewInput v-model="user.username" />
                        </lew-form-item>
                        <lew-form-item direction="y" title="Input">
                            <LewInput resize="none" />
                        </lew-form-item>
                        <lew-form-item direction="y" title="Textarea">
                            <LewInput type="textarea" resize="none" />
                        </lew-form-item>
                        <lew-form-item direction="y" title="Select">
                            <LewSelect
                                v-model="user.home"
                                :options="home_options"
                            />
                        </lew-form-item>
                        <lew-form-item direction="y" title="Radio">
                            <lew-radiobox-group
                                v-model="user.sex"
                                :options="sex_options"
                            />
                        </lew-form-item>
                        <lew-form-item direction="y" title="Checkbox">
                            <lew-checkbox-group
                                v-model="user.hobby"
                                :options="hobby_options"
                            />
                        </lew-form-item>
                        <lew-form-item direction="y" title="Switch">
                            <LewSwitch v-model="user.dark" />
                        </lew-form-item>
                    </lew-flex>
                </lew-flex>
                <lew-flex class="item" direction="column" gap="20px">
                    <LewAlert :list="list"></LewAlert>
                    <lew-flex wrap x="start" gap="20px">
                        <lew-button type="normal" @click="message('error')"
                            >Message</lew-button
                        >
                        <lew-button type="success" @click="message('success')"
                            >Save</lew-button
                        >
                    </lew-flex>
                    <lew-flex wrap x="start" gap="20px">
                        <lew-button type="error" @click="open('normal')"
                            >Dialog</lew-button
                        >
                        <lew-button type="warning" @click="open('success')"
                            >Cancel</lew-button
                        >
                    </lew-flex>
                    <lew-flex x="start" gap="20px">
                        <lew-popover
                            ref="lewPopoverRef"
                            trigger="click"
                            placement="bottom-start"
                        >
                            <template #trigger>
                                <lew-button>Popover</lew-button>
                            </template>
                            <template #popover-body>
                                <div class="popover-body">
                                    <lew-form-item
                                        direction="y"
                                        title="请输入密码"
                                    >
                                        <lew-input v-model="v" />
                                    </lew-form-item>

                                    <div class="footer">
                                        <lew-button
                                            type="blank"
                                            size="small"
                                            @click="lewPopoverRef.hide()"
                                            >取消
                                        </lew-button>
                                        <lew-button
                                            size="small"
                                            @click="submit()"
                                            >提交</lew-button
                                        >
                                    </div>
                                </div>
                            </template>
                        </lew-popover></lew-flex
                    >
                </lew-flex>
            </lew-flex>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.popover-body {
    padding: 15px;
    box-sizing: border-box;
}

.home-wrapper {
    width: 100%;
    perspective: 800;
    overflow: hidden;
    -webkit-perspective: 800;

    .startbox {
        position: fixed;
        left: 50px;
        top: 50px;
        z-index: 99;
        animation: start 3s ease;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
        opacity: 0;

        .slogan {
            display: flex;
            font-size: 50px;
            font-weight: 900;
            cursor: pointer;
            .dm {
                width: 50px;
                overflow: hidden;

                .text {
                    display: flex;
                    transition: all 0.5s ease;
                }
            }
        }
        .slogan:hover {
            .text {
                transform: translateX(-100%);
            }
        }
    }
    .home {
        min-height: 100vh;
        box-sizing: border-box;
        animation: demo 3s ease;
        transform: scale(1) rotateX(0deg) rotateY(0deg);
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
        opacity: 0;
        .item {
            flex-shrink: 0;
            width: 400px;
            height: calc(100vh - 70px);
        }
    }
    @keyframes demo {
        from {
            opacity: 0;
            transform: scale(0.8) rotateX(0deg) rotateY(0deg);
        }
        to {
            opacity: 1;
            transform: scale(1.2) rotateX(15deg) rotateY(-15deg);
        }
    }
    @keyframes start {
        from {
            opacity: 0;
            transform: translateY(15%);
        }
        to {
            opacity: 1;
            transform: translateY(0%);
        }
    }
}

@media (max-width: 767px) {
    .home-wrapper {
        .startbox {
            left: 50%;
            top: 25px;
            text-align: center;
            white-space: nowrap;
        }
        @keyframes start {
            from {
                opacity: 0;
                transform: translate(-50%, 100%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 50%);
            }
        }
        @keyframes demo {
            from {
                opacity: 0;
                transform: scale(0.3) translate(-320px, 200px) rotateX(0deg)
                    rotateY(0deg);
            }
            to {
                opacity: 1;
                transform: scale(0.5) translate(-320px, 200px) rotateX(15deg)
                    rotateY(-15deg);
            }
        }
        .home {
            .item {
                flex-shrink: 0;
                width: 300px;
                height: calc(100vh - 70px);
            }
        }
    }
}
</style>
