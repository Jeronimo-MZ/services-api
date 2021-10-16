# Services API

<center>

[![Node CI](https://github.com/Jeronimo-MZ/services-api/actions/workflows/ci.yaml/badge.svg)](https://github.com/Jeronimo-MZ/services-api/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/Jeronimo-MZ/services-api/branch/main/graph/badge.svg?token=LK7XP88Q29)](https://codecov.io/gh/Jeronimo-MZ/services-api)
[![Mutation Testing](https://github.com/Jeronimo-MZ/services-api/actions/workflows/mutation-testing.yaml/badge.svg)](https://github.com/Jeronimo-MZ/services-api/actions/workflows/mutation-testing.yaml)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FJeronimo-MZ%2Fservices-api%2Fmain)](https://dashboard.stryker-mutator.io/reports/github.com/Jeronimo-MZ/services-api/main)

</center>

# About

An API to manage Services Provided to Customers made using the good practices of Software Development.

# Getting Started

## Installation

You need to install **[Node.js](https://nodejs.org/)** and **[Yarn](https://yarnpkg.com/)** first, Then you can download this repository or clone it running this command in your terminal:

```sh
git clone https://github.com/Jeronimo-MZ/services-api.git
```

Or, if you want to use SSH , clone this repository running:

```sh
git clone git@github.com:Jeronimo-MZ/services-api.git
```

Then install the project dependencies running:

```sh
yarn install
```

## Run project

Before running the project you should start a [MongoDB](https://www.mongodb.com) server locally.
If you want to use a remote MongoDB server, set the **MONGO_URL** environment variable

Then you can start the development server running the following command:

```sh
yarn dev
```

Or compile the code and run the js code

```sh
# compile the code
yarn build
# start server
yarn start
```

## Tests

This project is covered by tests, if you make any changes to the code, you can execute them using the following commands:

```sh
# to run Unit Tests
yarn test:unit

# to run Integration Tests
yarn test:integration

# to run all tests
yarn test

# to run all tests with more details
yarn test:verbose

# to run all tests and generate coverage reports
yarn test:ci
```

You can also run mutation tests using stryker using this command:

```sh
yarn test-mutation
```

**WARNING:** Mutation tests are much slower than the others and can slow down your computer, i recommend you to close other programs before running them.

# Author

👤 **Jerónimo Matavel**

-   Github: [@Jeronimo-MZ](https://github.com/Jeronimo-MZ)
-   LinkedIn: [@jeronimo-matavel](https://linkedin.com/in/jeronimo-matavel)

# 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jeronimo-mz/services-api/issues).

# Show your support

Give a ⭐️ if this project helped you!

# 📝 License

Copyright © 2021 [Jerónimo A. Matavel Jr.](https://github.com/jeronimo-mz).<br />
This project is [MIT](./LICENSE) licensed.

<center>

Made with 💜 by [Jerónimo Matavel](https://linkedin.com/in/jeronimo-matavel)🚀

</center>
