let delay = (func,delay,context) => {
  return () => {
    func.id && clearTimeout(func.id);
    func.id = setTimeout(() => {
      func.apply(context,arguments)
    }, delay)
  }
}

export default delay
