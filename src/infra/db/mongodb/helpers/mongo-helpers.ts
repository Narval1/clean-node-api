import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  _client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this._client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this._client.close()
  },

  getCollection (name: string): Collection {
    return this._client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionInfoWithoutId } = collection
    return Object.assign({}, collectionInfoWithoutId, { id: _id.toString() })
  }
}
