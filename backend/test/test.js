const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('Teste 1', () => {
  describe('/GET getclima', () => {
    it('Testes das rotas GET', (done) => {
      chai.request('http://localhost:4851')
        .get('/getclima?cidade=Santa Maria')
        .end((err, res) => {
            res.should.have.status(200)
            // res.body.should.have.property('teste')
          done()
        })
    })
  })
})
describe('Teste 2', () => {
  describe('/GET getclimadb', () => {
    it('Testes das rotas GET', (done) => {
      chai.request('http://localhost:4851')
        .get('/getclimadb')
        .end((err, res) => {
            res.should.have.status(200)
          done()
        })
    })
  })
})
describe('Teste 3', () => {
  describe('/GET Monitor city', () => {
    it('Testes das rotas GET', (done) => {
      chai.request('http://localhost:4851')
        .get('/monitorcity?param=Santa Maria')
        .end((err, res) => {
          res.should.have.status(200)
            res.body.should.have.property('id')
            res.body.should.have.property('name')
            res.body.should.have.property('longitude')
            res.body.should.have.property('gmt')
          done()
        })
    })
  })
})