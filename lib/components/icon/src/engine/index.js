const fs = require('fs')
const path = require('path')
const { parse } = require('svgson')

const iconsDir = path.join(__dirname, 'svg')
const output = path.join(__dirname, 'icons')
const svgFiles = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'))
function extractSVGContent(svgString) {
  const regex = /<svg[^>]*>([\s\S]*?)<\/svg>/
  const match = svgString.match(regex)

  if (match) {
    return match[1]
  } else {
    return '无法找到SVG标签'
  }
}

svgFiles.forEach(async (file) => {
  const svgString = fs.readFileSync(path.join(iconsDir, file), 'utf8')
  const svgJson = await parse(svgString)
  delete svgJson.children
  svgJson.content = extractSVGContent(svgString)

  const tsContent = `export default ${JSON.stringify(svgJson)}`
  fs.writeFileSync(path.join(output, `${file.replace('.svg', '.ts')}`), tsContent)
})
