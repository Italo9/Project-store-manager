const { expect } = require('chai')
const sinon = require('sinon')
const salesModel = require('../../models/salesModel')
const connection = require('../../helpers/connection')

describe('Obtém todos os produtos', () => {
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
  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves([mockPayloadSales]);
  });

  after(async () => {
    sinon.restore();
  });

  it('Retorna um array', async () => {
    const result = await salesModel.getAll()
    expect(result).to.be.a('array')
  })
})

describe('Obtém uma venda the getById', () => {
  const mockPayloadSalesId = [[{}]];
  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves(mockPayloadSalesId);
  });

  after(async () => {
    sinon.restore();
  });

  it('Retorna um objeto que representa um produto', async () => {
    const result = await salesModel.getById(1)
    expect(result).to.be.a('array')
  })
})

describe('Adiciona uma venda the addSales', () => {
  const mockPayloadSales = [[{insertId: 1}]];
  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves(mockPayloadSales);
  });

  after(async () => {
    sinon.restore();
  });

  it('Retorna um objeto que representa um venda ', async () => {
    const result = await salesModel.addSales([])
    expect(result).to.be.a('object')
  })
})