const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const fs = require('fs');

chai.should();
chai.use(chaiHttp);

describe('Vehicle API', () => {
    beforeEach(() => {
        fs.writeFileSync('vehicles.json', JSON.stringify([]));
    });

    describe('GET /api/vehicles', () => {
        //Visualizar todos os veiculos
        it('should get all vehicles', (done) => {
            chai.request(server)
                .get('/api/vehicles')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('POST /api/vehicles', () => {
        //Criar um veículo
        it('should create a new vehicle', (done) => {
            const vehicle = {
                placa: 'ABC-1234',
                chassi: '12345678901234567',
                renavam: '123456789',
                modelo: 'Modelo X',
                marca: 'Marca Y',
                ano: 2022
            };
            chai.request(server)
                .post('/api/vehicles')
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('placa').eql('ABC-1234');
                    done();
                });
        });
    });

    describe('PUT /api/vehicles/:id', () => {
        it('should update an existing vehicle', (done) => {
            const vehicle = {
                placa: 'ABC-1234',
                chassi: '12345678901234567',
                renavam: '123456789',
                modelo: 'Modelo X',
                marca: 'Marca Y',
                ano: 2022
            };

            chai.request(server)
                .post('/api/vehicles')
                .send(vehicle)
                .end((err, res) => {
                    const vehicleId = res.body.id; // Capturar o ID retornado
                    const updatedVehicle = {
                        placa: 'XYZ-5678',
                        chassi: '98765432109876543',
                        renavam: '987654321',
                        modelo: 'Modelo Y',
                        marca: 'Marca Z',
                        ano: 2023
                    };

                    chai.request(server)
                        .put(`/api/vehicles/${vehicleId}`) // atualizar o ID
                        .send(updatedVehicle)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('placa').eql('XYZ-5678');
                            done();
                        });
                });
        });
    });

    describe('DELETE /api/vehicles/:id', () => {
        it('should delete a specific vehicle and verify that it is removed', (done) => {
            const vehicle = {
                placa: 'ABC-1234',
                chassi: '12345678901234567',
                renavam: '123456789',
                modelo: 'Modelo X',
                marca: 'Marca Y',
                ano: 2022
            };
    
            // Cria o veículo
            chai.request(server)
                .post('/api/vehicles')
                .send(vehicle)
                .end((err, res) => {
                    const vehicleId = res.body.id; // ID do veículo criado
    
                    // Verifica se o veículo foi criado
                    chai.request(server)
                        .get('/api/vehicles')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(3); // Deve haver 3 veículo
    
                            // Exclui o veículo
                            chai.request(server)
                                .delete(`/api/vehicles/${vehicleId}`)
                                .end((err, res) => {
                                    res.should.have.status(204); // Assumindo que a resposta para deleção bem-sucedida é 204 No Content
    
                                    // Verifica se a lista está como 2 após a deleção
                                    chai.request(server)
                                        .get('/api/vehicles')
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            res.body.should.be.a('array');
                                            res.body.length.should.be.eql(2); // A lista deve estar como 2 pois ja havia 2 cadastrado
                                            done();
                                        });
                                });
                        });
                });
        });
    });
    

});
