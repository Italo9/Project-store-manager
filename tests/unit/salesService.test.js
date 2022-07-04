const sinon = require('sinon');
const { expect } = require('chai')

const salesModel = require('../../models/salesModel')
const salesService = require('../../services/salesService')

describe('Obtém todos os dados de salesModel', () => {

  before(() => {
    const mockPayloadSales = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
    sinon.stub(salesModel, 'getAll').resolves(mockPayloadSales)
    sinon.stub(salesModel, 'getById').resolves(mockPayloadSales[0])
  })

  after(() => {
    sinon.restore()
  })
  //t
  it('Verificar se é um array de retorno', async () => {
    const result = await salesService.getAll()
    expect(result).to.be.a('array')
  })
  it('Retorna um objeto que representa um produto', async () => {
    const result = await salesService.getById(1)
    expect(result).to.be.a('object')
  })
})