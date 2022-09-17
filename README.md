# Advanced-Authentication

#### Algorithms:

* In registration it takes only email password.
* If user is already registered , user can't register twice with same email id.
* We encrypted the password to keep safe information in our database.
* On successfull registration we strore that email and encrypted password to our database.
* You can't login without register , it gives you a message that user not found.
* You can't login without correct password . it will gives messege like - invalid creds(credential).
* If everything provided by the user it will messege login successful.

#### Accept fields: (key names for storing to database):
* email ---> for email,
* password ---> for password .

#### Installation 

```
npm i express nodemon mongoose dotenv jsonwebtoken bcrypt

```



