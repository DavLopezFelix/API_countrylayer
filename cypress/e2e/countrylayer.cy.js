///<reference types="Cypress"/>

describe('TestSuite', function() {
  //declaring accessToken 
  const queryParam = {access_key: "d250e0a80e0e67f18866958c3f56915d"};

  //declaring alphacode plus country associated with
  const country1 = ["US", "United States of America"];
  const country2 = ["DE", "Germany"];
  const country3 = ["GB", "United Kingdom of Great Britain and Northern Ireland"];

  const country4 = "kk" //non-existent

  //new country for POST method
  const new_country = {
                        name: "Test Country",
                        alpha2_code: "TC",
                        alpha3_code: "TCY"
                      }

  //Getting US country
  it('Getting US', function(){
    cy.request({
      method:'GET',
      url: `http://api.countrylayer.com/v2/alpha/${country1[0]}`,
      qs: queryParam //
    })
    .then((response) => {
      //Validations
      expect(response.status).eq(200)
      expect(response.body).has.property("name", country1[1])
      expect(response.body).has.property("alpha2Code", country1[0])
    })
    cy.wait(1000) //rate limitation for free plan
  })

  //Getting DE country
  it('Getting DE', function(){
    cy.request({
      method:'GET',
      url: `http://api.countrylayer.com/v2/alpha/${country2[0]}`,
      qs: queryParam
    })
    .then((response) => {
      //Validations
      expect(response.status).eq(200)
      expect(response.body).has.property("name", country2[1])
      expect(response.body).has.property("alpha2Code", country2[0])
    })
    cy.wait(1000) //rate limitation for free plan
  })

  //Getting GB country
  it('Getting GB', function(){
    cy.request({
      method:'GET',
      url: `http://api.countrylayer.com/v2/alpha/${country3[0]}`,
      qs: queryParam
    })
    .then((response) => {
      //Validations
      expect(response.status).eq(200)
      expect(response.body).has.property("name", country3[1])
      expect(response.body).has.property("alpha2Code", country3[0])
    })
    cy.wait(1000) //rate limitation for free plan
  })

  //Getting non-existent country
  it('Getting KK (non-existent)', function(){
    cy.request({
      method:'GET',
      url: `http://api.countrylayer.com/v2/alpha/${country4}`,
      qs: queryParam,
      failOnStatusCode: false
    })
    .then((response) => {
      //Validations
      expect(response.status).eq(404)
      //expect(response.body).has.property("message", "Not found")
    })
  })

  //This case is skipped because the POST method does not exist
  //and it breaks the test suite.
  //Once it is implemented, this case can be run replacing the line 88:
  //it('Adding new country', function(){
  it.skip('Adding new country', function(){
    cy.request({
      method:'POST',
      url: `http://api.countrylayer.com/v2/`,
      qs: queryParam,
      body: new_country,
    })
    .then((response) => {
      //Here we can add more validations
      expect(response.status).eq(201)
    })
  })

})