import React from 'react';

interface AllFieldsTabProps {
  globalGood: Record<string, any>;
}

function renderValue(value: any): React.ReactNode {
  if (value === null || value === undefined || value === '') {
    return <span className="text-muted-foreground">&lt;&lt;empty&gt;&gt;</span>;
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-muted-foreground">&lt;&lt;empty&gt;&gt;</span>;
      return (
        <ul className="ml-4 list-disc">
          {value.map((item, idx) => (
            <li key={idx}>{renderValue(item)}</li>
          ))}
        </ul>
      );
    }
    // Nested object
    return <AllFieldsTable data={value} />;
  }
  return String(value);
}

function AllFieldsTable({ data }: { data: Record<string, any> }) {
  return (
    <table className="w-full border text-sm mb-4">
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key} className="align-top border-b">
            <td className="font-mono font-semibold pr-2 py-1 align-top text-muted-foreground whitespace-nowrap">{key}</td>
            <td className="py-1 align-top">{renderValue(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const AllFieldsTab: React.FC<AllFieldsTabProps> = ({ globalGood }) => {
  return (
    <div className="overflow-x-auto">
      <AllFieldsTable data={globalGood} />
    </div>
  );
}; 