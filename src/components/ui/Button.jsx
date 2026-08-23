function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        rounded-xl
        bg-[#5B961E]
        px-6
        py-3.5
        text-sm
        font-bold
        text-white
        transition-all
        duration-200

        hover:bg-[#4F8519]
        active:scale-[0.99]

        disabled:cursor-not-allowed
        disabled:opacity-50

        focus:outline-none
        focus:ring-2
        focus:ring-[#5B961E]
        focus:ring-offset-2

        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button