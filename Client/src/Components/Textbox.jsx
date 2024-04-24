const Textbox = ({ holder, onchange, name, disabled }) => {
  const tailwind = disabled
    ? "px-5 py-3 border rounded border-gray-200 focus:border-gray-700 text-sm shadow-sm focus:outline-none mx-2 my-2 inline-block"
    : "px-5 py-3 border rounded border-gray-200 focus:border-gray-700 text-sm shadow-sm focus:outline-none mx-2 my-2 inline-block hover:shadow-md";
  return (
    <input
      name={name}
      onChange={onchange}
      type="text"
      placeholder={holder}
      className={tailwind}
      disabled={disabled}
    />
  );
};

export default Textbox;
