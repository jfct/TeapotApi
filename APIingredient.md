# API - Ingredient


### Create Ingredient
----
* **URL**
/ingredients/:beverage

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `ingredient=[String]`

* **Data Params**
```
  {
  	"unit": value
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


### Get ingredients list
----
* **URL**
/ingredients/

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


### Get specific ingredient
----
* **URL**
/ingredients/:ingredient

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

### Update ingredient unit
----
* **URL**
/ingredients/:ingredient/unit

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `ingredient=[String]`

* **Data Params**
```
  {
  	"unit": value
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

### Delete ingredient
----
* **URL**
/ingredients/:ingredient

* **Method:**
  
  `DELETE`
  
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
