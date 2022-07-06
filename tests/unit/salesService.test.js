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

describe('Obtém uma venda pelo id de salesModel', () => {

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

describe('Atualiza as informações de uma venda', () => {

  before(() => {
    const mockPayloadSales = {
      saleId: 1,
      itemsUpdated: [],
    };
    sinon.stub(salesModel, 'getById').resolves({ id: 1 })
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


describe('Exclui uma venda do banco', () => {

  before(() => {
    const mockPayloadSales = [];
    sinon.stub(salesModel, 'getById').resolves({})
    sinon.stub(salesModel, 'exclude').resolves(mockPayloadSales)
  })

  after(() => {
    sinon.restore()
  })
  it('Retorna um array que representa uma venda', async () => {
    const result = await salesService.exclude(1)
    expect(result).to.be.a('array')
  })

  it('Retorna um array vazio', async () => {
    const result = await salesService.exclude(1)
    expect(result).to.be.a('array')
  })
})

describe('Adiciona uma venda ao banco', () => {

  before(() => {
    const mockPayloadSales = {
      id: 1,
      name: 'teste',
    };
    sinon.stub(salesModel, 'addSales').resolves(mockPayloadSales)
  })

  after(() => {
    sinon.restore()
  })
  it('Retorna um objeto', async () => {
    const result = await salesService.addSales([])
    expect(result).to.be.a('object')
  })
})