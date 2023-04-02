<template>
    <lew-flex direction="y" x="start" gap="20px">
        <div>
            <lew-title size="16">normal</lew-title>
            <lew-flex y="end">
                <lew-button size="small" text="submit" />
                <lew-button size="medium" text="submit" />
                <lew-button size="large" text="submit" />
            </lew-flex>
        </div>
        <div>
            <lew-title size="16">icon</lew-title>
            <lew-flex y="end">
                <lew-button size="small" icon="message-circle" />
                <lew-button size="medium" icon="message-circle" />
                <lew-button size="large" icon="message-circle" />
            </lew-flex>
        </div>
        <div>
            <lew-title size="16">icon text</lew-title>
            <lew-flex y="end">
                <lew-button text="submit" size="small" icon="message-circle" />
                <lew-button text="submit" size="medium" icon="message-circle" />
                <lew-button text="submit" size="large" icon="message-circle" />
            </lew-flex>
        </div>
    </lew-flex>
</template>
