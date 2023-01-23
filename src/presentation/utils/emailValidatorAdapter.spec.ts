import { EmailValidatorAdapter } from './emailValidatorAdapter'

describe('emailValidator adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const sutIsValid = sut.isValid('invalid_email@email.com')
    expect(sutIsValid).toBe(false)
  })
})
