#!/usr/bin/env node

const fs = require("fs");

const path = require("path");

const utils = require('./baseCreate.js')

const appJson = require("../examples/app.json");

function createPackageComponent() {
  const pathSrc = path.resolve(utils.packagesPath, utils.componentName);
  const result = utils.createDir(pathSrc);
  if (result) {
    const flag = utils.createPackagesFile(pathSrc);
    if (flag) {
      createExampleComponent();
    }
  }
}

function createExampleComponent() {
  const pathSrc = path.resolve(
    utils.examplePath,
    "./pages/component",
    utils.componentNameLine
  );
  const result = utils.createDir(pathSrc);
  if (result) {
    const flag = utils.createExampleFile(pathSrc);
    if (flag) {
      appJson.pages.push(`pages/component/${utils.componentNameLine}/index`);
      appJson.usingComponents[
        `lin-${utils.componentNameLine}`
      ] = `/dist/${utils.componentName}/index`;
      fs.writeFileSync(
        path.resolve(utils.examplePath, "./app.json"),
        JSON.stringify(appJson, null, 2)
      );
      console.log(`${utils.componentName}组件创建成功`);
    }
  }
}

createPackageComponent();

