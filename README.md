<!-- ABOUT THE PROJECT -->
## FleetTab



## Introduction
FleetTab is a program designed for dispatchers where they can easily control transports, enter new orders into the system and manipulate them.

## TECHNOLOGY USED

* HTML
* CSS
* JavaScript
* React
* Bootstrap
* Node.js
* Express
* Bcrypt
* MongoDB
* Mongoose

## APPROACH

I started off by making all CRUD worked in backend. Once I had set up all CRUD, I moved to design frontend, Installed react. then first build drivers page then moved to other pages.


## UNSOLVED PROBLEMS/STRETCH GOALS

* As a user I would like to have an API which calculates distance automatically when new ordered added.
* As a user I would like an invoice for each load will be created after load delivered/completed.
* As a user I would like to have a dashboard page where I can see all statistics about load and drivers. For example weekly gross of the drivers, avarage per mile, amount of load and etc ...


### MVP
* As a user I want to be able to add new driver or modify existing driver in drivers page
* As a user I want to be able to modify drivers from trucklist page 
* User must able to add order information to the selected truck. After adding the load it shoud change the driver status to On Duty
* user able to see information about load and driver by clicking to that row. And it should display all information on the right side.
* user able to edit and delete selected order
* as a user I want to see dialoge window with upload a file and add a note options when completed button clicked. inside this window by clicking submit button it should remove the row from Truck List and should

### List of Models & Their Poperties
#### Order Model
* driverInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'}
* invoiceNumber: Number,
* loadNumber: {type: String, required: true},
* companyName: {type: String, required: true},
* rate: Number,
* emptyMilage: Number,
* loadedMilage: Number,
* comment: String,
* loadStatus: {type: String, default: 'open'},
* ateConfirmation: {data: Buffer, contentType: String},
* proofeOfDelivery: {data: Buffer, contentType: String},
* pickup: {pickLocation: String, pickDate: Date},
* stops: [{stop: String, date: Date}]
#### Driver Model
* driver1: {
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    homeAddress: String,
},
* driver2: {
    driver2FirstName: String,
    driver2LastName: String,
    driver2PhoneNumber: Number,
    driver2HomeAddress: String,
},
* truckNumber: Number,
* trailerNumber: {type: Number, default: 0},
* currentLocation: String,
* type: String,
* status: String,
* note: String        
    

## Instructions

