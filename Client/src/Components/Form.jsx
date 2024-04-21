const Form = ({children, onsubmit}) => {
  const tailwind = `m-2 flex flex-col justify-end`
  return (
    <form onSubmit={onsubmit} className={tailwind}>
      {children}
    </form>
  )
}

export default Form