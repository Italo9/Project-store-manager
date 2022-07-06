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

describe('Ao chamar o controller the getById', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
    const mockPayloadSalesId = [
      {
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]
    ;

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadSalesId)
      req.params = sinon.stub().returns(req)
      req.params = sinon.stub().returns(1)
      sinon.stub(salesService, 'getById').resolves(mockPayloadSalesId)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica o retorno de um produto', async () => {
      await salesController.getById(req, res)
      expect(res.json.calledWith(mockPayloadSalesId)).to.equal(true)
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
  })
})


describe('Ao chamar o controller the addSales', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
    const mockPayloadSales = {
      id: 1,
      itemsSold: [],
    };

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadSales)
      req.body = sinon.stub().returns(req)
      req.body = sinon.stub().returns([])
      sinon.stub(salesService, 'addSales').resolves(mockPayloadSales)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica a adição de um produto', async () => {
      await salesController.addSales(req, res)
      expect(res.json.calledWith(mockPayloadSales)).to.equal(true)
      expect(res.status.calledWith(201)).to.be.equal(true);
    })
  })
})

describe('Ao chamar o controller the update', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
    const mockPayloadSales = {
      saleId: 1,
      itemsUpdated: [],
    };

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadSales)
      req.body = sinon.stub().returns(req)
      req.body = sinon.stub().returns([])
      req.params = sinon.stub().returns(req)
      req.params = sinon.stub().returns(1)
      sinon.stub(salesService, 'update').resolves(mockPayloadSales)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica a atualização de um produto', async () => {
      await salesController.update(req, res)
      expect(res.json.calledWith(mockPayloadSales)).to.equal(true)
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
  })
})

describe('Ao chamar o controller the exclude', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
    const mockPayloadProduct = [];

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadProduct)
      req.params = sinon.stub().returns(req)
      req.params = sinon.stub().returns(1)
      sinon.stub(salesService, 'exclude').resolves(mockPayloadProduct)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica a exclusão de um produto', async () => {
      await salesController.exclude(req, res)
      expect(res.json.calledWith(mockPayloadProduct)).to.equal(false)
      expect(res.status.calledWith(204)).to.be.equal(true);
    })
  })
})