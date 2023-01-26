import { AddAccountModel } from '../../../../domain/use-cases/add-account'

export class AccountDto {
  id: string
  name: string
  email: string
  password: string

  constructor (accountInfo: AddAccountModel, id: string) {
    this.name = accountInfo.name
    this.email = accountInfo.email
    this.password = accountInfo.password
    this.id = id
  }
}
