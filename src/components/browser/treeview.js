'use client';
import React, { useState } from 'react';
import { TreeView, TreeNode } from '@carbon/react';

function Treeview({ nodes, handleNodeSelect }) {
  const [selectedNode, setSelectedNode] = useState('');
  const [expandedNodes, setExpandedNodes] = useState({});

  console.log('selectedNode', selectedNode);

  function handleToggle(nodeId) {
    setExpandedNodes((prevExpandedNodes) => ({
      ...prevExpandedNodes,
      [nodeId]: !prevExpandedNodes[nodeId],
    }));
  }

  function renderTree({ nodes, withIcons = false }) {
    if (!nodes) {
      return null;
    }
    return nodes.map(({ children, renderIcon, id, ...nodeProps }) => (
      <TreeNode
        key={id}
        renderIcon={withIcons ? renderIcon : null}
        isExpanded={expandedNodes[id] || false}
        {...nodeProps}
        onSelect={() => handleNodeSelect(nodeProps.value)}
        onToggle={() => handleToggle(id)}
      >
        {renderTree({
          nodes: children,
          withIcons,
        })}
      </TreeNode>
    ));
  }

  return <TreeView>{renderTree({ nodes })}</TreeView>;
}

export default Treeview;
