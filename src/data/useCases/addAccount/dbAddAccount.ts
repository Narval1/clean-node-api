import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './dbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  private readonly _encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this._encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this._encrypter.encrypt(account.password)
    return await new Promise(resolve => { resolve(null) })
  }
}
