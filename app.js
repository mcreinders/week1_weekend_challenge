
//establish employeeList array to hold objects containing employee data
//sumOfSalaries variable sums all employee salaries
//monthlySalaryCost is calculated based on sumOfSalaries
var employeeList = [];
var sumOfSalaries = 0;
var monthlySalaryCost = 0;

$(document).ready(function(){
	$("#employeeinfo").on('submit',function(event){
		event.preventDefault();

		var values = {};

		//serialize array creates an array of objects from the form input
		//.each iterates over the values object executing the function
		//for each element
		//note to self: serializeArray takes no arguments, operates on 
		//forms and element has to have a 'name' attribute to be included
		//values is the object to iterate over
		//the function is executed on every object
		//i is an index, field=this
		//tried to break it out into parts using the code below, but
		//it didn't work
		// employeeList = $("#employeeinfo").serializeArray();
		// $.each(values,function(i, field){
		// 	values[field.name] = field.value;
		// })

		$.each($("#employeeinfo").serializeArray(), function(i, field){
			values[field.name] = field.value;
		})

		//this just clears out the form
		$("#employeeinfo").find("input[type=text]").val("");
		$("#employeeinfo").find("input[type=number]").val("");

		appendDom(values);

		employeeList.push(values);


		//keep a running total of salaries
		//then calculate monthly cost
		sumOfSalaries += parseInt(values.annualSalary);
		monthlySalaryCost = Math.round(sumOfSalaries/12);
	});

	//create event for the delete employee button
	//creates a new array with the info of employee to delete from DOM
	$("#deleteEmployee").on('submit', function(event){
		event.preventDefault();
		var deleteValues = {};
		$.each($("#employeeinfo").serializeArray(), function(i, field){
			deleteValues[field.name] = field.value;
		})
		//this just clears out the form
		$("#employeeinfo").find("input[type=text]").val("");
		$("#employeeinfo").find("input[type=number]").val("");

		deleteDOM(deleteValues);
	});

	//call function to append monthly cost to DOM
	$("#monthlySalaryCost").on('submit', function(event){
		event.preventDefault();
		appendDomSalaryCost(monthlySalaryCost);
	});

});

function appendDom(object){
	$("#output").append("<div></div>");
	var $el = $("#output").children().last();

	$el.append("<p>" + object.employeefirstname + "\ " + object.employeelastname + "\ " + object.employeeID + "\ " + object.jobTitle + "\ $" + object.annualSalary + "</p>");	
}

//function to append monthly cost to DOM
function appendDomSalaryCost(monthlySalaryCost){
	$('#monthlyCostDisplay').append("<div</div>");
	var $sal = $("#monthlyCostDisplay").children().last();
	$sal.append("<p>Monthly Salary Cost: $" + monthlySalaryCost + "</p>");
}

//deletes employee from DOM, updates sumOfSalaries and monthlySalaryCost 
function deleteDOM(object){
	var nameToDelete = object.employeelastname + " " + object.employeeID;
	$("p:contains('"+nameToDelete+"')").remove();
	sumOfSalaries -= parseInt(object.annualSalary);
	monthlySalaryCost = Math.round(sumOfSalaries/12);

	//appends updated monthlySalaryCost to DOM
	$('#monthlyCostDisplay').append("<div</div>");
	var $sal = $("#monthlyCostDisplay").children().last();
	$sal.append("<p>Updated Monthly Salary Cost: $" + monthlySalaryCost + "</p>");
}


