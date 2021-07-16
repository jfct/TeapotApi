# API - Order


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
	"size": a size value ex: "small"[String]
	"user": username[String]
	"extraIngredients": [
		{
			"name": an ingredient name [String],
			"quantity: 2
		},{
			"name": an ingredient name [String],
			"quantity: 10
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
