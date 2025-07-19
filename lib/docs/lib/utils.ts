export function convertProps(json: any) {
  const props = []
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      let type = ''
      if (Array.isArray(json[key].type)) {
        type = json[key].type
          .map((item: any) =>
            item ? item.toString().match(/function\s+(\w+)/)[1] : '',
          )
          .filter((item: any) => item !== '')
          .join(' | ')
      }
      else {
        type
          = json[key].type !== null
            ? json[key].type.toString().match(/function\s+(\w+)/)[1]
            : ''
      }
      if (!json[key].hidden) {
        const prop = {
          ...json[key],
          name: key,
          description: json[key].description,
          type: json[key].typeGhost ? json[key].typeGhost : type,
          default: JSON.stringify(json[key].default),
        }
        props.push(prop)
      }
    }
  }
  return props
}

/**
 * 将对象转成文件并下载
 * @param {object} data - 要转成文件的对象数据
 * @param {string} filename - 下载的文件名
 */
export function downloadObjectAsFile(data: any, filename: string) {
  // 创建一个Blob对象，Blob表示一个不可变的原始数据的类文件对象，将对象转成JSON字符串
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })

  // 创建一个临时URL对象，用于生成下载链接
  const url = URL.createObjectURL(blob)

  // 创建一个<a>标签并设置下载链接和文件名，模拟点击实现文件下载
  const a = document.createElement('a')
  a.href = url
  a.download = filename

  // 将<a>标签添加到文档中并触发点击事件，开始下载文件
  document.body.appendChild(a)
  a.click()

  // 下载完成后移除临时URL和<a>标签
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

// 获取assets静态资源
export function getAssetsFile({
  name,
  type,
}: {
  name: string
  type: string
}) {
  return new URL(`../assets/images/${type}/${name}`, import.meta.url).href
}

export function getComponentIcon(name: string) {
  return getAssetsFile({ name: `${name}.svg`, type: 'icon' })
}

export function renderDescription(text: string) {
  return text.replace(/```(\w+)```/g, '<span class="lew-docs-tag">$1</span>')
}
