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
    it('it should GET all movies',(done)=>{
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

describe('(/ POST movies)',()=>{
    it('it should POST a movie',(done)=>{
        const movie = {
            title:'film x',
            director_id:'5b9ecfd302b82342e4a1215f',
            category:'action',
            country:'Turkey',
            year:2018,
            imdb_score:'8.9'
        };

        chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200),
                res.body.should.be.a('object'),
                res.body.should.have.property('title')
                res.body.should.have.property('director_id')
                res.body.should.have.property('category')
                res.body.should.have.property('country')
                res.body.should.have.property('year')
                res.body.should.have.property('imdb_score')
                    done();
            });  
    });
});

});

