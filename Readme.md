## About

Many times time comes when the language we are using to write the frontend does not provide a proper support for parsing files in an optimized manner. This server comes to solves this. Upload the files to the server and get the parsed output as a response.

### Supported format

Now only `csv` and `xlsx` files are supported.

## Getting Started

```
git clone https://github.com/Shubhrajyoti-Dey-FrosTiK/parse.git
```

```
cd parse
```

```
yarn install
```

```
yarn start
```

Now the server will be running at PORT 5001

## Usage

Upload files from the frontend as a form to the respective paths and get the parsed output as a response

`${BASE_PATH}/csv` for csv files

`${BASE_PATH}/xlsx` for xlsx files

Here `${BASE_PATH}` will be `http://localhost:5001` and if you deploy the server it should be the url of the deployment.

The name of the form element containing the file should be `files`
