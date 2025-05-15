import React from 'react';

interface AllFieldsTabProps {
  globalGood: Record<string, any>;
}

const MAX_DEPTH = 5;

function renderValue(value: any, depth: number, visited: Set<any>): React.ReactNode {
  if (value === null || value === undefined || value === '') {
    return <span className="text-muted-foreground">&lt;&lt;empty&gt;&gt;</span>;
  }
  if (typeof value === 'object') {
    if (visited.has(value)) {
      return <span className="text-muted-foreground">&lt;&lt;circular reference&gt;&gt;</span>;
    }
    if (depth > MAX_DEPTH) {
      return <span className="text-muted-foreground">&lt;&lt;max depth reached&gt;&gt;</span>;
    }
    visited.add(value);
    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-muted-foreground">&lt;&lt;empty&gt;&gt;</span>;
      return (
        <ul className="ml-4 list-disc">
          {value.map((item, idx) => (
            <li key={idx}>{renderValue(item, depth + 1, visited)}</li>
          ))}
        </ul>
      );
    }
    // Nested object
    return <AllFieldsTable data={value} depth={depth + 1} visited={visited} />;
  }
  return String(value);
}

function AllFieldsTable({ data, depth, visited }: { data: Record<string, any>; depth: number; visited: Set<any> }) {
  return (
    <table className="w-full border text-sm mb-4">
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key} className="align-top border-b">
            <td className="font-mono font-semibold pr-2 py-1 align-top text-muted-foreground whitespace-nowrap">{key}</td>
            <td className="py-1 align-top">{renderValue(value, depth, visited)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const AllFieldsTab: React.FC<AllFieldsTabProps> = ({ globalGood }) => {
  return (
    <div className="overflow-x-auto">
      <AllFieldsTable data={globalGood} depth={0} visited={new Set()} />
    </div>
  );
}; 