const Select = ({ onclick, options, disabled }) => {
  let tailwind;

  if (disabled) {
    tailwind =
      "bg-gray-200 border-gray-200 focus:outline-none px-4 border py-1 mx-2 my-2 inline-block";
  } else {
    tailwind =
      "px-5 py-3 border rounded border-gray-200 focus:border-gray-700 text-sm shadow-sm focus:outline-none mx-2 my-2 inline-block focus:shadow-outline hover:shadow-md";
  }

  return (
    <select disabled={disabled} onClick={onclick} className={tailwind}>
      {options ? (
        options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))
      ) : (
        <p>Loading</p>
      )}
    </select>
  );
};

export default Select;
