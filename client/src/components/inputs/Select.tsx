import React, { useRef, useMemo } from "react";

type SelectProps = {
  value: string;
  onValueChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeHolder: string;
  name?: string;
  required?: boolean;
  dark?: boolean;
};

export const Select = ({
  value,
  onValueChange,
  options,
  placeHolder,
  name,
  required,
  dark,
}: SelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const selectedOptionLabel = useMemo(() => {
    if (!value) return "";
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  }, [value, options]);

  const handleInputFocus = () => {
    // Transfer focus to the hidden select element
    selectRef.current?.focus();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
      className="flex column"
    >
      <p className={"color-secondary"}>{placeHolder}</p>
      <input
        ref={inputRef}
        className="text-input p-10 rad-15"
        type="text"
        name={name ?? placeHolder}
        required={required}
        value={selectedOptionLabel}
        onFocus={handleInputFocus}
        readOnly
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--secondary)",
          cursor: "pointer",
        }}
      />
      <select
        ref={selectRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer",
          border: "none",
          background: "transparent",
        }}
        name={name ?? placeHolder}
        required={required}
        value={value}
        onChange={handleSelectChange}
      >
        <option value="">All Family Sides</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
