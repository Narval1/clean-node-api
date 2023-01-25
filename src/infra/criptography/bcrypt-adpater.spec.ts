import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => {
  return {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => { resolve('hash') })
    }
  }
})

interface SutTypes {
  sut: Encrypter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return { sut, salt }
}

describe('bcrypt adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toEqual('hash')
  })
})
