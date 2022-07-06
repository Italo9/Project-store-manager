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

describe('Obtém um produto pelo id do banco', () => {

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

describe('Atualiza as informações do banco', () => {

  before(() => {
    const mockPayloadProducts = {
      id: 1,
      name: 'teste',
    };
    sinon.stub(productsModel, 'getById').resolves({id: 1})
    sinon.stub(productsModel, 'update').resolves(mockPayloadProducts)
  })

  after(() => {
    sinon.restore()
  })
  
  it('Retorna um object com informações atualizadas', async () => {
    const result = await productsService.update(1, 'xablau')
    expect(result).to.be.a('object')
  })
})

describe('Exclui um produto do banco', () => {

  before(() => {
    const mockPayloadProducts = [];
    sinon.stub(productsModel, 'getById').resolves({})
    sinon.stub(productsModel, 'exclude').resolves(mockPayloadProducts)
  })

  after(() => {
    sinon.restore()
  })
  it('Retorna um objeto que representa o produto', async () => {
    const result = await productsService.getById(1)
    expect(result).to.be.a('object')
  })

  it('Retorna um array vazio', async () => {
    const result = await productsService.exclude(1)
    expect(result).to.be.a('array')
  })
})

describe('Adiciona um produto ao banco', () => {

  before(() => {
    const mockPayloadProducts = {
      id: 1,
      name: 'teste',
    };
    sinon.stub(productsModel, 'addProduct').resolves(mockPayloadProducts)
  })

  after(() => {
    sinon.restore()
  })
  it('Retorna um objeto', async () => {
    const result = await productsService.addProduct('teste')
    expect(result).to.be.a('object')
  })
})