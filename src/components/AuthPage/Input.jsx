export default function Input({
  type = "text",
  placeholder = "",
  required = true,
  onChange,
  value,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full pl-10 pr-10 py-3  focus:outline-0 ring-1 ring-primary focus:shadow-primary focus:ring-2 rounded  "
        onChange={onChange}
        value={value}
      />
    </>
  );
}
