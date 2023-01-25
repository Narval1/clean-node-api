import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly _encrypter: Encrypter
  private readonly _addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this._encrypter = encrypter
    this._addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this._encrypter.encrypt(accountData.password)
    // ensure this is a deep clone
    const account = JSON.parse(JSON.stringify(accountData))
    account.password = hashedPassword
    const returnData = await this._addAccountRepository.add(account)
    return await new Promise(resolve => { resolve(returnData) })
  }
}
