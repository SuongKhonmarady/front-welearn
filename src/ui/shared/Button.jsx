function Button({ children, onClick, customClass, type }) {
  const defaultClass =
    "p-2 rounded-xl bg[#283d50] flex gap-2 items-center text-xs justify-center";
  const buttonClass = customClass
    ? ` ${defaultClass} ${customClass}`
    : defaultClass;
  return (
    <button onClick={onClick} type={type} className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;