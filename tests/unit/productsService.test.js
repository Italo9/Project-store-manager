const sinon = require('sinon');
const { expect } = require('chai')

const productsModel = require('../../models/productsModel')
const productsService = require('../../services/productsService')

describe('Obtém todos os dados de productsModel', () => {

  before(() => {
    const mockPayloadProducts = [
      {
        name: 'Teste1',
      },
      {
        name: 'Teste2',
      },
      {
        name: 'Teste3',
      }
    ];
    sinon.stub(productsModel, 'getAll').resolves(mockPayloadProducts)
    sinon.stub(productsModel, 'getById').resolves(mockPayloadProducts[0])
  })

  after(() => {
    productsModel.getAll.restore()
  })
//t
  it('Verificar se é um array de retorno', async () => {
    const result = await productsService.getAll()
    expect(result).to.be.a('array')
  })
  it('Retorna um objeto que representa um produto', async () => {
    const result = await productsService.getById(1)
    expect(result).to.be.a('object')
  })
})