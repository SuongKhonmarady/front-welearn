export default function Input({
  style,
  type,
  id,
  onChange,
  placeholder,
  autoComplete,
  onClick,
  checked,
  defaultValue,
  required,
  accept,
  name,
  value
}) {
  return (
    <input
      name={name}
      className={style}
      type={type}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onClick={onClick}
      value={value}
      checked={checked}
      defaultValue={defaultValue}
      required={required}
      accept={accept}
    />
  );
}