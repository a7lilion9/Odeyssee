const Select = ({ onclick, options, disabled, name }) => {
  let tailwind;

  if (disabled) {
    tailwind =
      "bg-gray-100 px-5 py-3 border rounded border-gray-200 focus:border-gray-700 text-sm shadow-sm focus:outline-none mx-2 my-2 inline-block focus:shadow-outline";
  } else {
    tailwind =
      "px-5 py-3 border rounded border-gray-200 focus:border-gray-700 text-sm shadow-sm focus:outline-none mx-2 my-2 inline-block focus:shadow-outline hover:shadow-md";
  }

  return (
    <select
      name={name}
      disabled={disabled}
      onClick={onclick}
      className={tailwind}
    >
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
