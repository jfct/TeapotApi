# API - Beverage

[TOC]

### Create Beverage
----
* **URL**
/beverages/:beverage

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`

* **Data Params**
  

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [JSON]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`


### Get beverage list
----
* **URL**
/beverages/

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


### Get specific beverage
----
* **URL**
/beverages/:beverage

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`

* **Data Params**
  

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [String]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Get beverage recipe
----
* **URL**
/beverages/:beverage/recipe

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`

* **Data Params**

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [JSON]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Delete beverage
----
* **URL**
/beverages/:beverage

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`

* **Data Params**

* **Response:**
	* **Code:** 200
	* **Content:** 
	`{ success : true, response: [String]}`
	
	or
	
	* **Code:** 400
	* **Content:** 
	`{ success : false, response: [String]}`

### Change beverage settings
----
Changes the settings object fully
* **URL**
/beverages/:beverage/settings

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`

* **Data Params**
```
  {
  	"setting": {
		"setting": value,
		"setting2": value
	}
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

### Change beverage setting
----
Change a single setting from the beverage settings
* **URL**
/beverages/:beverage/settings/:setting

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`
   
   `setting=[String]`

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

### Change beverage recipe 
----
* **URL**
/beverages/:beverage/recipe

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`

* **Data Params**
```
  {
  	"recipe": {
		"ingredients": {
			"ingredient": ingredientName
			"quantity": value
		}
	}
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

### Change recipe ingredient quantity
----
Change the quantity of a single ingredient's recipe
* **URL**
/beverages/:beverage/recipe/:ingredient

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
 
   `beverage=[String]`
   
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

