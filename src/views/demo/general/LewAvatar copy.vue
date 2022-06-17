<template>
    <LewAvatar :src="avatarUrl" status="online" status-position="top-left" />
    <LewAvatar :src="avatarUrl" status="busy" status-position="top-right" />
    <LewAvatar
        :src="avatarUrl"
        round
        status="away"
        status-position="bottom-left"
    />
    <LewAvatar
        :src="avatarUrl"
        round
        status="offline"
        status-position="bottom-right"
    />
</template>
