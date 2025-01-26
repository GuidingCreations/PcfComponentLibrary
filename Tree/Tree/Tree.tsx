import React, {  useRef, useEffect, useState} from "react";
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

export interface TreeComponentProps {
  showLine: boolean;
  isCheckable: boolean;
  useTestData: boolean;
  treeData: TreeDataNode[];
  fieldName: string;
  keyColumn: string;
  setSelectedRecords: (selectedIDs : any[]) => void
}

const TreeComponent = (props: TreeComponentProps) => {

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
  const checkedKeys = useRef<any[]>([]);
  const selectedKeys = useRef<any[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const data = useRef<TreeDataNode[]>(treeData)
  
  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };




  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    checkedKeys.current = checkedKeysValue as React.Key[];
    props.setSelectedRecords(checkedKeys.current)
    
  };


  if (!props.useTestData && data.current != props.treeData) {
    data.current = props.treeData
    console.log("CURRENT TREE DATA", data.current)
  }

  console.log("PROPS TREE DATA", props.treeData)

  return (

    <div>

    
      
      <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      treeData={data.current}
      checkable = {props.isCheckable}
      onCheck={onCheck}
      onExpand={onExpand}
      fieldNames={{
        key: props.keyColumn,
        title: props.fieldName
      }}
      />
     



    
    
    </div>
  );
}


export default TreeComponent