//var serverPath = "http://131.107.100.10/ehr/public/api/";
var serverPath = "http://demoz.online/ehr/public/api/";
var patientFileUploadPath = "http://demoz.online/ehr/public/uploaded_images/";

var errorMessages = {
	"authFailed": "Email or Password is Invalid"
};

var dropDownInfo = {
	"IdType" :[
		//{"id": "null", "type": "ID Type"},
		{"id": "1", "type": "License"},
		{"id": "2", "type": "National ID Card"},
		{"id": "3", "type": "Passport"}
	],
	"relationship" :[
		//{"id": "null", "type": "Relationship"},
		{"id": '1', "type": "Brother"},
		{"id": "2", "type": "Father"},
		{"id": "3", "type": "Hansband"},
		{"id": '4', "type": "Mother"},
		{"id": '5', "type": "Sister"},
		{"id": '6', "type": "Wife"}
	]
};