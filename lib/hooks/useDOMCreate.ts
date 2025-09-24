export function useDOMCreate(nodeId: string): void {
  const node = document.getElementById(nodeId)
  if (node) {
    // Node already exists, do nothing
  }
  else {
    const newNode = document.createElement('div')
    newNode.id = nodeId
    document.body.appendChild(newNode)
  }
}
