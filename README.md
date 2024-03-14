# Euterpe Repository

This repository houses the different components of the Euterpe project, managed as a monorepo using Turborepo.

## Structure

The monorepo is organized into several repositories under the `apps` and `packages`:

- `apps/docs`: an example [Next.js](https://nextjs.org/) app for reference
- `apps/web`: The Euterpe frontend built with [Next.js](https://nextjs.org/).
- `apps/scheduler`: The Euterpe scheduler built with [Croner](https://croner.56k.guru/).
- `apps/api`: The Euterpe api built with [Fastify](https://fastify.dev/).
- `apps/hardhat`: Blockchain and Solidity development for the Euterpe project using [Hardhat](https://hardhat.org/).
- `packages/ui`: A stub React component library shared by the frontend and mobile applications.
- `packages/eslint-config-custom`: Custom `eslint` configurations for the project.
- `packages/tsconfig`: Shared TypeScript configurations used across the monorepo.

All code within this monorepo is written in [TypeScript](https://www.typescriptlang.org/).

## Setup and Development

1. Clone the project:

```bash
git clone https://github.com/Tolu1/euterpe.git
```

2. Navigate to the root of the monorepo:

```sh
cd euterpe
```

3. Install dependencies:

```sh
npm install
```

4. To work on a specific app, navigate to its directory under `apps` and start the app. For example, for the mobile app:

```sh
cd apps/native
npm run dev
```

Note: if you wish to run all apps in the repo, go to the root directory and run:

```sh
npm run dev
```

## Contributing

We follow a standard Git workflow for contributions:

1. Ensure you are on the `develop` branch:

```sh
git checkout develop
```

2. Create a new branch for your feature or bugfix:

```sh
git checkout -b feature/my-new-feature
```

3. Make your changes, commit them, and push your branch to the remote repository:

```sh
git add .
git commit -m "Add my new feature"
git push origin feature/my-new-feature
```

4. Open a pull request from your branch to the `develop` branch for review.

## Useful Links

- [Turborepo Documentation](https://turbo.build/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/docs)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
