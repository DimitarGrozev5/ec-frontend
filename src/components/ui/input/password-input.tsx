import { useCallback, useMemo, useState } from "react";
import InputBase from "./input-base";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
};

/**
 * Password Input Component with label, toggle visibility button and optional error text
 */
const PasswordInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    []
  );

  const adornment = useMemo(
    () =>
      showPassword ? (
        <EyeSlashIcon
          onClick={toggleShowPassword}
          className="w-6 h-6 cursor-pointer"
        />
      ) : (
        <EyeIcon
          onClick={toggleShowPassword}
          className="w-6 h-6 cursor-pointer"
        />
      ),
    [showPassword, toggleShowPassword]
  );

  return (
    <InputBase
      label={label}
      value={value}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      endAdornment={adornment}
      onBlur={onBlur}
      error={error}
    />
  );
};

export default PasswordInput;
