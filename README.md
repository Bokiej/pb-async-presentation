# Prerequisites

1. Install node and npm from https://nodejs.org/en/download/
2. Install git or check if is available by writing in command line:
> git --version

3. Install SFDX CLI from https://developer.salesforce.com/tools/sfdxcli
4. Insall presentation app by writing in command line:
> npm install

5. Highly recomand to install lwc-dev-server SFDX plugin from https://www.npmjs.com/package/@salesforce/lwc-dev-server?activeTab=readme by writing in command line
> sfdx plugins:install @salesforce/lwc-dev-server

If error occurs:

> Check out https://github.com/nodejs/node-gyp#on-windows and install all necessary elements from 'On Windows' section or check error logs during instalation

Install node-gyp from command line:
> npm install -g node-gyp

Try to install lwc-dev-server again by writing first command from #5.

You can start local server by choosing 'SFDX: Open Local Development Server' in vscode or write in command line:
>sfdx force:lightning:lwc:start

and go to the http://localhost:3333/

# RUN PRESENTATION

To run presentation after installation write in command line:
>npm start

# RUN LOCAL DEVELOPMENT SERVER
To run Local Development Server after installation use shortcut in command line by writing:
>npm run serve
# SECTION BRANCHES

| Branch             | Section name                                                               |
|--------------------|----------------------------------------------------------------------------|
|async-0-1-1 / master|Introduce                                                                   |
|async-1-1-1         |What is Promise?                                                            |
|async-2-1-1         |How JavaScript Engine works?                                                |
|async-3-1-1         |How single bulb works in project?                                           |
|async-3-2-1         |Does the location of the Promise methods matters?                           |
|async-3-2-2         |then() method                                                               |
|async-3-3-1         |Promise catch() method                                                      |
|async-3-3-2         |Promise catch() 1 error                                                     |
|async-3-3-3         |Promise catch() 2 errors, 2 catch                                           |
|async-3-3-4         |then(...,onReject) method                                                   |
|async-3-4-1         |finally() method                                                            |
|async-3-4-2         |How to use finally() and loader?                                            |
|async-4-1-1         |t's impossible to predict the sequence                                      |
|async-4-2-1         |Promise.all()                                                               |
|async-4-2-2         |Promise.all() error                                                         |
|async-4-2-3         |How refactor this code to be more modern JS?                                |
|async-4-2-4         |Promise.all() desctructuring                                                |
|async-4-3-1         |Promise.allSettled()                                                        |
|async-4-3-2         |Promise.allSettled() error                                                  |
|async-4-3-3         |Promise.allSetled() error catch                                             |
|async-4-4-1         |Promise.race()                                                              |
|async-4-4-2         |Promise.race() error                                                        |
|async-4-5-1         |Promise.any()                                                               |
|async-4-5-2         |Promise.any() all errors                                                    |
|async-4-6-1         |Run Promises one after another                                              |
|async-4-6-2         |Run Promises one after another error                                        |
|async-4-7-1         |Promise.resolve() and Promise.reject()                                      |
|async-5-1-1         |Whats about @wire?                                                          |
|async-6-1-1         |Case study 1 know when @wire and Apex callback resolve then do something    |
|async-6-2-1         |Case study 2 when LWC component don't want to rerender values               |
|async-6-2-2         |Case study 2 How force LWC to get data after HTML rerender setTimeout()     |
|async-6-2-3         |Case study 2 How force LWC to get data after HTML rerender Promise.resolve()|
|async-6-2-4         |Case study 2 How force LWC to get data after HTML rerender then()           |
|async-6-3-1         |Case study 3 many checkboxes, many queries                                  |
|async-6-4-1         |Case study 4 singleton for Promise                                          |