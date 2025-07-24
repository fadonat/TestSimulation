import { useId } from "react";

export function RadioGroup({ value, onValueChange, children }) {
  return <div onChange={(e) => onValueChange(e.target.value)}>{children}</div>;
}

export function RadioGroupItem({ value, disabled }) {
  const id = useId();
  return (
    <>
      <input
        type="radio"
        id={id}
        value={value}
        name="option"
        disabled={disabled}
        className="mr-2"
      />
    </>
  );
}
