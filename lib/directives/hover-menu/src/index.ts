// 导入所需的依赖
import tippy from 'tippy.js';
import type { App, DirectiveBinding } from 'vue';
import { getUniqueId } from 'lew-ui/utils';
import _LewContextMenu from '../../context-menu/src/LewContextMenu.vue';

/**
 * 初始化悬浮菜单
 * 创建全局悬浮菜单实例和相关配置
 */
export const initLewHoverMenu = () => {
  window.LewHoverMenu = {
    menu: {}, // 存储菜单配置
    disabledIds: [], // 禁用悬浮菜单的元素ID
    hoverMenu: null, // 悬浮菜单事件处理函数
    prevId: '', // 上一个触发元素ID,用于防止重复触发
    // 创建tippy实例
    instance: tippy(document.body, {
      theme: 'light',
      animation: 'shift-away-subtle',
      trigger: 'manual', // 手动触发
      interactive: true, // 允许与菜单交互
      placement: 'right-start', // 菜单出现位置
      duration: [250, 250], // 动画持续时间
      delay: [250, 0], // 显示和隐藏的延迟
      arrow: false, // 不显示箭头
      appendTo: () => document.body, // 添加到body
      allowHTML: true, // 允许HTML内容
    }),
    menuInstance: {}, // 存储子菜单实例
  };

  // 为菜单添加自定义属性
  window.LewHoverMenu.instance.popper.children[0].setAttribute(
    'data-lew',
    'popover'
  );
};

/**
 * 递归查找元素的悬浮菜单ID
 * @param el - 目标HTML元素
 * @returns 元素的悬浮菜单ID
 */
const findHoverMenuId = (el: HTMLElement): string => {
  try {
    const id = el.getAttribute('lew-hover-menu-id');
    if (id) return id;
    return el.parentNode ? findHoverMenuId(el.parentNode as HTMLElement) : '';
  } catch {
    return '';
  }
};

/**
 * 悬浮菜单指令
 * 提供悬浮菜单功能的Vue指令
 */
export const LewVHoverMenu = {
  install(app: App) {
    app.directive('hover-menu', {
      // 指令挂载时的处理
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        // 确保全局悬浮菜单对象存在
        if (!window.LewHoverMenu) {
          initLewHoverMenu();
        }

        let elId = el.id;
        // 为元素设置唯一ID并保存菜单配置
        if (!elId) {
          elId = getUniqueId();
          el.setAttribute('lew-hover-menu-id', elId);
          const { options } = binding.value;
          window.LewHoverMenu.menu[elId] = options || [];
        }

        const { disabled } = binding.value;
        if (disabled) {
          window.LewHoverMenu.disabledIds.push(elId);
        }

        // 注册全局悬浮菜单事件处理
        if (!window.LewHoverMenu.hoverMenu) {
          // 处理禁用状态

          // 悬浮菜单事件处理函数
          window.LewHoverMenu.hoverMenu = (e: MouseEvent) => {
            const id = findHoverMenuId(e.target as HTMLElement);
            // 处理禁用和重复触发
            if (window.LewHoverMenu.disabledIds.includes(id)) return;
            if (window.LewHoverMenu.prevId === id) return;

            window.LewHoverMenu.prevId = id;
            if (!id) return;

            const options = window.LewHoverMenu.menu[id];
            const { instance } = window.LewHoverMenu;
            instance.hide(); // 隐藏已存在的菜单

            // 创建菜单容器
            const menuDom = document.createElement('div');

            // 创建悬浮菜单组件实例
            createApp({
              render() {
                return h(_LewContextMenu, {
                  options,
                });
              },
            }).mount(menuDom);

            // 显示菜单
            setTimeout(() => {
              const target = e.target as HTMLElement;
              const rect = target.getBoundingClientRect();
              const props = {
                content: menuDom,
                getReferenceClientRect: () => ({
                  width: 0,
                  height: 0,
                  top: rect.top,
                  bottom: rect.top,
                  left: rect.right,
                  right: rect.right,
                }),
              };
              instance.setProps(props);
              instance.show();
            }, 120);
          };

          // 绑定全局悬浮事件
          window.addEventListener('mouseover', window.LewHoverMenu.hoverMenu);
        }
      },

      // 指令更新时的处理
      updated(el: HTMLElement, binding: DirectiveBinding) {
        const id = findHoverMenuId(el);
        if (id) {
          // 更新菜单配置
          const { options, disabled } = binding.value;
          window.LewHoverMenu.menu[id] = options || [];

          // 更新禁用状态
          if (disabled) {
            window.LewHoverMenu.disabledIds.push(id);
          } else {
            window.LewHoverMenu.disabledIds =
              window.LewHoverMenu.disabledIds.filter(
                (item: string) => item !== id
              );
          }
        } else {
          console.error('发生未知错误！找不到 lew-hover-menu-id。');
        }
      },
    });
  },
};

/**
 * 悬浮菜单项目接口定义
 */
export interface HoverMenus {
  label?: string; // 显示文本
  value?: string; // 值
  type?: string; // 类型
  icon?: string; // 图标
  children?: HoverMenus[]; // 子菜单
  disabled?: boolean; // 是否禁用
  level?: number; // 层级
  isDividerLine?: false; // 是否为分割线
  [key: string]: any; // 其他属性
}

/**
 * 悬浮菜单组件属性定义
 */
export const hoverMenuProps = {
  options: {
    type: Array as PropType<HoverMenus[]>,
    default: () => [],
    description: '悬浮菜单配置',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用悬浮菜单',
  },
};
