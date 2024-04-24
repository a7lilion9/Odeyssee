const Textbox = ({ holder, onchange, name, disabled }) => {
  if (disabled) {
    return (
      <input
        name={name}
        onChange={onchange}
        type="text"
        placeholder={holder}
        className="border-l-4 border-slate-800 border py-1 pl-4 focus:outline-none px-1 mx-2 my-2 inline-block bg-gray-200"
        disabled={disabled}
      />
    );
  }

  return (
    <input
      name={name}
      onChange={onchange}
      type="text"
      placeholder={holder}
      className="border-l-4 border-slate-800 border py-1 pl-4 focus:outline-none px-1 mx-2 my-2 inline-block"
      disabled={disabled}
    />
  );
};

export default Textbox;
