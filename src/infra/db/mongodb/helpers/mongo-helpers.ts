import { MongoClient } from 'mongodb'

export const MongoHelper = {
  _client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this._client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this._client.close()
  }
}
