# API - Stock


### Add an ingredient to stock
----
* **URL**
/stock/:ingredient

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `ingredient=[String]`

* **Data Params**
```
  {
	"value": value
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


### Get stock list
----
* **URL**
/stock/

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


### Get ingredient info from stock
----
* **URL**
/orders/:ingredient

* **Method:**
  
  `GET`
  
*  **URL Params**
   
   **Required:**
 
   `ingredient=[String]`
   
* **Data Params**
  

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [JSON]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Add quantity to an ingredient
----
* **URL**
/stock/:ingredient/add/:quantity

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `ingredient=[String]`
   
   `quantity=[Number]`

* **Data Params**

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [String]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Remove quantity from an ingredient on stock
----
* **URL**
/stock/:ingredient/remove/:quantity

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `ingredient=[String]`
  

* **Data Params**

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [String]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Remove an ingredient from the stock
----
* **URL**
/stock/:ingredient

* **Method:**
  
  `DELETE`
  
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
