it("titles are correct", () => {
  const page = cy.visit("http://localhost:3000");

  page
    .get("h1 a") // Select the <a> tag within the <h1> element
    .should("have.text", "Bibliografia Ziemi Lubuskiej 1945-1989");
});

describe("Test for 200 Response Status Code", () => {
  it("Should return a 200 status code main page", () => {
    // Use cy.request() to send an HTTP GET request to the page
    cy.request("GET", "http://localhost:3000") // Replace with your page URL
      .then((response) => {
        // Assert that the response status code is 200
        expect(response.status).to.eq(200);
      });
  });
  it("Should return a 200 status code kartki page", () => {
    // Use cy.request() to send an HTTP GET request to the page
    cy.request("GET", "http://localhost:3000/kartki?rok=1945") // Replace with your page URL
      .then((response) => {
        // Assert that the response status code is 200
        expect(response.status).to.eq(200);
      });
  });
  it("Should return a 200 status code całość page", () => {
    // Use cy.request() to send an HTTP GET request to the page
    cy.request("GET", "http://localhost:3000/calosc?temat=historia") // Replace with your page URL
      .then((response) => {
        // Assert that the response status code is 200
        expect(response.status).to.eq(200);
      });
  });
  it("Should return a 200 status code temat page", () => {
    // Use cy.request() to send an HTTP GET request to the page
    cy.request("GET", "http://localhost:3000/temat?rok=1947&temat=historia") // Replace with your page URL
      .then((response) => {
        // Assert that the response status code is 200
        expect(response.status).to.eq(200);
      });
  });
});
