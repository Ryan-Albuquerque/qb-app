'use client';
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

// Initial data structure for subjects
const subjectData: Record<string, unknown> = {
  Science: {
    Physics: {
      'Quantum Mechanics': {
        'Quantum Field Theory': false,
        'String Theory': false,
      },
      'Classical Mechanics': false,
    },
    Chemistry: {
      'Organic Chemistry': false,
      'Inorganic Chemistry': false,
    },
    Biology: false,
  },
  Math: {
    Algebra: false,
    Geometry: false,
    Calculus: false,
  },
  Humanities: {
    History: {
      'World History': false,
      'American History': false,
    },
    Literature: false,
    Philosophy: false,
  },
};

// Transform the data into a nested structure of nodes
const transform = (
  data: Record<string, unknown>,
  parent: Node | null = null
): Node[] => {
  return Object.keys(data).map((key) => {
    const value = data[key] as Record<string, unknown>;
    const node: Node = {
      label: key,
      checked: typeof value === 'boolean' ? value : false,
      childrenNodes: [],
      parent,
      isOpen: true, // For expand/collapse behavior
    };

    if (typeof value !== 'boolean') {
      node.childrenNodes = transform(value, node);
      node.checked = node.childrenNodes.every((child) => child.checked);
    }

    return node;
  });
};

// Update ancestor nodes when a child node is toggled
const updateAncestors = (node: Node): void => {
  if (!node.parent) return;

  node.parent.checked = node.parent.childrenNodes.every(
    (child) => child.checked
  );
  updateAncestors(node.parent);
};

// Toggle all descendant nodes when a parent node is toggled
const toggleDescendants = (node: Node, checked: boolean): void => {
  node.checked = checked;
  node.childrenNodes.forEach((child) => toggleDescendants(child, checked));
};

// Find a node by label and its ancestors
const findNode = (
  nodes: Node[],
  label: string,
  ancestors: string[]
): Node | undefined => {
  let currentNode: Node | undefined;

  if (ancestors.length === 0) {
    return nodes.find((node) => node.label === label);
  }

  for (const ancestor of ancestors) {
    currentNode = (currentNode?.childrenNodes || nodes).find(
      (n) => n.label === ancestor
    );
  }

  return currentNode?.childrenNodes.find((n) => n.label === label);
};

interface NestedCheckboxProps {
  data: Record<string, unknown>;
}

const NestedCheckbox: React.FC<NestedCheckboxProps> = ({ data }) => {
  const initialNodes = transform(data);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleBoxChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    ancestors: string[]
  ) => {
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const collectHighestLevelSelections = () => {
    const highestLevels: string[] = [];

    const isNodeValidForSelection = (node: Node) => {
      let current: Node | null = node;
      while (current) {
        if (highestLevels.includes(current.label)) return false;
        current = current.parent;
      }
      return true;
    };

    const traverseNodes = (nodes: Node[]) => {
      nodes.forEach((node) => {
        if (node.checked) {
          const allChildrenChecked = node.childrenNodes.every(
            (child) => child.checked
          );

          if (isNodeValidForSelection(node)) {
            highestLevels.push(node.label);
          }

          if (!allChildrenChecked) {
            node.childrenNodes.forEach((child) => {
              if (child.checked && !highestLevels.includes(child.label)) {
                highestLevels.push(child.label);
              }
            });
          }
        }
        traverseNodes(node.childrenNodes);
      });
    };

    traverseNodes(nodes);
    return highestLevels;
  };

  const filteredNodes = (nodes: Node[], searchQuery: string): Node[] => {
    return nodes.reduce<Node[]>((acc, node) => {
      const isMatch = node.label.toLowerCase().includes(searchQuery);
      const childrenMatches = filteredNodes(node.childrenNodes, searchQuery);
      const hasMatches = isMatch || childrenMatches.length > 0;

      if (hasMatches) {
        acc.push({
          ...node,
          childrenNodes: childrenMatches,
          isOpen: true, // Keep the category open if it matches
        });
      }
      return acc;
    }, []);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search subjects..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <NestedCheckboxHelper
        nodes={filteredNodes(nodes, searchQuery)}
        ancestors={[]}
        onBoxChecked={handleBoxChecked}
        onToggleCategory={toggleCategory}
      />
      <button
        onClick={() => {
          const highestSelections = collectHighestLevelSelections();
          alert(`Selected Top-Level Nodes: ${highestSelections.join(', ')}`);
        }}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Show Top-Level Selections
      </button>
    </>
  );
};

interface NestedCheckboxHelperProps {
  nodes: Node[];
  ancestors: string[];
  onBoxChecked: (
    e: React.ChangeEvent<HTMLInputElement>,
    ancestors: string[]
  ) => void;
  onToggleCategory: (node: Node) => void;
}

const NestedCheckboxHelper: React.FC<NestedCheckboxHelperProps> = ({
  nodes,
  ancestors,
  onBoxChecked,
  onToggleCategory,
}) => {
  const prefix = ancestors.join('.');
  return (
    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
      {nodes.map(({ label, checked, childrenNodes, isOpen }) => {
        const id = `${prefix}.${label}`;
        return (
          <li key={id} style={{ marginBottom: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {childrenNodes.length > 0 && (
                <button
                  onClick={() =>
                    onToggleCategory({
                      label,
                      childrenNodes,
                      checked,
                      parent: null,
                      isOpen,
                    })
                  }
                  style={{
                    marginRight: '5px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
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
              <label htmlFor={id} style={{ marginLeft: '5px' }}>
                {label}
              </label>
            </div>
            {isOpen && childrenNodes.length > 0 && (
              <NestedCheckboxHelper
                nodes={childrenNodes}
                ancestors={[...ancestors, label]}
                onBoxChecked={onBoxChecked}
                onToggleCategory={onToggleCategory}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default function Categories() {
  return (
    <div className="categories-container">
      <h1 className="title">Subject Categories</h1>
      <p className="description">
        Please select the subjects you want to enroll in from the list below.
      </p>
      <NestedCheckbox data={subjectData} />
    </div>
  );
}
