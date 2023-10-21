import { useCallback, useId, useState } from "react";
import { tw } from "../../../util/tw";
import { ClassValue } from "clsx";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  type: "text" | "password";
  endAdornment?: React.ReactNode;
  error?: string;
  rows?: number;
  className?: ClassValue;
};

const InputBase: React.FC<Props> = ({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  endAdornment,
  error,
  rows = 1,
  className,
}) => {
  const id = useId();

  const [focused, setFocused] = useState(false);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const blurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e.target.value);
    },
    [onBlur]
  );

  const inputType = type === "password" ? "password" : "text";

  return (
    <div className={tw("relative", className)}>
      <label
        className={tw(
          "absolute translate-x-2 -translate-y-1/2",
          "px-1",
          "text-zinc-100 text-xs",
          "bg-zinc-800",
          "rounded-md",
          "transition-all duration-500",
          !focused && value === "" && "translate-y-2 text-zinc-500 text-base"
        )}
        htmlFor={`${label}-${id}`}
      >
        <div
          className={tw(
            "absolute left-0 right-0 top-0 h-[60%]",
            "border border-zinc-500 rounded-tl-md rounded-tr-md",
            "border-b-0",
            "transition-all duration-500",
            !focused && value === "" && "border-zinc-800"
          )}
        />
        {label}
        <div
          className={tw(
            "absolute left-0 right-0 bottom-0 h-[60%]",
            "transition-all duration-500"
          )}
        />
      </label>

      <div
        className={tw(
          "w-full px-4 py-2",
          "flex flex-row items-center",
          "border border-zinc-500 rounded-md",
          "text-zinc-100",
          "bg-zinc-800",
          "focus-within:border-emerald-300",
          error && "border-red-500 focus-within:border-red-800",
          "transition-all duration-150"
        )}
      >
        {rows === 1 ? (
          <input
            name={`${label}-${id}`}
            type={inputType}
            id={`${label}-${id}`}
            className={tw(
              "flex-1",
              "bg-zinc-800 text-zinc-100",
              "outline-none",
              "autofill:shadow-[inset_0_0_0px_1000px_rgb(39,39,42)] autofill:text-zinc-100"
            )}
            value={value}
            onChange={onChangeHandler}
            onFocus={() => setFocused(true)}
            onBlur={blurHandler}
          />
        ) : (
          <textarea
            rows={rows}
            name={`${label}-${id}`}
            id={`${label}-${id}`}
            className={tw(
              "flex-1",
              "bg-zinc-800 text-zinc-100",
              "outline-none",
              "autofill:shadow-[inset_0_0_0px_1000px_rgb(39,39,42)] autofill:text-zinc-100"
            )}
            value={value}
            onChange={onChangeHandler}
            onFocus={() => setFocused(true)}
            onBlur={blurHandler}
          ></textarea>
        )}
        {endAdornment}
      </div>
      {error && <div className="text-right text-red-500">{error}</div>}
    </div>
  );
};

export default InputBase;
