const normalizeEmail = (email) => {
  // Normalize email
  const aux = email.split('@')
  const atIndex = aux[0].indexOf('+')
  aux[0] = atIndex < 0 ? aux[0].replace('.', '') : aux[0].replace('.', '').substring(0, atIndex - 1)
  email = aux.join('@')
  return email
}

const normalizeStreet = (street) => {
  // Normalize street
  return street
    .replace(/st\./g, 'street')
    .replace(/rd\./g, 'road')
}

const normalizeState = (state) => {
  // Normalize state
  return state
    .replace('il', 'illinois')
    .replace('ca', 'california')
    .replace('ny', 'new york')
}

module.exports = {
  normalizeEmail,
  normalizeState,
  normalizeStreet
}
