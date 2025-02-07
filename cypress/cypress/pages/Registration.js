/// <reference types="Cypress" />
import BasePage from "../pages/BasePage";

class Registration extends BasePage {
    formElements() {
        const textboxFirstName = "//*[@autoid='firstName']";
        const textboxLastName = "//*[@autoid='lastName']";
        const textboxCompanyName = "//*[@autoid='companyName']";
        const textboxPhoneNumber = "//*[@autoid='phoneNumber']";
        const textboxEmailAddress = "//*[@autoid='emailAddress']";
        const textboxPassword = "//*[@id='password']";
        const textboxConfirmPassword = "//*[@id='password-confirm']";
        const dropDownCountry = "//*[@placeholder='Country']";
        const dropDownAffiliation = "//*[@placeholder='Affiliation']";
        const textboxTitle = "//*[@autoid='Title']";
        const textboxwebsiteUrl = "//*[@autoid='websiteUrl']";
        const textboxaddressLine1 = "//*[@autoid='addressLine1']";
        const textboxaddressLine2 = "//*[@autoid='addressLine2']";
        const textboxCity = "//*[@autoid='City']";
        const textboxState = "//*[@autoid='State']";
        const textboxPostCode = "//*[@autoid='zipCode']";       
        return {
            textboxFirstName,
            textboxLastName,
            textboxCompanyName,
            textboxPhoneNumber,
            textboxEmailAddress,
            textboxPassword,
            textboxConfirmPassword,
            dropDownCountry,
            dropDownAffiliation,
            textboxTitle,
            textboxwebsiteUrl,
            textboxaddressLine1,
            textboxaddressLine2,
            textboxCity,
            textboxState,
            textboxPostCode
        };
    }
    
    verifyH2Header(headerName) {
        try {
            const val = cy.get('h2').should('be.visible').contains(headerName)
            cy.log(headerName + ' header has seen on page')
            return val
        } catch (error) {
            cy.log(headerName + ' header has not seen on page error:' + error)
        }
    }

    verifyValidationMessageForm3(message) {
        const xpath = "//span[@class='field-validation-valid text-danger']";
      
        cy.xpath(xpath).should('be.visible').then((element) => {
          const bodyText = element.text();
      
          if (bodyText.includes(message)) {
            cy.log("Validation message successfully seen: " + message);
          } else {
            cy.log("Validation message cannot be seen: " + message);
          }
        });
    }


}

export default Registration