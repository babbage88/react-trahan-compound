# Trahan Compound Interest

This is a simple compound interest calculator that I built in React. I copied some of the components and main App.css from this repo, since I'm not well versed in frontend and do mostly backend and C#/.Net in my day job: https://github.com/jamezmca/compound-calc which itself was made as React beginner project. I did this to help learn react/frontend for some side projects. I want to create an expanded financial planning/wealth management app that will utilize various public API's and will probably rebuild all components from scratch.

## Typescript and future changes

I have migrated the main app component from jsx to .tsx and changed NumericInput (so I didn't have to use ParseInt() on a string to do cacluations) component to TypeScript. I plan to convert all components of the app to TypScript eventually, but for now will focus on the UI and better features like custom asset allocation, historical equity data, and future forcasting. I will probably eventually do this via a proper backend webapi in a language that is better suited for such a task than JS/TS, like C#, Go, Java, or basically anything else. Although, just for the fun of learning more js/ts, I may try building a cheap to host version that does as much as I feasibly can in the client side, so that I can host from an S3 buckket cheaply.

Thanks for coming to my TED talk.
