function createRow(formName, element)
{
	var row = document.createElement("FIELDSET");
	row.quiet = element.quiet;
	row.setAttribute("name","row");
		
	const checked = document.createElement("INPUT");
	checked.setAttribute("type","checkbox");
	checked.setAttribute("name","myCheckbox");
	checked.checked = element.checked;
	row.appendChild(checked);
	
	const impl = document.createElement("INPUT");
	impl.setAttribute("type","text");
	impl.setAttribute("name","impl");
	impl.setAttribute("id","impl");
	impl.setAttribute("disabled","true");
	impl.setAttribute("value",element.impl);
	row.appendChild(impl);
	
	const min = document.createElement("INPUT");
	min.setAttribute("type","text");
	min.setAttribute("name","min");
	min.setAttribute("id","amt");
	min.setAttribute("value",element.min);
	row.appendChild(min);
	
	const max = document.createElement("INPUT");
	max.setAttribute("type","text");
	max.setAttribute("name","max");
	max.setAttribute("id","amt");
	max.setAttribute("value",element.max);
	row.appendChild(max);
	
	const weight = document.createElement("INPUT");
	weight.setAttribute("type","text");
	weight.setAttribute("name","weight");
	weight.setAttribute("id","weight");
	weight.setAttribute("value",element.weight);
	row.appendChild(weight);
	
	const form = document.forms[formName];
    form.appendChild(row);
}
function Populate(formName)
{
    const array = [
		{checked: true, impl:'big paddle', min: 5, max: 40, weight: 1, quiet: false},
		{checked: true, impl:'cane', min: 5, max: 10, weight: 1, quiet: true },
		{checked: true, impl:'narrow paddle', min: 15, weight: 1, max: 40, quiet: false},
		{checked: true, impl:'strap', min: 20, max: 50, weight: 1, quiet: false},
		{checked: true, impl:'small strap', min: 20, max: 50, weight: 1, quiet: false},
		{checked: true, impl:'crop', min: 20, max: 50, weight: 1, quiet: false},
		{checked: true, impl:'redneck spoon', min: 20, max: 50, weight: 1, quiet: true},
		{checked: true, impl:'hand', min: 15, max: 35, weight: 1, quiet: true},
	]
	array.forEach(element => createRow(formName, element));

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

function SetAllQuietCheckBoxes(FormName,Attribute, CheckValue)
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
		obj.children[0].checked = CheckValue === obj[Attribute];
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
		const weight = row.children[4].value;
		if (checked)
		{
			const number = getRandomInt(parseInt(min),parseInt(max));
			for(var i = 0; i < weight; i++)
			probabilities.push({impl, number })
		}
	})
		
	const index = getRandomInt(0, probabilities.length-1);
    alert(`${probabilities[index].number} with ${probabilities[index].impl} `);
}
