import { classNames } from "@/lib/utils/classNames";

interface FormFieldProps {
  name: string;
  label: string;
  error?: string;
  defaultValue?: string;
  type?: "text" | "email";
  multiline?: boolean;
  autoComplete?: string;
  onFocus?: () => void;
  className?: string;
}

const INPUT_CLASSES =
  "w-full border-b-2 border-ink/40 bg-transparent px-1 py-3 outline-none focus:border-primary";

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  error,
  defaultValue,
  type = "text",
  multiline,
  autoComplete,
  onFocus,
  className,
}) => {
  const errorId = `${name}-error`;
  const shared = {
    id: name,
    name,
    defaultValue,
    placeholder: label,
    onFocus,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={classNames("flex flex-col", className)}>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={10} className={INPUT_CLASSES} />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          className={INPUT_CLASSES}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};
