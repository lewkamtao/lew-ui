<template>
    <lew-flex direction="y">
        <lew-flex x="start" wrap>
            <lew-tag >primary</lew-tag>
            <lew-tag color="green">success</lew-tag>
            <lew-tag type="error">error</lew-tag>
            <lew-tag type="warning">warning</lew-tag>
            <lew-tag type="normal">normal</lew-tag>
        </lew-flex>
        <lew-flex x="start" wrap>
            <lew-tag  round>primary</lew-tag>
            <lew-tag color="green" round>success</lew-tag>
            <lew-tag type="error" round>error</lew-tag>
            <lew-tag type="warning" round>warning</lew-tag>
            <lew-tag type="normal" round>normal</lew-tag>
        </lew-flex>
        <lew-flex x="start" wrap>
            <lew-tag size="small" round >1</lew-tag>
            <lew-tag color="green">2</lew-tag>
            <lew-tag size="large" type="error">3</lew-tag>
        </lew-flex>
    </lew-flex>
</template>
