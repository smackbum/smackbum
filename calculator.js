function Populate(FormName)
{
    const array = [
		{checked: true, impl:'big paddle', min: 5, max: 40, quiet: false},
		{checked: true, impl:'cane', min: 5, max: 10, quiet: true },
		{checked: true, impl:'narrow paddle', min: 15, max: 40, quiet: false},
		{checked: true, impl:'strap', min: 20, max: 50, quiet: false},
		{checked: false, impl:'hand', min: 15, max: 35, quiet: true},
	]
	
	var fieldSets = document.forms[FormName].elements["row"];
	fieldSets.forEach((row, index) => 
	{
		row.quiet = array[index].quiet;
		row.children[0].checked = array[index].checked;
		row.children[1].value= array[index].impl;
		row.children[2].value= array[index].min;
		row.children[3].value= array[index].max;
	});
}

function SetAllCheckBoxes(FormName, FieldName, CheckValue)
{
	if(!document.forms[FormName])
		return;
	var objCheckBoxes = document.forms[FormName].elements[FieldName];
	if(!objCheckBoxes)
		return;
	var countCheckBoxes = objCheckBoxes.length;
	if(!countCheckBoxes)
		objCheckBoxes.checked = CheckValue;
	else
		// set the check value for all check boxes
		for(var i = 0; i < countCheckBoxes; i++)
			objCheckBoxes[i].checked = CheckValue;
}

function SetAllQuietCheckBoxes(FormName, CheckValue)
{
	if(!document.forms[FormName])
		return;
	var objCheckBoxes = document.forms[FormName].elements['row'];
	if(!objCheckBoxes)
		return;
	var countCheckBoxes = objCheckBoxes.length;
	if(!countCheckBoxes)
		objCheckBoxes.checked = CheckValue;
	else
	{
		objCheckBoxes.forEach((obj, index) => {
		obj.children[0].checked = CheckValue === obj.quiet;
		})
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max+1);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function Calculate(FormName)
{
	if(!document.forms[FormName])
		return;
	var fieldSets = document.forms[FormName].elements["row"];
	if(!fieldSets)
		return;
	let probabilities = [];
	fieldSets.forEach(row => 
	{
		const checked = row.children[0].checked;
		const impl = row.children[1].value;
		const min = row.children[2].value;
		const max = row.children[3].value;
		if (checked)
		{
			const number = getRandomInt(parseInt(min),parseInt(max));
			probabilities.push({impl, number })
		}
	})
		
	const index = getRandomInt(0, probabilities.length-1);
alert(`${probabilities[index].number} with ${probabilities[index].impl} `);
}
