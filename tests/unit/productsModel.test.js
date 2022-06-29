const { expect } = require('chai')
const sinon = require('sinon')
const productsModel = require('../../models/productsModel')
const connection = require('../../helpers/connection')

describe('Obtém todos os produtos', () => {
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
    connection.execute.restore();
  });

  it('Retorna um array', async () => {
    const result = await productsModel.getAll()
    expect(result).to.be.a('array')
  })
  it('Retorna um objeto que representa um produto', async () => {
    const result = await productsModel.getById(1)
    expect(result).to.be.a('object')
  })
})