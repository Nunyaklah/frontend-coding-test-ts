# Frontend Coding Challenge

Clone this repo, run `npm install` and start the project using `npm run dev`.
The instructions for completing the task can be found in the site that will launch.

## Additional Hints

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


# Important

# Running the application

## Overview

This is a simple feature that shows you a list of items in a shop and allows you to view details. I implemented authentication so a user has to get authenticated before they can view items in the shop.

## To Run

1. Run `npm install`
2. Create a `db.json` file  in the root and 
3. Add a users collection:
```
{
  "users": []
}
```

4. Run `json-server db.json -m ./node_modules/json-server-auth`

5. Create a `.env` folder in the root and copy over the text configuration in `.env.example` and paste it in `.env` . This step is important because it has the base URL!

6. Run `npm run dev`

7. Enjoy


## A video showing what the application looks like in case there are installation challenges. Always available to help!!


https://github.com/Nunyaklah/frontend-coding-test-ts/assets/20068694/cc0c984d-cbb6-49c6-b514-2a1577709edb



