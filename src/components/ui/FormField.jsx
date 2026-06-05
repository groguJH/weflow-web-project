export default function FormField({
  id,
  label,
  required = false,
  icon: Icon,
  children,
  labelClassName = '',
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400 ${labelClassName}`}
      >
        {Icon && <Icon size="1em" className="text-[0.75rem] text-cyan-500/70" aria-hidden="true" />}
        {label}
        {required && <span className="text-blue-400" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}
