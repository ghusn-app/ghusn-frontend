import { useState } from 'react'

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  name,
  id,
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false)

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
        {/* Right Icon - Lock */}
        {icon && (
          <span
            className="pointer-events-none absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {/* Password Input */}
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
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

            ${icon ? 'pr-12' : 'pr-4'}
            pl-12

            placeholder:text-gray-400

            ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#D0D0D0] focus:border-[#5B961E]'
            }
          `}
        />

        {/* Show / Hide Password Button */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#5B961E] transition-opacity hover:opacity-70"
          aria-label={
            showPassword
              ? 'إخفاء كلمة المرور'
              : 'إظهار كلمة المرور'
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2.5 12C4.5 7.8 7.7 5.5 12 5.5C16.3 5.5 19.5 7.8 21.5 12C19.5 16.2 16.3 18.5 12 18.5C7.7 18.5 4.5 16.2 2.5 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
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

export default PasswordInput