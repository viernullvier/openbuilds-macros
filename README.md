# openbuilds-macros
Collection of JS macros for OpenBuilds CONTROL

## Macros

See individual `README.md` files in each macro folder.

## Installing

**Automatic:** In OpenBuilds CONTROL, choose `Import JSON Macro` and select `$MACRO.json` in the specific subfolder.

**Manual:** In OpenBuilds CONTROL, choose `Create New Macro`, select `Javascript` and paste the content of the macro subfolder's `index.js` into the text area. *Note:* You probably need to select `Run Macro on startup` for most of the macros to work - see the macro's `README.md` file.

## Development

Run `yarn build` to sync each macro's JSON file with the `index.js` source file [TODO: Typescript].
The build script will automatically `git add` the corresponding JSON file for each `index.js` that's staged for commit.
Run `yarn install` to set up a pre-commit hook that runs the build script automatically before each commit. This will ensure that the macro JSON files will always stay in sync with their corresponding `index.js` files.

## Other macros

Here are more macros that I've found useful:

- [Hole Milling](https://github.com/poWer4aiX/ob-hole-milling-macro) by @poWer4aiX
- [Linear Cut](https://github.com/poWer4aiX/ob-linear-cut-macro) by @poWer4aiX
- [Laser Test Pattern](https://openbuilds.com/threads/getting-started-with-javascript-macros-in-control-library-of-macros-created-by-the-community.15880/#post-134467) by Misterg [TODO: Add my modified version to this repo after cleaning it up and creating a UI]

Make sure to check out the [OpenBuilds forum macro thread](https://openbuilds.com/threads/getting-started-with-javascript-macros-in-control-library-of-macros-created-by-the-community.15880/)!
