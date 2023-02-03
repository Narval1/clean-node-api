import { AddAccountRepository } from '../../../data/protocols/add-account-repository'
import { AccountModel } from '../../models/account'
import { AddAccountModel } from '../../use-cases/add-account'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(accountData)
    const accountDTO = MongoHelper.map(accountData)
    return await new Promise(resolve => { resolve(accountDTO) })
  }
}
