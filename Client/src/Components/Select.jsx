
const Select = ({onclick, options, disabled}) => {
  let tailwind;

  if (disabled) {
    tailwind = 'bg-gray-200 border-slate-800 focus:outline-none px-4 border py-1 mx-2 my-2 inline-block'
  } else {
    tailwind = 'border-slate-800 focus:outline-none px-4 border py-1 mx-2 my-2 inline-block'
  }
  
  return (
    <select disabled={disabled} onClick={onclick} className={tailwind}>
      { options ?
      options.map((option, index) => (
        <option key={index} value={option.value}>{option.text}</option>
      )) : <p>Loading</p>}
    </select>
  )
}

export default Select;