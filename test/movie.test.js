const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();                     // sonucu şöyle olmalı gibi sonuc verirken.

const server=require('../app.js');

chai.use(chaiHttp);



describe('/api/movies tests',()=>{  
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({username:'aaaa',password:'1234'})
            .end((err,res)=>{
                token=res.body.token;
                console.log(token);
                done();
            });
        });

describe('(/ GET movies)',()=>{
    it('it shoul GET all movies',(done)=>{
        chai.request(server)
            .get('/api/movies')
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                    done();
            });       
    });
});

});

