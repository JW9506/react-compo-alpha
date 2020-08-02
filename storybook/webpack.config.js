const path = require('path')
module.exports = ({ config }) => {
  config.module.rules = config.module.rules.filter((obj) => {
    return (
      obj.test.toString() !== '/\\.(js|mjs|jsx|ts|tsx)$/' ||
      obj.enforce !== 'pre'
    )
  })
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop) => {
            if (prop.parent) {
              return !prop.parent.fileName.includes('node_modules')
            }
            return true
          },
        },
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
