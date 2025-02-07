import BasePage from "../pages/BasePage";

class Dashboard extends BasePage {

    verifySSLayerFieldsNotPresent() {
        cy.log('Verify not present Income Layer Name fields')
        cy.verifyTextNotPresent('Social security Layer Name')
        cy.verifyTextNotPresent('Benefit Delay Layer Name')
        cy.verifyTextNotPresent('Benefit Replacement Layer Name')
        cy.verifyTextNotPresent('Income Floor Layer Name')
        cy.verifyTextNotPresent('Additional Income Layer Name')
    }

    verifySSLayerFieldsPresent() {
        cy.log('Verify  present Layer Name fields in general page')
        cy.verifyTextPresent('Social Security Layer Name')
        cy.get('#socialSecurityTitle').should('exist').and('have.value', 'Social Security')
        cy.verifyTextPresent('Benefit Delay Layer Name')
        cy.get('#benefitDelayTitle').should('exist').and('have.value', 'Benefit Delay')
        cy.verifyTextPresent('Benefit Replacement Layer Name')
        cy.get('#benefitReplacementTitle').should('exist').and('have.value', 'Benefit Replacement')
        cy.verifyTextPresent('Income Floor Layer Name')
        cy.get('#incomeFloorTitle').should('exist').and('have.value', 'Income Floor')
        cy.verifyTextPresent('Additional Income Layer Name')
        cy.get('#additionalIncomeTitle').should('exist').and('have.value', 'Additional Income')
    }

    verifyDeluxeDashboardElements(custodiedAccountNo, custodiedAccountBalance, heldAwayAccountNo, heldAwayAccountBalance, subscriptionType) {
        cy.get('.content > span').should('exist').and('have.text', 'Dashboard')

        cy.wait(5000)
        cy.get('canvas').should('be.visible').compareSnapshot({
            name: 'PortsTotalBalnce&Allc',
            testThreshold: 0.01,
            recurseOptions: { limit: 3, delay: 500 }
        })

        cy.verifyTextPresent('Custodied Accounts')
        cy.get('.statusBoxCustodied').should('be.visible').compareSnapshot({
            name: 'statusBoxCustodiedColor',
            testThreshold: 0.01,
            recurseOptions: { limit: 3, delay: 500 }
        })
        cy.get(':nth-child(2) > .accountTypeSummary > h2').as('CustodiedAccountsCount').should('have.text', custodiedAccountNo + ' Accounts')
        cy.get(':nth-child(2) > .accountTypeSummary > p').as('CustodiedAccountsBalance').should('have.text', ' ' + custodiedAccountBalance + ' ')
        cy.verifyTextPresent('Held-away Accounts')
        cy.get('.statusBoxHeldaway').should('be.visible').compareSnapshot({
            name: 'statusBoxHeldawayColor',
            testThreshold: 0.01,
            recurseOptions: { limit: 3, delay: 500 }
        })
        cy.get(':nth-child(3) > .accountTypeSummary > h2').as('CustodiedHeldAwayAccountsCount').should('have.text', heldAwayAccountNo + ' Accounts')
        cy.get(':nth-child(3) > .accountTypeSummary > p').as('CustodiedHeldAwayAccountsBalance').should('have.text', ' ' + heldAwayAccountBalance + ' ')

        this.verifyDashboarAccordingToSubscriptionType(subscriptionType)

        cy.get('.active > span').should('have.text', 'Dashboard')
        cy.get('.active > .ui').as('activeDashboardMenuLink').should('be.visible').compareSnapshot({
            name: 'DashboardNavIcon',
            testThreshold: 0.01,
            recurseOptions: { limit: 3, delay: 500 }
        })
        cy.get('[href="' + Cypress.env('baseHREF') + 'pa-portfolios"] > span').as('Portfolios').should('have.text', 'Portfolios')
        cy.get('[href="' + Cypress.env('baseHREF') + 'pa-portfolios"] > .ui').as('activeDashboardMenuLink').should('be.visible').compareSnapshot({
            name: 'PortfoliosdNavIcon',
            testThreshold: 0.01,
            recurseOptions: { limit: 3, delay: 500 }
        })
        cy.get('[href="' + Cypress.env('baseHREF') + 'pa-quick-proposal"] > span').should('have.text', 'Quick Proposal')
        cy.get('[href="' + Cypress.env('baseHREF') + 'pa-quick-proposal"] > .ui').should('be.visible').compareSnapshot({
            name: 'QuickProposaldNavIcon',
            testThreshold: 0.01,
            recurseOptions: { limit: 3, delay: 500 }
        })
        cy.get('.title > .item > [style="font-size: 14px;"]').should('have.text', 'Settings')
        cy.get('.title > .item > .ui').should('be.visible').compareSnapshot({
            name: 'SettingsNavIcon',
            testThreshold: 0.01,
            recurseOptions: { limit: 3, delay: 500 }
        })
        //Northwestern has 3 custodied accounts
        if (custodiedAccountNo === '3') {
            cy.get('[href="https://connect.nml.com/linknet/pages/products-services/sophisticated-planning-strategies/sps-overview/"] > span').should('have.text', 'Support')
            cy.get('[href="https://connect.nml.com/linknet/pages/products-services/sophisticated-planning-strategies/sps-overview/"] > .ui').should('be.visible').compareSnapshot({
                name: 'SupportNavIcon',
                testThreshold: 0.01,
                recurseOptions: { limit: 3, delay: 500 }
            })
        } else {
            cy.get('[href="https://help.lifeyield.com/"] > span').should('have.text', 'Support')
            cy.get('[href="https://help.lifeyield.com/"] > .ui').should('be.visible').compareSnapshot({
                name: 'SupportNavIcon',
                testThreshold: 0.01,
                recurseOptions: { limit: 3, delay: 500 }
            })
        }
        
    }

    verifyDashboarAccordingToSubscriptionType(subscriptionTypeForDashboard) {
        switch (subscriptionTypeForDashboard) {
            case 'P+ Yearly':
            case 'P+ Monthly':
                cy.log('Subscription: P+ Yearly and P+ Monthly')
                cy.verifyTextPresent("The Quick Proposal tool highlights the impact of taxes on an investment portfolio, using LifeYield's Taxficient Score®")
                cy.get('.center > :nth-child(5)').should('have.text', ' View Portfolios ')
                cy.get('.center > h3').as('subscriptionType').should('have.text', 'LifeYield Portfolio+')
                cy.get('.center > :nth-child(3)').should('have.text', ' Generate a Quick Proposal ')
                cy.verifyTextPresent('LifeYield Portfolio+')
                cy.verifyTextNotPresent('LifeYield Income+')
                cy.verifyTextNotPresent('LifeYield Social Security+')
                cy.verifyTextNotPresent('Social Security')
                break;
            case 'I+ Yearly':
            case 'I+ Monthly':
                cy.log('Subscription: I+ Yearly and I+ Monthly')
                cy.verifyTextPresent("Calculates the preferred sequence of withdrawals to minimize taxes, and recommends the most tax-efficient way to take income from investments.")
                cy.get('.center > h3').as('subscriptionType').should('have.text', 'LifeYield Income+')
                cy.get('.center > .ui').should('have.text', ' View Portfolios ')
                cy.verifyTextNotPresent(' Generate a Quick Proposal ')
                cy.verifyTextPresent('LifeYield Income+')
                cy.verifyTextNotPresent('LifeYield Portfolio+')
                cy.verifyTextNotPresent('LifeYield Social Security+')
                cy.verifyTextNotPresent('Social Security')
                break
            case 'Pro Yearly (P+ & I+)':
            case 'Pro Monthly (P+ & I+)':
                cy.log('Subscription: Pro Yearly (P+ & I+) and Pro Monthly (P+ & I+)')
                cy.verifyTextPresent("The Quick Proposal tool highlights the impact of taxes on an investment portfolio, using LifeYield's Taxficient Score®")
                cy.verifyTextPresent("Calculates the preferred sequence of withdrawals to minimize taxes, and recommends the most tax-efficient way to take income from investments.")
                cy.verifyTextPresent('LifeYield Income+')
                cy.verifyTextPresent('LifeYield Portfolio+')
                cy.verifyTextNotPresent('LifeYield Social Security+')
                cy.get('.two > :nth-child(1) > :nth-child(3)').should('have.text', ' Generate a Quick Proposal ')
                cy.get(':nth-child(1) > :nth-child(5)').should('have.text', ' View Portfolios ').as('P+ViewPortfolios')
                cy.get('.two > :nth-child(2) > .ui').should('have.text', ' View Portfolios ').as('I+ViewPortfolios')
                cy.verifyTextNotPresent('Social Security')
                break
            case 'Pro Yearly (P+ & SS+)':
            case 'Pro Monthly (P+ & SS+)':
                cy.log('Subscription: Pro Yearly (P+ & SS+) and Pro Monthly (P+ & SS+)')
                cy.verifyTextPresent("The Quick Proposal tool highlights the impact of taxes on an investment portfolio, using LifeYield's Taxficient Score®")
                cy.verifyTextPresent("Get the most out of your Social Security Benefit with Social Security+®")
                cy.verifyTextNotPresent("Calculates the preferred sequence of withdrawals to minimize taxes, and recommends the most tax-efficient way to take income from investments.")
                cy.verifyTextNotPresent('LifeYield Income+')
                cy.verifyTextPresent('LifeYield Portfolio+')
                cy.verifyTextPresent('LifeYield Social Security+')
                cy.get('.two > :nth-child(1) > :nth-child(3)').should('have.text', ' Generate a Quick Proposal ')
                cy.get(':nth-child(1) > :nth-child(5)').should('have.text', ' View Portfolios ').as('P+ViewPortfolios')
                cy.get('.two > :nth-child(2) > .ui').should('have.text', ' View Cases ')

                break
            case 'Pro Yearly (I+ & SS+)':
            case 'Pro Monthly (I+ & SS+)':
                cy.log('Subscription: Pro Yearly (I+ & SS+) and Pro Monthly (I+ & SS+)')
                cy.verifyTextNotPresent("The Quick Proposal tool highlights the impact of taxes on an investment portfolio, using LifeYield's Taxficient Score®")
                cy.verifyTextPresent("Get the most out of your Social Security Benefit with Social Security+®")
                cy.verifyTextPresent("Calculates the preferred sequence of withdrawals to minimize taxes, and recommends the most tax-efficient way to take income from investments.")
                cy.verifyTextPresent('LifeYield Income+')
                cy.verifyTextNotPresent('LifeYield Portfolio+')
                cy.verifyTextPresent('LifeYield Social Security+')
                cy.get('.two > :nth-child(1) > .ui').should('have.text', ' View Portfolios ').as('I+ViewPortfolios')
                cy.get('.two > :nth-child(2) > .ui').should('have.text', ' View Cases ')
                break
            default:
                cy.log('Subscription: Deluxe Yearly (P+ & I+ & SS+) and Deluxe Monthly Dashboard check (P+ & I+ & SS+)')
                cy.verifyTextPresent("The Quick Proposal tool highlights the impact of taxes on an investment portfolio, using LifeYield's Taxficient Score®")
                cy.verifyTextPresent("Calculates the preferred sequence of withdrawals to minimize taxes, and recommends the most tax-efficient way to take income from investments.")
                cy.verifyTextPresent("Get the most out of your Social Security Benefit with Social Security+®")
                cy.verifyTextPresent('LifeYield Income+')
                cy.verifyTextPresent('LifeYield Portfolio+')
                cy.verifyTextPresent('LifeYield Social Security+')
                cy.get('.three > :nth-child(1) > :nth-child(3)').should('have.text', ' Generate a Quick Proposal ')
                cy.get('.three > :nth-child(1) > :nth-child(5)').should('have.text', ' View Portfolios ')
                cy.get('.three > :nth-child(2) > .ui').should('have.text', ' View Portfolios ')
                cy.get('.three > :nth-child(3) > .ui').should('have.text', ' View Cases ')
                break;
        }
    }

    verifyProposalReportAccordingToSubscriptionType(subsTypeReport) {
        cy.log('Check the generate proposal analysis by subscription type')
        switch (subsTypeReport) {
            case 'P+ Yearly':
            case 'Pro Yearly (P+ & SS+)':
            case 'P+ Monthly':
            case 'Pro Monthly (P+ & SS+)':
                cy.verifyTextPresent('Annuity Analysis')
                cy.verifyTextPresent('Location Analysis')
                cy.verifyTextNotPresent('Withdrawal Analysis')
                break;
            case 'I+ Yearly':
            case 'Pro Yearly (I+ & SS+)':
            case 'I+ Monthly':
            case 'Pro Monthly (I+ & SS+)':
                cy.verifyTextNotPresent('Annuity Analysis')
                cy.verifyTextNotPresent('Location Analysis')
                cy.verifyTextPresent('Withdrawal Analysis')
                break;
            case 'Pro Yearly (P+ & I+)':
            case 'Pro Yearly (P+ & I+)':
            case 'Deluxe Yearly (P+ & I+ & SS+)':
            case 'Deluxe Monthly (P+ & I+ & SS+)':
                cy.verifyTextPresent('Annuity Analysis')
                cy.verifyTextPresent('Location Analysis')
                cy.verifyTextPresent('Withdrawal Analysis')
                break;
            default:
                break;
        }
    }

    verifyDisclosuresSubscriptionType(subsTypeDisclosures) {
        cy.log('Check disclosure fields according to subscription type')
        switch (subsTypeDisclosures) {
            case 'P+ Yearly':
            case 'P+ Monthly':
                cy.verifyTextPresent('Portfolio+™ Disclosures')
                cy.verifyTextNotPresent('Income+™ Disclosures')
                cy.verifyTextNotPresent('SocialSecurity+™ Disclosures')
                break;
            case 'I+ Yearly':
            case 'I+ Monthly':
                cy.verifyTextNotPresent('Portfolio+™ Disclosures')
                cy.verifyTextNotPresent('SocialSecurity+™ Disclosures')
                cy.verifyTextPresent('Income+™ Disclosures')
                break;
            case 'Pro Yearly (P+ & I+)':
            case 'Pro Monthly (P+ & I+)':
                cy.verifyTextPresent('Portfolio+™ Disclosures')
                cy.verifyTextPresent('Income+™ Disclosures')
                cy.verifyTextNotPresent('SocialSecurity+™ Disclosures')
                break;
            case 'Pro Yearly (P+ & SS+)':
            case 'Pro Monthly (P+ & SS+)':
                cy.verifyTextPresent('Portfolio+™ Disclosures')
                cy.verifyTextNotPresent('Income+™ Disclosures')
                cy.verifyTextPresent('Social Security+™ Disclosures')
                break;
            case 'Pro Yearly (I+ & SS+)':
            case 'Pro Monthly (I+ & SS+)':
                cy.verifyTextNotPresent('Portfolio+™ Disclosures')
                cy.verifyTextPresent('Income+™ Disclosures')
                cy.verifyTextPresent('Social Security+™ Disclosures')
                break;
            case 'SS+ Monthly':
                cy.verifyTextNotPresent('Portfolio+™ Disclosures')
                cy.verifyTextNotPresent('Income+™ Disclosures')
                cy.verifyTextPresent('Social Security+™ Disclosures')
                cy.get('#ssaDisclosures').should('exist')
                break
            default:
                cy.verifyTextPresent('Portfolio+™ Disclosures')
                cy.verifyTextPresent('Income+™ Disclosures')
                cy.verifyTextPresent('Social Security+™ Disclosures')
                break;
        }
    }

    verifySharedContentInModals(text) {
        cy.get('.content > :nth-child(1) > div > :nth-child(1)').should('have.text', 'Thanks for your interest in our ' + text + '.')
        cy.get('strong > a').should('have.attr', 'href', 'mailto:support@lifeyield.com').and('have.text', 'support@lifeyield.com')
        cy.verifyTextPresent('-The LifeYield Team')
    }



    verifySubscriptionFeatures(subscriptionType) {

        cy.ProductSubscriptionLogin(subscriptionType)
        if (subscriptionType === 'SS+ Monthly') {
            cy.verifyTextPresent('Settings')
            cy.verifyTextPresent('Support')
            cy.verifyTextNotPresent('Dashboard')
            cy.verifyTextNotPresent('Portfolios')
            cy.verifyTextNotPresent('Quick Proposal')
        } else {
            this.verifyDeluxeDashboardElements('9', '$6,300,000', '3', '$1,200,000', subscriptionType)
        }

        cy.log('Check Marketing resources according to subscription plan.')
        if (subscriptionType === 'Pro Yearly (P+ & SS+)' || subscriptionType === 'Pro Yearly (I+ & SS+)' || subscriptionType === 'Pro Monthly (P+ & SS+)' || subscriptionType === 'Pro Monthly (I+ & SS+)'
            || subscriptionType === 'Deluxe Yearly (P+ & I+ & SS+)' || subscriptionType === 'Deluxe Monthly (P+ & I+ & SS+)' || subscriptionType === 'SS+ Monthly') {
            cy.get('[href="' + Cypress.env('baseHREF') + 'socialSecurityCases"] > span').should('exist').and('have.text', 'Social Security')

            cy.verifyTextPresent('Marketing Resources')
            cy.log('Monthly subscription Market Resources modal check.')
            switch (subscriptionType) {
                case 'Pro Monthly (P+ & SS+)':
                case 'Pro Monthly (I+ & SS+)':
                case 'Deluxe Monthly (P+ & I+ & SS+)':
                case 'SS+ Monthly':
                    cy.clickToText('Marketing Resources')
                    cy.get('.small > .header').as('ASRequired').should('exist').and('have.text', 'Annual Subscription Required ')
                    cy.verifyTextPresent('What\’s included?')
                    cy.verifyTextPresent('To access these resources, you\’ll need to upgrade to an annual plan.')
                    cy.get('ul > :nth-child(1)').should('exist').and('have.text', 'Customizable, client-facing filing checklist')
                    cy.get('ul > :nth-child(2)').should('exist').and('have.text', 'Two-minute promotional video')
                    cy.get('ul > :nth-child(3)').should('exist').and('have.text', 'Interactive, lead-generating widget for your website')
                    this.verifySharedContentInModals('Social Security marketing resources')
                    cy.verifyTextPresent('Email us at support@lifeyield.com and let us know. We\’ll upgrade your subscription within 1 business day.')
                    cy.get('.ui > .close').click()
                    cy.get('@ASRequired').should('not.exist')
                    break;

                default:
                    cy.verifyTextPresent('Marketing Resources')
                    //No href no url check
                    break;
            }
        } else {
            cy.verifyTextNotPresent('Marketing Resources')
            cy.verifyTextNotPresent('Social Security')
        }

        cy.log('Setting menu check')
        cy.get('.title > .item').should('have.text', 'Settings').click()
        cy.get('.active > .mItem').should('have.text', 'General')
        cy.log('Settings elements check according to subscription')
        if (subscriptionType === 'SS+ Monthly') {
            cy.verifyTextNotPresent('Capital Market Assumptions')
            cy.verifyTextNotPresent('Securities')
            cy.verifyTextNotPresent('Targets')
            this.verifySSLayerFieldsPresent()
        } else {
            cy.log('LY.PA.S.G.24')
            cy.get('[href="' + Cypress.env('baseHREF') + 'capital-assumptions"] > .mItem').should('have.text', 'Capital Market Assumptions')
            cy.get('[href="' + Cypress.env('baseHREF') + 'securities"] > .mItem').should('have.text', 'Securities')
            cy.get('[href="' + Cypress.env('baseHREF') + 'targets"] > .mItem').should('have.text', 'Targets')

            cy.log('Verify settings page fields')
            cy.verifyLabel('Ordinary Income Tax Rate')
            cy.get('#incomeTaxRate').should('have.value', '35.00%')
            cy.verifyLabel('Capital Gains Tax Rate')
            cy.get('#capitalTaxRate').should('have.value', '15.00%')
            cy.verifyLabel('Investment Timeframe')
            cy.selectedTextInDropdownList(0, '10 Years')
            cy.verifyDropdownList(0, ['10 Years', '15 Years', '20 Years', '25 Years', '30 Years'])
            cy.get(':nth-child(4) > .four > .field > .ui')
            cy.verifyLabel('Capital Market Assumptions')
            switch (subscriptionType) {
                case 'P+ Yearly':
                case 'P+ Monthly':
                case 'I+ Yearly':
                case 'I+ Monthly':
                case 'Pro Yearly (P+ & I+)':
                case 'Pro Monthly (P+ & I+)':
                    cy.get(':nth-child(5) > .four > .field > .ui').selectedTextInDropdownList(1, 'LifeYield Level 1 (Locked)')
                    cy.get(':nth-child(5) > .four > .field > .ui').verifyDropdownList(1, ['LifeYield Level 1 (Locked)', 'LifeYield Level 2 (Locked)', 'Level 1 (Customizable)', 'Level 2 (Customizable)'])
                    this.verifySSLayerFieldsNotPresent()
                    break;
                default:
                    cy.get(':nth-child(6) > .four > .field > .ui').selectedTextInDropdownList(1, 'LifeYield Level 1 (Locked)')
                    cy.get(':nth-child(6) > .four > .field > .ui').verifyDropdownList(1, ['LifeYield Level 1 (Locked)', 'LifeYield Level 2 (Locked)', 'Level 1 (Customizable)', 'Level 2 (Customizable)'])
                    this.verifySSLayerFieldsPresent()
                    break;
            }
            cy.verifyLabel('Use Equivalents')
            cy.get('.react-toggle-track').as('EquivalentToggle').should('exist')
        }


        this.verifyDisclosuresSubscriptionType(subscriptionType)


        cy.log('Check only Asset location present at widget type dropdown')
        switch (subscriptionType) {
            case 'Pro Monthly (P+ & SS+)':
            case 'Pro Monthly (I+ & SS+)':
            case 'Pro Monthly (P+ & I+)':
            case 'Deluxe Monthly (P+ & I+ & SS+)':
            case 'P+ Monthly':
            case 'I+ Monthly':
            case 'SS+ Monthly':
                if (subscriptionType === 'SS+ Monthly') {
                    cy.get(':nth-child(2) > .mItem').should('not.have.attr', 'href', Cypress.env('baseHREF') + 'widgets').and('have.text', 'Widgets').click()
                } else {
                    cy.get(':nth-child(5) > .mItem').should('not.have.attr', 'href', Cypress.env('baseHREF') + 'widgets').and('have.text', 'Widgets').click()
                }
                cy.verifyTextPresent('To access this resource, you\'ll need to upgrade to an annual plan.')
                cy.verifyTextPresent('Email us at support@lifeyield.com and let us know. We`ll upgrade your subscription within 1 business day.')
                this.verifySharedContentInModals('website widget')
                cy.get('.ui > .close').click()
                break;

            default:
                cy.get('[href="' + Cypress.env('baseHREF') + 'widgets"] > .mItem').should('have.text', 'Widgets').click()

                cy.get('.primary').should('have.text', 'Add a Widget').click()
                cy.verifyTextPresent('Add Widget Host')
                cy.verifyTextPresent('Enter the host URL to be used in the widget')
                cy.verifyTextPresent('Url')
                cy.verifyTextPresent('Widget Type')
                if (subscriptionType === 'P+ Yearly' || subscriptionType === 'I+ Yearly' || subscriptionType === 'Pro Yearly (P+ & I+)') {
                    cy.selectedTextInDropdownList(0, 'Asset Location')
                    cy.verifyDropdownList(0, ['Asset Location'])
                    cy.verifyItemsNotInDropdownList(0, ['Social Security'])
                } else {
                    cy.selectedTextInDropdownList(0, 'Asset Location')
                    cy.verifyDropdownList(0, ['Asset Location', 'Social Security'])
                }
                cy.clickToText('Cancel')
                break;
        }


        if (subscriptionType != 'SS+ Monthly') {
            cy.log('Check Analysis of subscriptiontype')
            cy.get('@Portfolios').click()
            cy.get(':nth-child(1) > .show-tableCell-mobile').click()
            cy.get('[style="text-align: right;"] > .ui > .divider')
                .as('Gproposal')
                .should('have.text', 'Generate Proposal')
                .click()

            this.verifyProposalReportAccordingToSubscriptionType(subscriptionType)
        }

        cy.log('Check license of subscription')
        cy.get('.right > .dropdown > .text').click()
        cy.contains("Profile").click();
        cy.url().should(
            "eq",
            Cypress.env('frontendUrl') + "/profile"
        );


        switch (subscriptionType) {
            case 'P+ Yearly':
            case 'P+ Monthly':
                cy.verifyTextPresent('Basic (P+)')
                break;
            case 'I+ Yearly':
            case 'I+ Monthly':
                cy.verifyTextPresent('Basic (I+)')
                break;
            case 'Pro Yearly (P+ & I+)':
            case 'Pro Monthly (P+ & I+)':
                cy.verifyTextPresent('Pro (P+ & I+)')
                break;
            case 'Pro Yearly (P+ & SS+)':
            case 'Pro Monthly (P+ & SS+)':
                cy.verifyTextPresent('Pro (P+ & SS+)')
                break;
            case 'Pro Yearly (I+ & SS+)':
            case 'Pro Monthly (I+ & SS+)':
                cy.verifyTextPresent('Pro (I+ & SS+)')
                break;
            case 'Deluxe Yearly (P+ & I+ & SS+)':
            case 'Deluxe Monthly (P+ & I+ & SS+)':
                cy.verifyTextPresent('Deluxe')
                break;
            default:
                break;
        }

        cy.verifyTextPresent('Active')
        cy.verifyTextPresent('Licensed')
        cy.get('.text').click()
        cy.contains("Logout").click();
    }
}

export default Dashboard