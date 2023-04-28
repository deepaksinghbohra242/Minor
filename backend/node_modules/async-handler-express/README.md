# Async Handler

This Package is to handle the async API response.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install async-handler-express.

```bash
npm install async-handler-express
```

## Add Middleware in root file

```python
const { errorHandler }=require('async-handler-express');

#use this middleware after including routes in the app root/server file.
app.use(errorHandler);

```

## Usage

```python
const { catchAsync }=require('async-handler-express');

app.get('/',catchAsync(async()=>{
     await Promise.resolve();
}));

```

### Example

```python
#Fetch users data from jsonplaceholder fake apis 
const { catchAsync }=require('async-handler-express');

router.get('/users',catchAsync(async()=>{
     const users = await fetch("https://jsonplaceholder.typicode.com/users");
     return users;
}));

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
