export default function Input({
  type = "text",
  placeholder = "",
  required = true,
  onChange,
  value,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={value}
      {...props}
      className={`w-full pl-10 pr-10 py-3 focus:outline-0 ring-1 ring-primary focus:shadow-primary focus:ring-2 rounded bg-transparent ${className}`}
    />
  );
}
