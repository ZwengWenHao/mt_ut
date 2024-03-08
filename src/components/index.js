const requireComponent = require.context("./", true, /.(vue)$/);

var fileArr = [];
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    let compName = fileName.split("/")[fileName.split("/").length - 1].split(".")[0];
    if (componentConfig.default) {
        fileArr.push({
            name: compName,
            compnent: componentConfig.default,
        });
    }
});
export default fileArr;
