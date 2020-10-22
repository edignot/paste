const path = require('path');
const {getRepoPackages} = require('../../../../tools/utils/getRepoPackages');
const {writeToFile} = require('../../../../tools/utils/writeToFile');

async function generatePackageExportsMap() {
  // Object to store all the generated mappings for our codemod
  const mapping = {};

  // Get all Paste packages
  const allPastePackages = await getRepoPackages();

  // For each package in Paste:
  allPastePackages.forEach(({name, location}) => {
    // Only include core packages but not the core-bundle package
    if (!location.includes('/paste-core/') || location.includes('/paste-core/core-bundle')) return;

    // convert package name to core name
    const corePackageName = `@twilio-paste/core/${name.split('/')[1]}`;

    // Get the package's exported values to be mapped
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const packageExports = require(name);

    // Now we create a mapping for every export to the core-bundle unbarreled package
    Object.keys(packageExports).forEach(packageExportName => {
      mapping[packageExportName] = corePackageName;
    });
  });

  // Write to disk
  writeToFile(path.join(__dirname, 'mappings.json'), mapping, {
    successMessage: 'Wrote core packages export mapping to mappings.json file!',
    errorMessage: 'Could not generate mappings!',
    formatJson: true,
  });
}

generatePackageExportsMap();
