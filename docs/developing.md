The VTEX team welcomes and thanks you for developing with us. We are committed in provide the best developer experience through consistency and quality of our guidelines. We are open and appreciate all the feedbacks, tips and ideas to keep this experience the best as possible. Bellow we describe the way we work and the best practices.

#### How to run the project

Before start, we must distinguish between our two type of developers who use our styleguide:

- **Those who develop in the VTEX IO**: They need understand how the use our components through our platform. If you are curious and want to know more about our web platform, [see here](https://help.vtex.com/tracks/vtex-io-getting-started--2qYWraccosS2ayg2kusaUo/1LSy4Gkvo4saEQa2OMqC4q)
- **Other developers**: Those who thoughts that our components incredible and want to use them in their own projects.

##### VTEX IO apps

Add the styleguide to dependencies on `manifest.json`:

```sh noeditor static
"dependencies": {
  "vtex.styleguide": "9.x"
},
```

Importing components:

```js noeditor static
import { Button } from 'vtex.styleguide'
```

And to run, just do as in any other VTEX App, execute the command:

```sh noeditor static
vtex link
```

To learn more about how to link apps in your workspace, [see here](https://help.vtex.com/tracks/vtex-io-getting-started--2qYWraccosS2ayg2kusaUo/1dEVfBkRxoO62i0Ge6mYoG).

##### Other projects

Use your favorite package manager to add the styleguide in your dependencies.

```sh noeditor static
yarn add @vtex/styleguide
# or
npm install @vtex/styleguide
```

Importing components:

```js noeditor static
import Button from '@vtex/styleguide/lib/Button'
```

And now, you can run your project like you always do.

#### PRs and Code Review

:loudspeaker: **Disclaimer:** In the course of this document we assume that you know how to use the basics of git as well like do a commit, rebase and merge. Before open a PR, read the [designing section](./designing.md) and take some minutes thinking if your change is appropriate to our styleguide.

As we know, a Pull Request let you tell to others about changes you have pushed to a branch in a GitHub Repo. So, to avoid confusion when we discuss with you your changes, it's convenient to talk how we create our branches and make our commits. We strongly recommend that you follow our standard. Your PR will be accepted if you have two positive signs in the reviews made by VTEX team members.

##### Branch

As in many project the `master` branch must reflect what is running in production. All the development branches must be synchronized with the master through `git rebase` command.

Theses development branches, also called feature branches, has the aim to add a new funcionality or do a fix. The name convention must follow the pattern: `<type>/<some-description>`

The allowed types are:

- **feature**: Add a new funcionality or behavoir
- **fix**: Bug correction
- **update**: Dependency update

The description needs to be shortly and follow the kebab-case pattern.

```
Ex: `git checkout -b feature/nice-new-thing`
```

Now, that you already open a new branch from `master`, let see how the commits should be.

##### Commits

The commit messages must be written in the English language and follow the following template:

```
<Imperative verb> <object of action>
```

Heres a set of examples:

- Add Facebook Plus as a new login method
- Remove unused dependecy
- Update es.json file

If you are close a issue in the commit you must add the `Fix #<Issue Number>` in commit's body, like:

```
<Imperative verb> <object of action> <--- Commit's title
                                     <---  Blanck line
Fix #<Issue number>                  <--- Commit's body
```

What not to do:

- Put a dot at the end of the sentence. Ex: "Update React Router."
- Start with lowercase letter
- Referencing issue number in commit's title

After read theses few lines you are ready to contribute with us through your PR!

#### Releases and changelog

To keep every change traceable, we use the [releasy](ttps://www.npmjs.com/package/releasy) projects versioning tool which helps to change the versioning of the project in `manifest.json` and create a commit with a version tag.

In parallel to this each PR should update the `CHANGELOG.md` file according to the format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). The change messages must follow the template:

```
<Imperative verb> <object of action>
```
