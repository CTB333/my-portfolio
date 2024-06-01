import React, { useRef } from "react";

type InputProps = {
  value: string;
  onValueChange: (v: string) => void;

  placeHolder: string;
  name?: string;
  type?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >["type"];
  longText?: boolean;
  required?: boolean;
};

export const Input = ({
  value,
  onValueChange,

  placeHolder,
  name,
  type = "text",
  longText,
  required,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div
      style={{
        width: "100%",
      }}
      className="flex column"
    >
      <p>{placeHolder}</p>
      {longText ? (
        <textarea
          style={{ resize: "none" }}
          ref={textAreaRef}
          name={name ?? placeHolder}
          className="text-input p-10 rad-15"
          rows={7}
          required={required}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      ) : (
        <input
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            inputRef.current?.blur();
          }}
          className="text-input p-10 rad-15"
          type={type}
          name={name ?? placeHolder}
          required={required}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      )}
    </div>
  );
};
