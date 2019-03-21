//Variable Declarations
var rLengthField;
var rWidthField;
var rHeightField;
var wHeightField;
var wWidthField;

var wCostField;
var wCoverageField;
var fCostField;

var fCostField;
var fCostField;
var fCostField;
var blindsCheck;

var clearButton;
var submitButton;
var i = 0;

var Room = function(rLength, rWidth, rHeight, wHeight, wWidth//Object constructor
){
    this.rLength = rLength;
    this.rWidth = rWidth;
    this.rHeight = rHeight;
    this.wWidth = wWidth;
    this.wHeight = wHeight;
};

var Materials = function(wCost, wCoverage, fCost, blindsCheck//Object constructor
){
    this.wCost = wCost;
    this.wCoverage = wCoverage;
    this.fCost = fCost;
	this.blindsCheck = blindsCheck;
};

Room.prototype.floorArea = function(){//Calcs floor area
    return this.rLength * this.rWidth;
    
};

Room.prototype.wallArea = function(){//Calcs wall area
    var wall1 = this.rLength * this.rHeight;
	var wall2 = this.rWidth * this.rHeight;
	var total = wall1 + wall2 + wall1 + wall2;
	if (this.blindArea() > 0){
		total = total - this.blindArea()
	}
	return total;
    
};

Room.prototype.blindArea = function(){//Calcs blind area
    return this.wWidth * this.wHeight;
    
};

window.onload = function(){//On load
	
	var submitButton = document.getElementById("submit");
	loadOutput();//Loads saved
    submitButton.onclick = function(){//On button click
	
	var rLengthField = document.getElementById("rLength").value;
	var rWidthField = document.getElementById("rWidth").value;
	var rHeightField = document.getElementById("rHeight").value;
	var wHeightField = document.getElementById("wHeight").value;
	var wWidthField = document.getElementById("wWidth").value;
	
	var coverageField = document.getElementById("coverage").value;
	var fCostField = document.getElementById("fCost").value;
	var wCostField = document.getElementById("wCost").value;
	var blindsCheck = document.getElementById("blinds").checked;

	
  if(rLengthField > 0 && rWidthField > 0 && rHeightField > 0 && wCostField > 0 && fCostField > 0){ //Input validation 
    r = new Room(rLengthField, rWidthField, rHeightField, wHeightField, wWidthField);
	m = new Materials(wCostField, coverageField, fCostField, blindsCheck);
	
        output();//Calls output
        clear();//Calls clear
    
	} else{
		alert("Please input proper values to work with!");};
	};
	
	
	
    var clearButton = document.getElementById("clear");
    clearButton.onclick = function(){//Clear button
        clear();
    };
	
	var deleteButton = document.getElementById("delete");
	deleteButton.onclick = function(){//Delete button
        deleteTable();
    };
};

var output = function(){//Calculates and outputs the table.
    var output = document.getElementById("output");
	var mat1 = document.getElementById("mat1");
	var mat2 = document.getElementById("mat2");
	var mat3 = document.getElementById("mat3");
	var material1;
	var material2;
	var material3;
	var unit1;
	var unit2;
	var blindval;
	var blindCost;
	var total
	var mat5 = (m.fCost * r.floorArea()).toFixed(2);
	
	 if (mat2.value == "paint"){//Checks what material has been selected and adjusts calc/output accordingly.
		material2 = " Paint:";
		unit1 = "L";
		material1 = (r.wallArea() / m.wCoverage).toFixed(2);
		mat4 = (m.wCoverage * m.wCost).toFixed(2);
	
	 } else if(mat2.value == "wallpaper"){
		material2 = " Wallpaper:";
		unit1 = "M&sup2";
		material1 = r.wallArea();
		mat4 = (r.wallArea() * m.wCost).toFixed(2);
		 
	 }
	  if (mat3.value == "tile"){//Checks what material has been selected and adjusts calc/output accordingly.
		material3 = " Tile:";
		unit2 = "M&sup2";
	
	 } else if(mat3.value == "carpet"){
		material3 = " Carpet:";
		unit2 = "M&sup2";
		 
	 }
	 
	 if(m.blindsCheck == true){//Checks if blinds are to be included in the cost
		 blindCost = (15 +(r.blindArea() * 70)).toFixed(2);
		 blindval = "<tr><td>" + r.blindArea() + "M&sup2 Blind:</td><td>&#163;" + blindCost + "</td></tr>";
		 
		total = parseFloat(mat4) + parseFloat(mat5) + parseFloat(blindCost);
		 
	 }
	 else{
		 blindval = ""
		 blindCost = 0;
		 total = parseFloat(mat4) + parseFloat(mat5);
	 }
		i++;//Increment i
		id = "'table" + i + "'";//creates new table ID
        rTable = "<table id=" + id + "><tbody><tr><th colspan='2'>Room Specification</th><th class='invs'></th></tr><tr><td>Length:</td><td>" + r.rLength + "M" + "</td><td rowspan='3'><input class='hide' type='checkbox'></td></tr><tr><td>Width:</td><td>" +  r.rWidth + "M</td></tr><tr><td>Height:</td><td>" +  r.rHeight + "M</td></tr><tr><td>Floor Area:</td><td>" +  r.floorArea() + "M&sup2</td></tr><tr><td>Wall Area:</td><td>" + r.wallArea()+ "M&sup2</td></tr></tbody></table>";
		//Create 1st table
		i++;
		id = "'table" + i + "'";
		mTable = "<table id=" + id + "><tr><th colspan='2'>Materials Needed</th><th class='invs'></th></tr><tr><td>" + material1 + unit1 + material2 + "</td><td>&#163;" + mat4 + "</td><td rowspan='3'><input class='select' type='checkbox'></td></tr><tr><td>" + r.floorArea() + "M&sup2 " + material3 + "</td><td>&#163;" + mat5 + "</td></tr>"  + blindval + "<tr><td>Total:</td><td>&#163;" + total.toFixed(2) + "</td></tr></table>";
		//create 2nd table
    
    
    output.innerHTML = output.innerHTML + rTable + mTable; //Outputs table
	saveOutput();//Saves
};

var clear = function(){//Clears all input fields
	var rLengthField = document.getElementById("rLength");
	var rWidthField = document.getElementById("rWidth");
	var rHeightField = document.getElementById("rHeight");
	var wHeightField = document.getElementById("wHeight");
	var wWidthField = document.getElementById("wWidth");
	
	var coverageField = document.getElementById("coverage");
	var fCostField = document.getElementById("fCost");
	var wCostField = document.getElementById("wCost");
	var blindsCheck = document.getElementById("blinds");
	
    rLengthField.value = 0;
    rWidthField.value = 0;
	rHeightField.value = 0;
	wHeightField.value = 0;
	wWidthField.value = 0;
	
	coverageField.value = 0;
	fCostField.value = 0;
	wCostField.value = 0;
	blindsCheck.checked = false;
    
};

var deleteTable = function(){//Runs through tables, checks if checkbox is checked and removes table if it is, saves.
	var div = document.getElementById("output");
	var count = div.childElementCount + i;
	var hit  = false;
	if(count != 0){
	for(j=1; j <= count; j++) {
		var table = document.getElementById(("table" + j));
		if(table != null){
			var row = table.rows[1].cells[2];
		if(row.firstElementChild.checked == true){
			var element = document.getElementById(("table" + j));
			element.parentNode.removeChild(element);
			
			var element = document.getElementById(("table" + (j-1)));
			element.parentNode.removeChild(element);
			hit = true;
		} }
	
	
	}}
	if(hit == false){
		 alert("Nothing was selected!");
	 }
	 saveOutput();
};

var saveOutput = function(){//Loads I and outputted tables
	
    var output = document.getElementById("output");
	localStorage.setItem("output", output.innerHTML);
	localStorage.setItem("i", i);

}

var loadOutput = function(){ //Saves I and outputted tables
	if (localStorage.getItem("output") != null){
	var output = document.getElementById("output");
	output.innerHTML = localStorage.getItem("output");
	i = localStorage.getItem("i");
	}
};


