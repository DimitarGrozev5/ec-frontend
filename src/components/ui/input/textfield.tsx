import { ClassValue } from "clsx";
import InputBase from "./input-base";

type Props = {
  label: string;
  rows?: number;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
  className?: ClassValue;
};


/**
 * Textarea Component with label and optional error text
 */
const TextArea: React.FC<Props> = ({
  label,
  rows = 3,
  value,
  onChange,
  onBlur,
  error,
  className,
}) => {
  return (
    <InputBase
      label={label}
      value={value}
      onChange={onChange}
      type="text"
      onBlur={onBlur}
      error={error}
      rows={rows}
      className={className}
    />
  );
};

export default TextArea;
