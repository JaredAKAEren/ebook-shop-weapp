export const decodeSecret = (secret: string, key: number[]) => {
  const result = secret.split('')
  key.forEach(index => {
    result.splice(index, 0, result[index])
  })
  return result.join('')
}