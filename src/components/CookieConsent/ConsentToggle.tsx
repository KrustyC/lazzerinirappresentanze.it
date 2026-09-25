interface ConsentToggleProps {
  title: string;
  description: string;
  checked: boolean;
  /** Omitted for the necessary category, which cannot be switched off. */
  onChange?: (checked: boolean) => void;
}

export const ConsentToggle: React.FC<ConsentToggleProps> = ({
  title,
  description,
  checked,
  onChange,
}) => (
  <label className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
    <span className="flex-1">
      <span className="block font-bold">{title}</span>
      <span className="block text-sm">{description}</span>
      {!onChange && (
        <span className="mt-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs">
          Sempre attivi
        </span>
      )}
    </span>
    <input
      type="checkbox"
      className="accent-primary mt-1 size-5"
      checked={checked}
      disabled={!onChange}
      onChange={(event) => onChange?.(event.target.checked)}
    />
  </label>
);
