import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly _controller: Controller

  constructor (controller: Controller) {
    this._controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this._controller.handle(httpRequest)
    return null
  }
}
