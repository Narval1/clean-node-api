import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  _client: null as MongoClient,
  _uri: null as string,

  async connect (uri: string): Promise<void> {
    this._uri = uri
    this._client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this._client.close()
    this._client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (this._client === null) {
      await this.connect(this._uri)
    }
    return this._client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionInfoWithoutId } = collection
    return Object.assign({}, collectionInfoWithoutId, { id: _id.toString() })
  }
}
