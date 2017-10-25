import map from 'lodash/map'
import reduce from 'lodash/reduce'
import startCase from 'lodash/startCase'

function getPatternsPages() {
  const patternsContext = require.context('../patterns', false, /()*.md$/)
  const allpatternsMDFiles = patternsContext.keys()

  const patterns = allpatternsMDFiles.map(function(patternName) {
    return patternName.replace('./', '').replace('.md', '')
  });

  return patterns
}

function getElementsComponents() {
  const elementsContext = require.context('vtex.onda/packages/onda/src', true, /()*.js$/)
  const allElementsJSFiles = elementsContext.keys()

  const elements = reduce(allElementsJSFiles, (memo, filePath) => {
    const filePathSplit = filePath.split('/')
    const isAnElement = filePathSplit.length >= 3
    const isAlreadyAdded = isAnElement && memo.indexOf(filePathSplit[1]) !== -1
    return isAlreadyAdded || isAnElement === false
      ? memo
      : memo.concat([filePathSplit[1]])
  }, [])

  return elements
}

function getComponentsComponents() {
  const componentsContext = require.context('vtex.onda/packages', true, /\/onda-[^/]+\/src\/[^/]+.js$/)
  const allComponentsJSFiles = componentsContext.keys()

  const components = reduce(allComponentsJSFiles, (memo, filePath) => {
    const packageName = filePath.split('/')[1]
    const isAlreadyAdded = memo.indexOf(packageName) !== -1
    return isAlreadyAdded
      ? memo
      : memo.concat([packageName])
  }, [])

  return components
}

const elements = getElementsComponents()
const components = getComponentsComponents()
const patterns = getPatternsPages()

export default {
  en: [

  ],
  pt: [
    {
      name: 'Design Principles',
      href: '/principles',
    },
    {
      name: 'How-to',
      children: [
        {
          name: 'Instalação',
          href: '/howto/first-steps',
        },
        {
          name: 'Grid System',
          href: '/howto/grid-system',
        },
      ],
    },
    {
      name: 'Elements',
      children: map(elements, (name) => ({
        name: startCase(name),
        href: '/elements/' + startCase(name).replace(' ', ''),
      })),
    },
    {
      name: 'Componentes',
      children: map(components, (name) => ({
        name: startCase(name).replace('Onda ', ''),
        href: '/components/' + name,
      })),
    },
    {
      name: 'Patterns',
      children: map(patterns, (name) => ({
        name: startCase(name).replace('-', ' '),
        href: '/patterns/' + name,
      })),
    },
  ],
}
