const sinon = require('sinon');
const { expect } = require('chai')

const salesModel = require('../../models/salesModel')
const salesService = require('../../services/salesService')

describe('Obtém todos os dados de salesModel', () => {

  before(() => {
    const mockPayloadSales = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
    ];
    sinon.stub(salesModel, 'getAll').resolves(mockPayloadSales)
  })

  after(() => {
    sinon.restore()
  })
  it('Verificar se é um array de retorno', async () => {
    const result = await salesService.getAll()
    expect(result).to.be.a('array')
  })
})

describe('Obtém todos os dados de salesModel', () => {

  before(() => {
    const mockPayloadSales = [
      {
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
    ];
    sinon.stub(salesModel, 'getById').resolves(mockPayloadSales)
  })

  after(() => {
    sinon.restore()
  })
  it('Retorna um array com informações de venda', async () => {
    const result = await salesService.getById(1)
    expect(result).to.be.a('array')
  })
})

describe('Obtém todos os dados de salesModel', () => {

  before(() => {
    const mockPayloadSales = {
      saleId: 1,
      itemsUpdated: [],
    };
    sinon.stub(salesModel, 'update').resolves(mockPayloadSales)
  })

  after(() => {
    sinon.restore()
  })
  it('Retorna um object com informações atualizadas', async () => {
    const result = await salesService.update(1, [])
    expect(result).to.be.a('object')
  })
})