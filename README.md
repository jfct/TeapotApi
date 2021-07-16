# Teapot API 

- Teapot API
  * [Introduction](#introduction)
    + [Main Entities](#main-entities)
    + [Secondary entities](#secondary-entities)
    + [Tech stack](#tech-stack)
  * [Instructions](#instructions)
  * [API documentation](#api-documentation)
  * [Tasks](#tasks)

## Introduction 

The project architecture was split in several main entities to accomodate all the features and even future ones that could be beneficial.

----

### Main Entities 

The main entities are: 

- Beverage


The beverages that can be brewed by the teapot, each one has a type of beverage (tea, coffee, etc whatever the user adds to the beveraType schema). Each beverage has a recipe that takes X ingredients and Y amount of each.
The beverage also has a settings field to add specific instructions.
Fields:
```
name
description
beverageType
recipe
settings
```

- Ingredient


The ingredient is the base of the beverages and is contained inside a stock, they are also verified when making orders to ensure a user can create an order successfully (enough ingredients). Each ingredient has a name, description and unit, the Unit could be used in the future to do conversions, for example
Fields:
```
name
description
unit
```

- Order


The order has a user, beverage, the size and a status. I also added a field of extra ingredients, which can be useful, example adding extra honey or adding extra green leaves when making a tea, any ingredient outside the base recipe. "Created" is the date of creation of the order.
The status object has the active (Order is active or not ), completed (Order was completed successfully) and completedAt(Date in which the order was completed) fields.
Fields:
```
user
beverage
extraIngredients
size
created
status
```

-Stock


The stock is the storage for the ingredients used in the beverages. It's a really simple entry, it's just an array with ingredients/quantity
Fields:
```
ingredients
```

----


### Secondary entities

- BeverageType


The type of beverage, this is used to filter out the types that can be brewed for example. It has a name, description and a boolean allowedToBrew field that if FALSE when making an order it will be rejected.
Fields:
```
name
description
allowedToBrew
```

- Size


The size of the order, it has 2 fields, name and multiplier. The multiplier will be used on the orders beverage recipe ingredients (extra ingredients wont be affected with this size multiplier). So if you have a beverage that needs 2 tea leaves and you ask for a LARGE size and the multiplier for the large is 2, then the order will add (base(2) * multiplier(2)) 4 leaves.
Fields:
```
name
multiplier
```

----


### Tech stack

The project was made using the following stack:

- NodeJS (server)
- Express.js (routing)
- MongoDB (DB) with Mongoose (Schemas)
- Mocha (tests) with Chai and Mongo-unit


----


## Instructions

In the root of the project we have the .env file that has all the configs for the server.

Servers variables 
1. SERVER_IP
2. SERVER_PORT
3. SERVER_DB_NAME
4. PORT
5. INITIALIZE_MONGO - that when set to 'YES' will run a small script to "intialize" the mongoDB schemas in the database.

----

## API documentation

The documentation can be found in the API.md file in the root of the project

- [Beverage](doc/APIbeverage.md)
- [Ingredient](doc/APIingredient.md)
- [Order](doc/APIorder.md)
- [Stock](doc/APIstock.md)

----

## Tasks 

[Tasks](T.md)

