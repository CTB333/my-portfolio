import React from "react";

type CheckboxInputProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  name?: string;
  required?: boolean;
};

export const CheckboxInput = ({
  checked,
  onChange,
  label,
  name,
  required,
}: CheckboxInputProps) => {
  return (
    <label
      className="flex ai-center cursor-pointer"
      style={{
        border: '1px solid #ddd',
        padding: '8px 12px',
        borderRadius: '4px',
        backgroundColor: checked ? 'rgba(148, 75, 187, 0.1)' : 'transparent',
        boxShadow: checked ? '0 0 8px rgba(148, 75, 187, 0.3)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        name={name}
        required={required}
        className="mr-10"
        style={{
          accentColor: checked ? "#944bbb" : undefined,
          transform: "scale(1.5)",
        }}
      />
      <span className="fs-4 color-secondary">{label}</span>
    </label>
  );
};
