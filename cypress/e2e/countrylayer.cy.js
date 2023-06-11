import accessData from '../fixtures/accessKey.json'

describe('TestSuite', function() {
  //declaring accessToken
  const queryParam = {access_key: accessData.access_key};

  //new country for POST method
  const new_country = {
                        name: "Test Country",
                        alpha2_code: "TC",
                        alpha3_code: "TCY"
                      }

  //Getting US country
  it('Getting the three countries (US, DE and GB) and non-existent (KK)', function(){

    cy.fixture('countries.json').then((fixtureData) => {

      fixtureData.forEach((country) => {
        cy.request({
          method:'GET',
          url: `http://api.countrylayer.com/v2/alpha/${country.alphacode}`,
          qs: queryParam,
          failOnStatusCode: false
        })
        .then((response) => {
          //Validations
          if (response.status == 200){
            expect(response.status).eq(country.code)
            expect(response.body).has.property("name", country.name)
            expect(response.body).has.property("alpha2Code", country.alphacode)
          }
          else{
            expect(response.status).eq(country.code)
          }

        })
        cy.wait(1000) //rate limitation for free plan

      })

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