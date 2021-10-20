`bundle add jsbundling-rails`

`./bin/bundle install`

`./bin/rails javascript:install:webpack`

`yarn add @apollo/client react react-dom graphql`

`rails g controller Library index --skip-routes`

`bin/dev`

`remove //= link_tree ../../javascript .js` from 'manifest.js'

`mkdir -p app/javascript/utils && touch app/javascript/utils/apollo.js`

secret: `yarn add -D prettier`

// `yarn add -D @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`
`yarn add -D babel-preset-react-app style-loader css-loader`

`touch '.babelrc'`

`add { "presets": ["react-app"] } to '.babelrc'`

`mkdir -p app/javascript/components/Library && touch app/javascript/components/Library/index.js`

`yarn add -D graphql-tag`

add `graphql-tag loader` to `webpack` config file

we are going to use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) here. It's supported by all evergreen browsers

we will use `useEffect` to store token

TODO: update npx create-gql-component or add 'resolve' to webpack.config
`import cs from './styles' -> `import cs from './styles.module.css';`

refetch me query using `refetch`
