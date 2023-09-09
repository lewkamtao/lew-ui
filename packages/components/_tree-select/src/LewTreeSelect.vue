<script setup lang="ts"></script>

<template>
    <div></div>
</template>

<style lang="scss" scoped>
.lew-select-view {
    width: 100%;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-form-bgcolor);
    transition: all 0.15s ease;
    box-sizing: border-box;
    outline: 0px var(--lew-color-primary-light) solid;
    border: var(--lew-form-border-width) transparent solid;
    box-shadow: var(--lew-form-box-shadow);

    > div {
        width: 100%;
    }

    .lew-select {
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;

        .icon-select {
            position: absolute;
            top: 50%;
            right: 7px;
            transform: translateY(-50%) rotate(0deg);
            transition: var(--lew-form-transition);
        }
        .icon-select {
            opacity: var(--lew-form-icon-opacity);
        }

        .icon-select-hide {
            opacity: 0;
            transform: translate(100%, -50%);
        }

        .placeholder {
            color: rgb(165, 165, 165);
        }

        .placeholder,
        .value {
            display: inline-flex;
            align-items: center;
            width: calc(100% - 24px);
            box-sizing: border-box;
            transition: all 0.2s;
        }
    }

    .lew-select-align-left {
        text-align: left;
    }
    .lew-select-align-center {
        text-align: center;
    }
    .lew-select-align-right {
        text-align: right;
    }

    .lew-select-placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-select-size-small {
        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-small);
            height: var(--lew-form-item-height-small);
            line-height: var(--lew-form-input-line-height-small);
            font-size: var(--lew-form-font-size-small);
        }
    }

    .lew-select-size-medium {
        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-medium);
            line-height: var(--lew-form-input-line-height-medium);
            height: var(--lew-form-item-height-medium);
            font-size: var(--lew-form-font-size-medium);
        }
    }

    .lew-select-size-large {
        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-large);
            height: var(--lew-form-item-height-large);
            line-height: var(--lew-form-input-line-height-large);
            font-size: var(--lew-form-font-size-large);
        }
    }
}

.lew-select-view:hover {
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-select-view:active {
    background-color: var(--lew-form-bgcolor-active);
}

.lew-select-view.lew-select-view-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
    outline: var(--lew-form-ouline);

    .icon-select {
        transform: translateY(-50%) rotate(180deg);
        color: var(--lew-text-color-2);
    }
    .icon-select-hide {
        opacity: 0;
        transform: translate(100%, -50%) rotate(180deg);
    }
}

.lew-select-view-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
}
.lew-select-view-readonly {
    pointer-events: none; //鼠标点击不可修改
    .lew-select {
        user-select: text;
    }
}
.lew-select-view-disabled:hover {
    background-color: var(--lew-form-bgcolor);
    outline: 0px var(--lew-color-primary-light) solid;
    border: var(--lew-form-border-width) transparent solid;
}
</style>
<style lang="scss">
.lew-select-body {
    width: 100%;
    box-sizing: border-box;
    .search-input {
        margin-bottom: 5px;
        input {
            outline: none;
            border: none;
            background-color: var(--lew-bgcolor-1);
            width: 100%;
            height: 30px;
            border-radius: var(--lew-border-radius);
            padding: 0px 10px;
            box-sizing: border-box;
            color: var(--lew-form-color);
            transition: var(--lew-form-transition);
        }
        input:focus {
            background-color: var(--lew-form-bgcolor);
        }
    }
    .not-found {
        padding: 50px 0px;
        opacity: 0.4;
    }
    .reslut-count {
        padding-left: 8px;
        margin: 5px 0px;
        opacity: 0.4;
        font-size: 13px;
    }
    .lew-select-options-box {
        overflow-y: auto;
        overflow-x: hidden;
        height: auto;
        box-sizing: border-box;
        transition: all 0.25s ease;

        .lew-select-item {
            position: relative;
            display: inline-flex;
            align-items: center;
            width: 100%;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            color: var(--lew-text-color-2);
            box-sizing: border-box;
            border-radius: 6px;
        }

        .lew-select-item-disabled {
            opacity: 0.3;
            cursor: no-drop;
        }
        .lew-select-item-align-left {
            text-align: left;
        }
        .lew-select-item-align-center {
            text-align: center;
        }
        .lew-select-item-align-right {
            text-align: right;
        }

        .lew-select-label {
            width: 100%;
            user-select: none;
            font-size: 14px;
            padding: 0px 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            box-sizing: border-box;
        }

        .lew-select-item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-bgcolor);
        }

        .lew-select-slot-item {
            border-radius: 6px;
        }

        .lew-select-slot-item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-bgcolor);
        }

        .lew-select-item-active {
            color: var(--lew-color-primary-dark);
            font-weight: bold;
            background-color: var(--lew-form-bgcolor);
            .icon-check {
                margin-right: 10px;
            }
        }

        .lew-select-item-active:hover {
            color: var(--lew-color-primary-dark);
            font-weight: bold;
            background-color: var(--lew-form-bgcolor);
        }
    }
}
</style>
