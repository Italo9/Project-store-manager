const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require('../../services/salesService')
const salesController = require('../../controllers/salesController');

describe('Ao chamar o controller the get all', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
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

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadSales)
      sinon.stub(salesService, 'getAll').resolves(mockPayloadSales)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica o retorno dos dados', async () => {
      await salesController.getAll(req, res)
      expect(res.json.calledWith(mockPayloadSales)).to.equal(true)
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
  })
})
