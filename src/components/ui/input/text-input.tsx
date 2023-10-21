import InputBase from "./input-base";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
};

/**
 * Text Input Component with label and optional error text
 */
const TextInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <InputBase
      label={label}
      value={value}
      onChange={onChange}
      type="text"
      onBlur={onBlur}
      error={error}
    />
  );
};

export default TextInput;
