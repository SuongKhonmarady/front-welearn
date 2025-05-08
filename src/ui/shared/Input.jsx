import PropTypes from 'prop-types';

function Input({
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
      className={style}
      type={type}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onClick={onClick}
      checked={checked}
      defaultValue={defaultValue}
      required={required}
      accept={accept}
      name={name}
      value={value}
    />
  );
}

Input.propTypes = {
  style: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Input;