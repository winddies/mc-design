/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-16 11:53:21
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-16 11:53:26
 * @FilePath: /mc-design/packages/mc-ui/src/docgen.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const docgen = require("react-docgen-typescript");
const fs = require("fs");
const path = require("path");

const options = {
  savePropValueAsString: true,
};

const parser = docgen.withCustomConfig("./tsconfig.json", options);

const components = parser.parse("./src/**/*.tsx");

components.forEach((component) => {
  const outputPath = path.join(
    __dirname,
    "..",
    "..",
    "site",
    "docs",
    `${component.displayName}.md`
  );
  const docContent = `
# ${component.displayName}

${component.description}

## Props
${Object.keys(component.props)
  .map((propName) => {
    const prop = component.props[propName];
    return `
### ${propName}
${prop.description || ""}

- **Type**: ${prop.type.name}
- **Required**: ${prop.required ? "Yes" : "No"}
- **Default**: ${prop.defaultValue ? prop.defaultValue.value : "N/A"}
`;
  })
  .join("\n")}
  `;

  fs.writeFileSync(outputPath, docContent);
});
