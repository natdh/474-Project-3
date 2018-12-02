##Register
###Path
/api/auth/register
##Method

POST

**Headers**

Content-Type: application/json

**Body**

"email": "email@gmail.com",
"firstName": "John",
"lastName": "Smith",
"password": "0000",
"clientid": "0000"

Login
--------
**Path**

/api/auth/login

**Method**

POST

**Headers**

Content-Type: application/json

**Body**

"email": "email@gmail.com"
"password": "0000"

Check authorization
--------
**Path**

/api/auth/authorize

**Method**

GET

**Headers**

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

Info - gets you your full user json
--------
**Path**

/api/home/info

**Method**

GET

**Headers**

Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

Create List
--------
**Path**

/api/home/list

**Method**

POST

**Headers**

Content-Type: application/json
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

**Body** (required: name)

"name" : "scrabble", 
"desc" : "boardgame", 
"paren" : "paren"

Read List
--------
**Path**

/api/home/list

**Method**

GET

**Headers**

Content-Type: application/json
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

**Body** (required: listid)

"listid" : "5c030af7339b11aa8d34f3af"

Update List
--------
**Path**

/api/home/list

**Method**

PUT

**Headers**

Content-Type: application/json
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

**Body** (required: listid)

"listid" : "5c030af7339b58aa8d34fa1f",
"name" : "scrabble blah",
"desc" : "a boardgame", 
"paren" : "paren"

Delete List
--------
**Path**

/api/home/list

**Method**

DELETE

**Headers**

Content-Type: application/json
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

**Body** (required: listid)

"listid" : "5c030af7339b58aa8d34fa1f"

Create Task
--------
**Path**

/api/home/task

**Method**

POST

**Headers**

Content-Type: application/json
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

**Body**


Read Task
--------
**Path**

/api/home/task

**Method**

GET

*Headers*

Content-Type: application/json
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...


**Body**


Update Task
--------
**Path**

/api/home/task

**Method**

PUT

**Headers**

Content-Type: application/json
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

**Body**

Delete Task
--------
**Path**

/api/home/task

**Method**

DELETE

**Headers**

Content-Type: application/json
Authorization: Bearer 1lIiwibmFtZSI6InNjcmFiYmxlISEhIiwidGFza3MiOltdfV0shdCI6...

**Body**
