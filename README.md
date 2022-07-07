# Prerequisites

1. Install node and npm from https://nodejs.org/en/download/
2. Install git or check if is available by writing in command line:
> git --version

3. Install SFDX CLI from https://developer.salesforce.com/tools/sfdxcli
4. Insall presentation app by writing in command line:
> npm install

5. Highly recomand to install lwc-dev-server SFDX plugin from https://www.npmjs.com/package/@salesforce/lwc-dev-server?activeTab=readme by writing in command line
> sfdx plugins:install @salesforce/lwc-dev-server

If error occures:

> Check out https://github.com/nodejs/node-gyp#on-windows and install all necessary elements from 'On Windows' section or check error logs during instalation

Install node-gyp from command line:
> npm install -g node-gyp

Try to install lwc-dev-server again by writing first command from #4.

You can start local serwer by choosing 'SFDX: Open Local Development Server' in vscode or write in command line:
>sfdx force:lightning:lwc:start

and go to the http://localhost:3333/