import { cloneDeep } from "lodash";
import { useState } from "react";
import { Input } from "../ui/input";

interface Node {
  label: string;
  checked: boolean;
  childrenNodes: Node[];
  parent: Node | null;
  isOpen: boolean;
}
const transform = (
  data: Record<string, unknown>,
  parent: Node | null = null
): Node[] => {
  return Object.keys(data).map((key) => {
    const value = data[key] as Record<string, unknown>;
    const node: Node = {
      label: key,
      checked: typeof value === "boolean" ? value : false,
      childrenNodes: [],
      parent,
      isOpen: true,
    };

    if (typeof value !== "boolean") {
      node.childrenNodes = transform(value, node);
      node.checked = node.childrenNodes.every((child) => child.checked);
    }

    return node;
  });
};

const updateAncestors = (node: Node): void => {
  if (!node.parent) return;

  node.parent.checked = node.parent.childrenNodes.every(
    (child) => child.checked
  );
  updateAncestors(node.parent);
};

const toggleDescendants = (node: Node, checked: boolean): void => {
  node.checked = checked;
  node.childrenNodes.forEach((child) => toggleDescendants(child, checked));
};

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
  setSelectedNode: (value: Node[]) => void;
}

export const NestedCheckbox: React.FC<NestedCheckboxProps> = ({
  data,
  setSelectedNode,
}) => {
  const initialNodes = transform(data);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      setSelectedNode(nodes);
    }
  };

  const toggleCategory = (node: Node): void => {
    node.isOpen = !node.isOpen;
    setNodes(cloneDeep(nodes));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
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
          isOpen: true,
        });
      }
      return acc;
    }, []);
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Busque as categorias..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-5 p-3 rounded-md w-full"
      />
      <NestedCheckboxHelper
        nodes={filteredNodes(nodes, searchQuery)}
        ancestors={[]}
        onBoxChecked={handleBoxChecked}
        onToggleCategory={toggleCategory}
      />
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
  const prefix = ancestors.join(".");
  return (
    <ul className="list-none pl-5">
      {nodes.map(({ label, checked, childrenNodes, isOpen }) => {
        const id = `${prefix}.${label}`;
        return (
          <li key={id} className="mb-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                name={id}
                value={label}
                checked={checked}
                onChange={(e) => onBoxChecked(e, ancestors)}
                className="form-checkbox"
              />
              <label htmlFor={id} className="ml-1">
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
