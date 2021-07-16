# Teapot API 

All tasks necessary to complete the project

## Task 1 - Database structure

Design a structure to store the beverages, ingredients, orders.
It should allow for simple CRUD operations on those entities
There should be a settings option in the beverage for external stuff(ex: water temperature)
Some types of beverages can't be brewed
List queue of orders
List the past orders

## Task 2 - Classes


Structure all the classes necessary for the API, beverages, ingredients, order, stock 

### beverage
The beverages that can be brewed by the teapot, each one has a type of beverage (tea, coffee, etc whatever the user adds to the beveraType schema). Each beverage has a recipe that takes X ingredients and Y amount of each.
The beverage also has a settings field to add specific instructions.

### order
The order has a user, beverage, the size and a status. There should be a creation date as well. We should be able to see the status of the order, and see if it's active or completed and when it was completed.

### ingredient
The ingredient is the base of the beverages and is contained inside a stock, they are also verified when making orders to ensure a user can create an order successfully (enough ingredients). Each ingredient has a name, description and unit, the Unit could be used in the future to do conversions, for example

### stock
The stock is the storage for the ingredients used in the beverages. It's a really simple entry, just list the ingredients and it's current amount


## Task 3 - Services

Create the API services to provide answer to the features necessary using the previous completed classes/db schemas

List of minimum services required:

- Show stock
- Update beverage recipe
- Update beverage settings
- List beverages
- List beverage recipe
- List ingredients
- List orders
- List orders history (past orders)
- Order beverage
    
## Task 4 - Queue system

Arrange a system to do the orders, it should also verify if there are enough ingredients before accepting the order, it should take into account the currently queued beverages as well.



