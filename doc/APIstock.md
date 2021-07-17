# API - Stock


- [API - Stock](#api---stock)
    + [Add an ingredient to stock](#add-an-ingredient-to-stock)
    + [Get stock list](#get-stock-list)
    + [Get ingredient info from stock](#get-ingredient-info-from-stock)
    + [Add quantity to an ingredient](#add-quantity-to-an-ingredient)
    + [Remove quantity from an ingredient on stock](#remove-quantity-from-an-ingredient-on-stock)
    + [Remove an ingredient from the stock](#remove-an-ingredient-from-the-stock)


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
	"quantity": value [Number]
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
/stock/:ingredient/add

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `ingredient=[String]`
   
   `quantity=[Number]`

* **Data Params**

```
  {
	"quantity": value [Number]
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

### Remove quantity from an ingredient on stock
----
* **URL**
/stock/:ingredient/remove

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `ingredient=[String]`
  

* **Data Params**

```
  {
	"quantity": value [Number]
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
