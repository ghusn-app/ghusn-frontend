function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  name,
  id,
  icon,
}) {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-right text-sm font-medium text-[#5B961E]"
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Right Icon */}
        {icon && (
          <span
            className="pointer-events-none absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            h-12
            w-full
            rounded-xl
            border
            bg-white
            text-right
            text-sm
            text-gray-800
            outline-none
            transition-colors
            duration-200

            ${icon ? 'pr-12' : 'px-4'}

            placeholder:text-gray-400

            ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#D0D0D0] focus:border-[#5B961E]'
            }
          `}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-right text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input