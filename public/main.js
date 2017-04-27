// main.js
var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', () => {
	fetch('consumers',
	{
		method:'put',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		body:JSON.stringify({
			'name': document.getElementById('updateName').value,
      		'email': document.getElementById('updateEamil').value
      	}) 
	})
	.then((response) => {
		window.location.reload();
	});
});

del.addEventListener('click' , () => {
	fetch('consumers', 
	{
		method:'delete',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		body:JSON.stringify({
			'name': document.getElementById('deleteName').value
    	})
	})
	.then((response) => {
		window.location.reload();
	});
});