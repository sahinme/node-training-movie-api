const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();                     // sonucu şöyle olmalı gibi sonuc verirken.

const server=require('../app.js');

chai.use(chaiHttp);

describe('Node JS Server Test',()=>{  // description or title your test  

    it('(GET /) return of index page ',(done)=>{
        chai.request(server)
        .get('/')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        });
        
    });
});
