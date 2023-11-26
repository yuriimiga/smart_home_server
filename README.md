## How to use
1. **api/get_all**
   > GET request\
   > no data\
   > return list of objects
2. **api/find**
   > POST request\
   > Data:\
   > ``{
   >     "id" : (List of ids(String) OR "all" for no query),
   >     "status" : (Bool OR "all" for no query),
   >     "place": (list of places(String) OR "all" for no query),
   >     "name" : (String OR "" for no query)
   > }``\
   > Returns list of objects
3. **api/create**
   > POST request\
   > Data:\
   > ``{
   >     "place": String,
   >     "name" : String,
   >     "description" : String,
   > }``\
   > return nothing
4. **api/delete**
   > POST request\
   > Data:\
   > ``{
   >   "id" : String
   > }``\
   > return nothing
5. **api/update**
   >POST request\
   >Data:\
   >``{
   >  "id" : String,
   >  "data" : {
   >    "status" :Bool,
   >    "name" : String,
   >    "place" : String,
   >    "description" : String,
   >  }
   >}``\
   >return nothing
    

