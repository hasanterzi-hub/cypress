const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/plugin');
const fs = require('fs-extra');
const moment = require('moment')

module.exports = defineConfig({
  projectId: 'xenf4y',
  e2e: {
    parseSpecialCharSequences: true,
    experimentalFetchPolyfill: true,
    trashAssetsBeforeRuns: true,
    chromeWebSecurity: false,
    video: false,
    env: {
      baseHREF: '/ssa19/pa/',
      frontendUrl: 'https://<app-aws-qa.***.com/>ssa19/pa',
      backendUrl: 'https://pa-backend-ssa19-app-aws-qa.***.com',
      devIdP: 'https://dev-aws.***.com/',
      devAWSPA: 'AWS - QA19 - ProposalAdvantage',
      devAWSPI: 'AWS - QA19 - PlanImplementation',
      devAWSTSW: 'AWS - QA19 - TaxSmartWithdrawal',
      devIdpPlans: 'https://dev-aws.***.com/Plan'
    },
    pageLoadTimeout: 45000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotOnRunFailure: true,
    downloadsFolder: 'cypress/downloads',
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      on('task', {
        readdir(folderPath) {
          return new Promise((resolve, reject) => {
            fs.readdir(folderPath, (err, files) => {
              if (err) {
                reject(err);
              } else {
                // Map the file names to include their full paths
                const fileDetails = files.map((file) => {
                  const filePath = path.join(folderPath, file);
                  return { name: file, path: filePath };
                });
                resolve(fileDetails);
              }
            });
          });
        },
      });

      on('task', {
        downloads: (downloadspath) => {
          return fs.readdirSync(downloadspath)
        }
      }),
      on('task', {
        deleteFolder(folderName) {    
          return new Promise((resolve, reject) => {
            fs.rm(folderName, { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                console.error(err)
                return reject(err)
              }
              resolve(null)
            })
          })
        },
      })
        getCompareSnapshotsPlugin(on, config)
    }
  },
});
