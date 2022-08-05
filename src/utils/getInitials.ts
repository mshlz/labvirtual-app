export const getInitials = (name: string, uc?: boolean) => {
  const parts = name.split(" ")
  let result = ""

  switch (parts.length) {
    case 0:
      result = "?"
      break
    case 1:
      result = parts[0][0]
      break
    default:
      result = `${parts[0][0]}${parts[parts.length - 1][0]}`
      break
  }

  return uc ? result.toUpperCase() : result
}
