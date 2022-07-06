const { expect } = require('chai')
const sinon = require('sinon')
const productsModel = require('../../models/productsModel')
const connection = require('../../helpers/connection')

describe('Obtém todos os produtos the getAll', () => {
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
  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves([mockPayloadProducts]);
  });

  after(async () => {
    sinon.restore();
  });

  it('Retorna um array', async () => {
    const result = await productsModel.getAll()
    expect(result).to.be.a('array')
  })
})

describe('Obtém o produto the getById', () => {
  const mockPayloadProductId = [[{}]];
  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves(mockPayloadProductId);
  });

  after(async () => {
    sinon.restore();
  });

  it('Retorna um objeto que representa um produto', async () => {
    const result = await productsModel.getById(1)
    expect(result).to.be.a('object')
  })
})

describe('Adiciona om produto the addProduct', () => {
  const mockPayloadProductName = "testeName";
  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves([mockPayloadProductName]);
  });

  after(async () => {
    sinon.restore();
  });

  it('Retorna um objeto que representa um produto', async () => {
    const result = await productsModel.addProduct("teste")
    expect(result).to.be.a('object')
  })
})