import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LewAlert from '../src/LewAlert.vue';

describe('LewAlert', () => {
    it('props', () => {
        const wrapper = shallowMount(LewAlert, {
            props: {
                list: [
                    {
                        type: 'info',
                        title: '成功发送一条消息',
                        content: ''
                    }
                ]
            }
        });
        const groupWrapper = wrapper.find<HTMLDivElement>('.lew-alert-group');
        expect(groupWrapper.find('.lew-alert.lew-alert-info')).toBeTruthy();
        expect(groupWrapper.html()).toContain('成功发送一条消息');
    });

    it('click-close', async () => {
        // 注意: 这里需要用reactive包裹，否则对数组的操作，组件无法监听到变化
        const list = reactive([
            {
                type: 'success',
                title: 'hi success title',
                content: 'hi success content'
            },
            {
                type: 'error',
                title: 'oh error title',
                content: 'hoh error content'
            }
        ]);
        const wrapper = shallowMount(LewAlert, {
            props: {
                list
            }
        });
        const groupWrapper = wrapper.find<HTMLDivElement>('.lew-alert-group');
        // 获取到 alert item
        const alertsWrapper = groupWrapper.findAll('.lew-alert');
        // 断言获取到元素的个数是传入的list的长度
        expect(alertsWrapper.length).toBe(list.length);
        // 并且第一个是success类型的
        expect(alertsWrapper[0].classes()).toContain('lew-alert-success');
        // 点击关闭按钮
        alertsWrapper[0].find('.btn-close').trigger('click');
        // 触发了close事件
        expect(wrapper.emitted('close')).toBeTruthy();
        // 断言点击的是第一个元素的close按钮
        expect(wrapper.emitted('close')?.[0]).toEqual([0]);
        // list 必须是一个响应式的数据，所以上面需要用reactive包裹
        // list.push({
        //     type: 'info',
        //     title: 'info title',
        //     content: 'info content',
        // });
        list.splice(0, 1);
        // 同时也需要重新渲染
        await wrapper.setProps({ list });
        // 显示的alert item数量减少了一个
        expect(groupWrapper.findAll('.lew-alert').length).toBe(list.length);
        expect(alertsWrapper[0].classes()).toContain('lew-alert-error');
    });
});
