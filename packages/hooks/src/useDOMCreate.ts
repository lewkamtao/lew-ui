export function useDOMCreate(nodeId: string): void {
  const node = document.getElementById(nodeId)
  if (node) {

  }
  else {
    const newNode = document.createElement('div')
    newNode.id = nodeId
    document.body.appendChild(newNode)
  }
}
