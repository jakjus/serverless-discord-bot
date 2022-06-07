require('dotenv').config()
const path = require('path');
const { yamlParse, yamlDump } = require('yaml-cfn');
const { templateResource } = require('./misc/templates');

const fs = require('fs');

const main = () => {
  const baseTemplateRaw = fs.readFileSync(path.join(__dirname, 'misc', 'base_template.yaml'), 'utf8')
  const baseTemplate = yamlParse(baseTemplateRaw)

  const modulesPath = path.join(__dirname, '..', 'src', 'modules')

  let template = baseTemplate
  const modules = fs.readdirSync(modulesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

  for (const module of modules) {
    const commands = fs.readdirSync(`${modulesPath}/${module}`)
    for (const command of commands) {
      const { data } = require(`${modulesPath}/${module}/${command}`)
      const toFirstUpper = w => w.charAt(0).toUpperCase() + w.slice(1)
      let resourceName = `${module}-${command}`.split(/\W/g).map(w => toFirstUpper(w)).join('')
      template.Resources[resourceName] = templateResource(module, command, data.name)
    }
  }

  template.Resources.proxyFunction.Properties.Environment.Variables['PUBLIC_KEY'] = process.env.PUBLIC_KEY

  fs.writeFileSync(path.join(__dirname, '..', 'template.yaml'), yamlDump(template), 'utf-8')
  console.log('File template.yaml generated successfully.')
  return
}

main()
