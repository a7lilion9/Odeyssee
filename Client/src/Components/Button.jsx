
const Button = ({ value, type }) => {

  if (type === 'two') {
    return (
      <input type="submit" value={value} className="flex-shrink-0 flex-grow-0 w-28 border bg-slate-100 text-slate-700 px-5 py-2 hover:bg-slate-200 m-2" />
    )
  }

  return (
    <input type="submit" value={value} className="flex-shrink-0 flex-grow-0 w-28 bg-green-500 text-slate-50 px-5 py-2 hover:bg-green-400 ml-1 active:bg-green-600 m-2" />
  )
}

export default Button