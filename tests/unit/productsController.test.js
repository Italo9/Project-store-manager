const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require('../../services/productsService')
const productsController = require('../../controllers/productsController');

describe('Ao chamar o controller the get all', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
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

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadProducts)
      sinon.stub(productsService, 'getAll').resolves(mockPayloadProducts)
      sinon.stub(productsService, 'getById').resolves(mockPayloadProducts)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica o retorno dos dados', async () => {
      await productsController.getAll(req, res)
      expect(res.json.calledWith(mockPayloadProducts)).to.equal(true)
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
  })
})


describe('Ao chamar o controller the getById', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
    const mockPayloadProductId = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
    ];

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadProductId)
      req.params = sinon.stub().returns(req)
      req.params = sinon.stub().returns(1)
      sinon.stub(productsService, 'getById').resolves(mockPayloadProductId)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica o retorno de um produto', async () => {
      await productsController.getById(req, res)
      expect(res.json.calledWith(mockPayloadProductId)).to.equal(true)
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
  })
})


describe('Ao chamar o controller the addProduct', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
    const mockPayloadProductId = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
    ];

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadProductId)
      req.body = sinon.stub().returns(req)
      req.body = sinon.stub().returns('teste')
      sinon.stub(productsService, 'addProduct').resolves(mockPayloadProductId)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica a adição de um produto', async () => {
      await productsController.addProduct(req, res)
      expect(res.json.calledWith(mockPayloadProductId)).to.equal(true)
      expect(res.status.calledWith(201)).to.be.equal(true);
    })
  })
})

describe('Ao chamar o controller the update', () => {
  describe('quando há elementos', () => {
    const res = {};
    const req = {};
    const mockPayloadProductId = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
    ];

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(mockPayloadProductId)
      req.body = sinon.stub().returns(req)
      req.body = sinon.stub().returns('teste')
      req.params = sinon.stub().returns(req)
      req.params = sinon.stub().returns(1)
      sinon.stub(productsService, 'update').resolves(mockPayloadProductId)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica a atualização de um produto', async () => {
      await productsController.update(req, res)
      expect(res.json.calledWith(mockPayloadProductId)).to.equal(true)
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
      sinon.stub(productsService, 'exclude').resolves(mockPayloadProduct)
    })

    after(() => {
      sinon.restore()
    })

    it('Verifica a exclusão de um produto', async () => {
      await productsController.exclude(req, res)
      expect(res.json.calledWith(mockPayloadProduct)).to.equal(false)
      expect(res.status.calledWith(204)).to.be.equal(true);
    })
  })
})