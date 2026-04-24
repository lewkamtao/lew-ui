import type { LewModalFooterButtonItem } from 'lew-ui/types'

/**
 * 底部操作栏关闭前是否应触发 `ok`：
 * - `emitOk: true` 为确认并触发
 * - `emitOk: false` 不触发
 * - 未设置：仅 1 个按钮视为确认，或「多项」时仅最后一项（通常为右侧主操作）
 */
export function shouldFooterEmitOk(
  item: LewModalFooterButtonItem,
  index: number,
  total: number,
): boolean {
  if (item.emitOk === true)
    return true
  if (item.emitOk === false)
    return false
  return total === 1 || index === total - 1
}
