'use client'
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';

// Define the shape of the nested nodes
interface Node {
  label: string;
  checked: boolean;
  childrenNodes: Node[];
  parent: Node | null;
  isOpen: boolean;
}

// Transform the data into a nested structure of nodes
const transform = (data: Record<string, unknown>, parent: Node | null = null): Node[] => {
  return Object.keys(data).map((key) => {
    const value = data[key] as Record<string, unknown>;
    const node: Node = {
      label: key,
      checked: typeof value === 'boolean' ? value : false,
      childrenNodes: [],
      parent,
      isOpen: true,
    };

    if (typeof value !== 'boolean') {
      node.childrenNodes = transform(value, node);
      node.checked = node.childrenNodes.every(child => child.checked);
    }

    return node;
  });
};

// Update ancestor nodes when a child node is toggled
const updateAncestors = (node: Node): void => {
  if (!node.parent) return;

  node.parent.checked = node.parent.childrenNodes.every(child => child.checked);
  updateAncestors(node.parent);
};

// Toggle all descendant nodes when a parent node is toggled
const toggleDescendants = (node: Node, checked: boolean): void => {
  node.checked = checked;
  node.childrenNodes.forEach(child => toggleDescendants(child, checked));
};

// Find a node by label and its ancestors
const findNode = (nodes: Node[], label: string, ancestors: string[]): Node | undefined => {
  let currentNode: Node | undefined;

  if (ancestors.length === 0) {
    return nodes.find(node => node.label === label);
  }

  for (const ancestor of ancestors) {
    currentNode = (currentNode?.childrenNodes || nodes).find(n => n.label === ancestor);
  }

  return currentNode?.childrenNodes.find(n => n.label === label);
};

interface NestedCheckboxProps {
  data: Record<string, unknown>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const NestedCheckbox: React.FC<NestedCheckboxProps> = ({ data, searchQuery, setSearchQuery }) => {
  const initialNodes = transform(data);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const handleBoxChecked = (e: React.ChangeEvent<HTMLInputElement>, ancestors: string[]) => {
    const checked = e.currentTarget.checked;
    const node = findNode(nodes, e.currentTarget.value, ancestors);

    if (node) {
      node.checked = checked;
      toggleDescendants(node, checked);
      updateAncestors(node);
      setNodes(cloneDeep(nodes));
    }
  };

  const toggleCategory = (node: Node): void => {
    node.isOpen = !node.isOpen;
    setNodes(cloneDeep(nodes));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search subjects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        className="mb-4 p-2 border rounded w-full"
      />
      <NestedCheckboxHelper
        nodes={nodes}
        ancestors={[]}
        onBoxChecked={handleBoxChecked}
        onToggleCategory={toggleCategory}
        searchQuery={searchQuery}
      />
    </>
  );
};

interface NestedCheckboxHelperProps {
  nodes: Node[];
  ancestors: string[];
  onBoxChecked: (e: React.ChangeEvent<HTMLInputElement>, ancestors: string[]) => void;
  onToggleCategory: (node: Node) => void;
  searchQuery: string;
}

const NestedCheckboxHelper: React.FC<NestedCheckboxHelperProps> = ({
  nodes,
  ancestors,
  onBoxChecked,
  onToggleCategory,
  searchQuery,
}) => {
  const prefix = ancestors.join('.');
  return (
    <ul className="list-disc pl-5">
      {nodes
        .filter(({ label }) => label.toLowerCase().includes(searchQuery))
        .map(({ label, checked, childrenNodes, isOpen }) => {
          const id = `${prefix}.${label}`;
          return (
            <li key={id} className="mb-2">
              <div className="flex items-center">
                {childrenNodes.length > 0 && (
                  <button
                    onClick={() => onToggleCategory({ label, childrenNodes, checked, parent: null, isOpen })}
                    className="mr-2 bg-transparent border-0 cursor-pointer text-xl"
                  >
                    {isOpen ? '-' : '+'}
                  </button>
                )}
                <input
                  type="checkbox"
                  name={id}
                  value={label}
                  checked={checked}
                  onChange={(e) => onBoxChecked(e, ancestors)}
                />
                <label htmlFor={id} className="ml-2">{label}</label>
              </div>
              {isOpen && childrenNodes.length > 0 && (
                <NestedCheckboxHelper
                  nodes={childrenNodes}
                  ancestors={[...ancestors, label]}
                  onBoxChecked={onBoxChecked}
                  onToggleCategory={onToggleCategory}
                  searchQuery={searchQuery}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default NestedCheckbox;
