/// <reference types="cypress" />

//Library for generate data test
import { faker } from '@faker-js/faker'
const randomName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomEmail = faker.internet.email();
const job = faker.name.jobTitle();

// Initialize variable
let newId;
let nameComplete;
let email;
let jobTitle;

describe('API Testing Employees', () => {
    it('GET Method to retrieve employee list', () => {
        cy.request('http://localhost:3000/empleados').then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.length(100)

        })
    })

    it('POST Method to create a employee', () => {
        cy.request('POST', 'http://localhost:3000/empleados', {
            JobTitle: job,
            EmailAddress: randomEmail,
            FirstNameLastName: randomName + " " + randomLastName
        }).its('body').then((body) => {
            newId = body.id;
            nameComplete = body.FirstNameLastName;
            email = body.EmailAddress;
            jobTitle = body.JobTitle

        })

    });

    it('GET Method to validate the employee created', () => {
        cy.request('http://localhost:3000/empleados/' + newId).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('JobTitle', jobTitle)
            expect(res.body).to.have.property('FirstNameLastName', nameComplete)
            expect(res.body).to.have.property('EmailAddress', email)
        })

    });

    it('PATCH Method for partial update employee information', () => {
        cy.request('PATCH', 'http://localhost:3000/empleados/' + newId, {
            JobTitle: job
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('JobTitle', job)

        })
    });

    it('DELETE Method for delete employee information', () => {
        cy.request('DELETE', 'http://localhost:3000/empleados/' + newId).then((res) => {
            expect(res.status).to.eq(200)
        })

    });

});