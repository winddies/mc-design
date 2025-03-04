/* eslint-disable @typescript-eslint/no-require-imports */
/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-16 11:53:21
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-27 14:37:31
 * @FilePath: /mc-design/packages/mc-ui/src/docgen.ts
 * @Description: 自动生成组件的属性文档
 */

const docgen = require('react-docgen-typescript');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const options = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  shouldIncludePropTagMap: true,
  propFilter: (prop) => {
    console.log(prop);
    // 忽略所有继承的属性
    return !prop.parent.fileName.includes('node_modules');
  },
};

const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');

const parser = docgen.withCustomConfig(tsconfigPath, options);
const files = glob.sync('./src/components/**/*.tsx');

const components = parser.parse(files.filter((filePath: string) => filePath !== 'src/components/index.tsx'));

components.forEach((componentInfo) => {
  console.log('componentInfo', componentInfo);
  const outputPath = path.join(__dirname, '..', '..', 'apps/site', 'prop-docs', `${componentInfo.displayName}.md`);
  const docContent = generateMarkdown(componentInfo);

  fs.writeFileSync(outputPath, docContent);
  console.log(`${componentInfo.displayName}文档生成成功`);
  console.log(`${outputPath} 文件已生成`);
});

// 生成 Markdown 文档
function generateMarkdown(componentInfo) {
  const { displayName, description, props } = componentInfo;
  let markdown = `# ${displayName}\n\n${description}\n\n## Props\n\n`;

  // 表格头
  markdown += '| 属性 | 说明 | 类型 | 是否必填 | 默认值 |\n';
  markdown += '| ---- | ----------- | ---- | ---- | ---- |\n';

  for (const propName in props) {
    const prop = props[propName];
    markdown += `| ${propName} | ${prop.description} | ${prop.type.name}  | ${
      prop.required ? 'Yes' : 'No'
    }  | ${prop.defaultValue ? prop.defaultValue.value : '--'}\n`;
  }

  return markdown;
}
