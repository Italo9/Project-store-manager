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
  })

  after(() => {
    sinon.restore()
  })
  it('Verificar se é um array de retorno', async () => {
    const result = await productsService.getAll()
    expect(result).to.be.a('array')
  })
})

describe('Obtém todos os dados de productsModel', () => {

  before(() => {
    const mockPayloadProducts = {
      "id": 1,
      "name": "Martelo de Thor",
    };
    sinon.stub(productsModel, 'getById').resolves(mockPayloadProducts)
  })

  after(() => {
    sinon.restore()
  })

  it('Retorna um objeto que representa um produto', async () => {
    const result = await productsService.getById(1)
    expect(result).to.be.a('object')
  })
})

// describe('Obtém todos os dados de salesModel', () => {

//   before(() => {
//     const mockPayloadSales = {
//       id: 1,
//       name: 'teste',
//     };
//     sinon.stub(salesModel, 'update').resolves(mockPayloadSales)
//   })

//   after(() => {
//     sinon.restore()
//   })
//   it('Retorna um object com informações atualizadas', async () => {
//     const result = await salesService.update(1, 'xablau')
//     expect(result).to.be.a('object')
//   })
// })