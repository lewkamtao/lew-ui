<template>
    <lew-result
        style="height: 60vh"
        status="success"
        title="更新成功"
        content="你可以前往个人中心，继续完善信息。"
    >
        <template #handle>
            <lew-flex style="margin-top: 30px">
                <lew-button type="normal">返回</lew-button>
                <lew-button>前往</lew-button>
            </lew-flex>
        </template>
    </lew-result>
    <lew-result
        style="height: 60vh"
        status="warning"
        title="警告"
        content="这是一段文字，这是一段文字这是一段文字这是一段文字。"
    >
        <template #title> 警告 </template>
        <template #handle>
            <lew-flex style="margin-top: 30px">
                <lew-button type="normal">返回</lew-button>
                <lew-button>前往</lew-button>
            </lew-flex>
        </template>
    </lew-result>
    <lew-result
        style="height: 60vh"
        status="error"
        title="发布失败"
        content="当前网络环境较差，请稍后再试。"
    >
        <template #handle>
            <lew-flex style="margin-top: 30px">
                <lew-button type="normal">返回</lew-button>
                <lew-button>前往</lew-button>
            </lew-flex>
        </template>
    </lew-result>
    <lew-result
        style="height: 60vh"
        status="info"
        title="操作提示"
        content="你可以前往个人中心，继续完善信息。"
    >
        <template #handle>
            <lew-flex style="margin-top: 30px">
                <lew-button type="normal">返回</lew-button>
                <lew-button>前往</lew-button>
            </lew-flex>
        </template>
    </lew-result>
</template>
