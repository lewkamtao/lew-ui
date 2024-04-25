import type { TreeDataSource } from './props';
import { has, flatMap, cloneDeep, some, isArray } from 'lodash-es';
// 递归将树形结构数组转换成展开列表，按照树结构的顺序存储，同时保存父节点
export const flattenTree = (tree: TreeDataSource[]): TreeDataSource[] => {
    return flatMap(cloneDeep(tree), (node: TreeDataSource) => {
        const { children }: any = node;
        delete node.children;
        return [node, ...flattenTree(children)];
    });
};

export const findAllNodes = (tree: TreeDataSource[] = [], keyField: string = 'key') => {
    let nodes = new Set();
    function traverse(node: any) {
        nodes.add(node[keyField]);
        (node.children || []).forEach((child: TreeDataSource) => {
            traverse(child);
        });
    }

    tree.forEach((node) => {
        traverse(node);
    });

    return Array.from(nodes) || [];
};

export const findLeafNodes = (tree: TreeDataSource[] = [], keyField: string = 'key') => {
    let leafNodes = new Set();
    function traverse(node: any) {
        if (!node.children || node.children.length === 0) {
            leafNodes.add(node[keyField]);
        }
        (node.children || []).forEach((child: TreeDataSource) => {
            traverse(child);
        });
    }
    tree.forEach((node) => {
        traverse(node);
    });
    return Array.from(leafNodes) || [];
};

// 格式化路径逻辑
export const formatTree = ({
    dataSource,
    parent = null,
    parentKeyPaths = [],
    parentLabelPaths = [],
    keyField = 'key',
    labelField = 'label',
    free = false
}: {
    dataSource: TreeDataSource[];
    parent?: any;
    parentKeyPaths?: String[];
    parentLabelPaths?: String[];
    keyField?: string;
    labelField?: string;
    free?: boolean;
}): TreeDataSource[] => {
    return dataSource.map((node: TreeDataSource, index: number) => {
        const { children, ...rest }: any = node;
        const currentNode = {
            ...rest,
            key: rest[keyField],
            label: rest[labelField],
            keyPaths: [...parentKeyPaths, rest[keyField]],
            labelPaths: [...parentLabelPaths, rest[labelField]],
            isLeaf: has(rest, 'isLeaf') ? rest.isLeaf : (children || []).length === 0,
            parentKey: parent ? parent[keyField] : null,
            level: parentKeyPaths.length,
            parentKeyPaths,
            parentLabelPaths,
            treeIndex: index
        };
        // 新增字段，用于判断是否是叶子节点
        if (!free) {
            currentNode['leafNodeValues'] = findLeafNodes(children);
            currentNode['allNodeValues'] = findAllNodes(children);
        }

        const formattedNode = {
            ...currentNode,
            children: children
                ? formatTree({
                      dataSource: children,
                      parent: currentNode,
                      parentKeyPaths: currentNode.keyPaths,
                      parentLabelPaths: currentNode.labelPaths,
                      keyField,
                      labelField,
                      free
                  })
                : []
        };

        return formattedNode;
    });
};

// 初始化
export const tree2List = async ({
    initTree = null,
    dataSource = [],
    keyField = 'key',
    labelField = 'label',
    free = false,
    keyword = ''
}: {
    initTree?: any;

    dataSource?: TreeDataSource[];
    keyField?: string;
    labelField?: string;
    free?: boolean;
    keyword?: string;
}) => {
    let tree: TreeDataSource[] = [];
    if (initTree) {
        const _tree: TreeDataSource[] = await initTree();
        if (isArray(_tree)) {
            tree = formatTree({ dataSource: _tree, keyField, labelField, free });
        } else {
            return new Error(
                'The initTree function should return a Promise that resolves to an array'
            );
        }
    } else if (dataSource && dataSource.length > 0) {
        tree = formatTree({ dataSource, keyField, labelField, free });
        if (keyword) {
            const _tree: TreeDataSource[] = [];
            const filterTree = (node: TreeDataSource[]) => {
                for (let i = 0; i < node.length; i++) {
                    const { labelPaths, children } = node[i];
                    if (some(labelPaths, (label: string) => label.includes(keyword))) {
                        _tree.push(node[i]);
                    } else {
                        if (children) {
                            filterTree(children || []);
                        }
                    }
                }
            };
            filterTree(tree);
            tree = formatTree({ dataSource: _tree, keyField, labelField, free });
        }
    }
    return {
        newTree: tree,
        newTreeList: flattenTree(tree)
    };
};
