import type { SelectOptions, SelectOptionsGroup } from './props'
import type {
    SelectMultipleOptions,
    SelectMultipleOptionsGroup,
} from 'lew-ui/components/select-multiple/src/props'

type Options = SelectOptions | SelectMultipleOptions
type OptionsGroup = SelectOptionsGroup | SelectMultipleOptionsGroup

export const flattenOptions = (options: (Options | OptionsGroup)[]) => {
    const result: Options[] = []
    options.forEach((option: any) => {
        if (option.children && option.children.length > 0) {
            // 这是一个分组
            const group = {
                label: option.label,
                value: `group-${option.value || option.label}`,
                isGroup: true,
                total: (option.children || []).length,
            }
            result.push(group)
            // 将子选项添加到结果中
            option.children.forEach((child: Options) => {
                result.push({
                    ...child,
                    groupValue: group.value,
                    groupLabel: group.label,
                    isGroup: false,
                })
            })
        } else {
            result.push(option)
        }
    })
    return result
}

export const defaultSearchMethod = (params: any) => {
    const { options, keyword } = params
    if (!keyword) {
        return options
    }
    const result: any = options.filter((e: any) => {
        return (
            e.label.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 &&
            !e.isGroup
        )
    })
    const group: any = []
    result.forEach((e: any) => {
        const index = group.findIndex(
            (item: any) => item.value === e.groupValue,
        )
        if (!e.isGroup && e.groupValue && index === -1) {
            const groupItem = {
                label: e.groupLabel,
                value: e.groupValue,
                isGroup: true,
                children: [e],
            }
            group.push(groupItem)
        } else if (index >= 0) {
            group[index]?.children.push(e)
        } else {
            group.push(e)
        }
    })
    return flattenOptions(group)
}
