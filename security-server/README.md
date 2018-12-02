Basic
================================================================================
Register
--------------------------------------------------------------------------------
### Path
/api/auth/register
### Method
POST
### Headers
Content-Type: application/json
### Body 
#### (required: email, firstName, lastName, password, clientid)
"email": "email@gmail.com",

"firstName": "John",

"lastName": "Smith",

"password": "0000",

"clientid": "0000"
### Response
user, token. Must log in now.

Login
--------------------------------------------------------------------------------
### Path
/api/auth/login
### Method
POST
### Headers
Content-Type: application/json
### Body
#### (required: email, password)
"email": "email@gmail.com"

"password": "0000"
### Response
user, token. Must put *this* token in the headers now.

Check authorization
--------------------------------------------------------------------------------
### Path
/api/auth/authorize
### Method
GET
### Headers
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Response
"validated": true

Info - gets you your full user json
--------------------------------------------------------------------------------
### Path
/api/home/info
### Method
GET
### Headers
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Response
user: {...}

List
================================================================================
Create List
--------------------------------------------------------------------------------
### Path
/api/home/list
### Method
POST
### Headers
Content-Type: application/json

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Body 
#### (required: name)
"name" : "word search", 

"desc" : "game", 

"paren" : "paren"
### Response
list: {_id: ... name: .. }

Read List
--------------------------------------------------------------------------------
### Path
/api/home/list
### Method
GET
### Headers
Content-Type: application/json

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Body
#### (required: listid)
"listid" : "5c030af7339b11aa8d34f3af"
### Response
list: {_id: ... name: .. }

Update List
--------------------------------------------------------------------------------
### Path
/api/home/list
### Method
PUT
### Headers
Content-Type: application/json

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Body
#### (required: listid)
"listid" : "5c030af7339b58aa8d34fa1f",

"name" : "scrabble blah",

"desc" : "a boardgame", 

"paren" : "paren"
### Response
list: {_id: ... name: .. }

Delete List
--------------------------------------------------------------------------------
### Path
/api/home/list
### Method
DELETE
### Headers
Content-Type: application/json

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Body
#### (required: listid)
"listid" : "5c030af7339b58aa8d34fa1f"
### Response
deleted: true, user: {...}

Task
================================================================================
Create Task
--------------------------------------------------------------------------------
### Path
/api/home/task
### Method
POST
### Headers
Content-Type: application/json

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Body 
#### (required: name, listid)
"name" : "a task",

"details" : "some details",

"listid" : "5c043a200598fcb710478e75"

### Response
task: {...}

Read Task
--------------------------------------------------------------------------------
### Path
/api/home/task
### Method
GET
### Headers
Content-Type: application/json

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Body
#### (required: listid, taskid)
"listid" : "5c043a200598fcb710478e75",

"taskid" : "5c043b3828efe4b7469af2bb"

### Response
task: {...}

Update Task
--------------------------------------------------------------------------------
### Path
/api/home/task
### Method
PUT
### Headers
Content-Type: application/json

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Body 
#### (required: listid, taskid)
"listid" : "5c043a200598fcb710478e75",

"taskid" : "5c043b3828efe4b7469af2bb", 

"details" : "a game", 

"name" : "sudoku"
### Response
task: {...}

Delete Task
--------------------------------------------------------------------------------
### Path
/api/home/task
### Method
DELETE
### Headers
Content-Type: application/json

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...
### Body
#### (required: listid, taskid)
"listid" : "5c043a200598fcb710478e75",

"taskid" : "5c043b3828efe4b7469af2bb"
### Response
deleted: true, user: {...}

