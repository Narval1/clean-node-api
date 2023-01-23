import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly _emailValidator: EmailValidator
  private readonly _addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this._emailValidator = emailValidator
    this._addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, password, passwordConfirmation, email } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this._emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this._addAccount.add({
        name,
        password,
        email
      })
      console.log(account)
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
