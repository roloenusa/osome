# server

The server is written on
[ExpressJS](https://expressjs.com/), and should be a REST
API. There won't be views served, but it's possible that
assets, such as manifests, images, etc may still need to
be served.

Responses should be in JSON format whenever possible.

## Packages Used

* Model creation and maintenance: [MongooseJS](https://mongoosejs.com/)

* Auth using Google and JWT

* Image manipulation: [Sharp](https://sharp.pixelplumbing.com/)

* Image Storage in AWS: [AWS-SDK](https://github.com/aws/aws-sdk-js-v3#getting-started)

* Form Multipart Handling: [Multer](https://www.npmjs.com/package/multer)

# Setup

## Node

The project currently runs on Node 12.

Instructions can be found here: https://formulae.brew.sh/formula/node@12

**brew**
```bash
brew install node@18

# Note: After this, you may need to update your PATH. Keep an eye on the output of brew.
# Example Output:
# If you need to have node@12 first in your PATH, run:
#  echo 'export PATH="/usr/local/opt/node@12/bin:$PATH"' >> ~/.zshrc
```

## Database

We're using MongoDB.

#### Database Explorer

To explore it, you can use the **Robot 3T** application:

https://robomongo.org/download

# Extensions

## VS Code Extensions

* [ESLint ](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
* [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

# Running the Project

## Install Dependencies

```bash
# From within the server directory
npm install
```

Additionally, the project runs a local dockerfile to minimize the installation requirements and ensure cross system compatibility.

## Project Configurations

Create a `local.json` file inside the config folder:

```json
{
    "oauth": {
        "google": {
            "client_id": "<google client id>",
            "client_secret": "<google client secret>",
            "callback_url": "http://localhost:3001/google/callback"
        }
    }
}
```

Credentials can be found in the [Google App](https://console.cloud.google.com/apis/credentials).

## Startup

> Scripts can be found in the `package.json` file

Normal startup

```bash
docker-compose up --build
```

Application then runs on http://localhost:3001 by default.
The port can be changed overriding the `local.json` file,
however, any client will also need to be updated.

To test that things are running correctly, navigate to your [local oath link](localhost:3001/google/oauth) and after you select an account, you should see a log in your console that your account was created.
