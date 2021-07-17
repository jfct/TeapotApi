# API - Order


- [API - Order](#api---order)
    + [Create order](#create-order)
    + [Get order](#get-order)
    + [Get current active order list](#get-current-active-order-list)
    + [Get past orders](#get-past-orders)
    + [Complete an order](#complete-an-order)
    + [Cancel an order](#cancel-an-order)


### Create order
----
* **URL**
/orders/:beverage

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`

* **Data Params**
```
  {
	"size": "validSize" [String]
	"user": "username" [String]
	"extraIngredients": [
		{
			"name": "validIngredient" [String],
			"quantity: value [Number]
		},{
			"name": "validIngredient" [String],
			"quantity: value [Number]
		},
	]
  }
```
  

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [String]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`


### Get order
----



* **URL**
/orders/:id

 Shows a single order by id
 Shows the complete info

* **Method:**
  
  `GET`
  
*  **URL Params**
   `id=[String => mongoose.Type.ObjectId]`
   
* **Data Params**

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [JSON]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`


### Get current active order list
----

 List all the active orders
 Shows a simplified list of orders

* **URL**
/orders/

* **Method:**
  
  `GET`
  
*  **URL Params**

* **Data Params**
  

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [JSON]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Get past orders
----

 List the past completed orders
 Shows a simplified list of orders

* **URL**
/orders/past

* **Method:**
  
  `GET`
  
*  **URL Params**

* **Data Params**

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [JSON]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Complete an order
----
* **URL**
/orders/:id/complete

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[String => mongoose.Type.ObjectId]`

* **Data Params**

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [String]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Cancel an order
----
* **URL**
/orders/:id/cancel

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[String => mongoose.Type.ObjectId]`

* **Data Params**

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [String]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`
