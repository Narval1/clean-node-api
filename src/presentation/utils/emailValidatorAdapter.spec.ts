import { EmailValidatorAdapter } from './emailValidatorAdapter'
import validator from 'validator'

jest.mock('validator', () => {
  return {
    isEmail (): boolean {
      return true
    }
  }
})

const makeSUt = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('emailValidator adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSUt()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sutIsValid = sut.isValid('invalid_email@email.com')
    expect(sutIsValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSUt()
    const sutIsValid = sut.isValid('valid_email@email.com')
    expect(sutIsValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = makeSUt()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
