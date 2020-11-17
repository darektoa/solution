document.addEventListener('DOMContentLoaded', () => {
	let getData = async () => {
		let addMatchButton = document.querySelector('.addmatch-button');
		addMatchButton.addEventListener('click', async (e) => {
			let matchName = document.querySelector('#task-name').value;
			let date = document.querySelector('#date').value;
			let desc = document.querySelector('#description').value;
         let time = document.querySelector('#time').value;
         
         if(matchName == "" || date == "" || desc == "" || time == ""){
            alert('Please complete the forms')
            return;
         }
			let item = {
				match: matchName,
				date: date,
				desc: desc,
				time: time,
			};

			await storeData(item);
			document.querySelector('.scheduleform').reset();
			let data = await readData(item.match);
			showData(data);
		});
	};

	let showAllData = async () => {
		let data = await readAllData();
		let content = document.querySelector('.schedulecontent');
		data
			.filter((data) => data == data)
			.forEach((data) => {
				content.innerHTML += `
         <tr>
            <td>${data.match}</td>
            <td>${data.date}</td>
            <td>${data.desc}</td>
            <td>${data.time}</td>
            <td>
               <a
               class="waves-effect waves-light btn indigo darken-4 mytask-button addmatch-button" id="deleteButton">
               Delete
               </a>
            </td>
         </tr>
         `;
			});
	};

	let showData = async (data) => {
		let content = document.querySelector('.schedulecontent');
		content.innerHTML += `
         <tr>
            <td>${data.match}</td>
            <td>${data.date}</td>
            <td>${data.desc}</td>
            <td>${data.time}</td>
            <td>
               <a
               class="waves-effect waves-light btn indigo darken-4 deletematch-button" id="deleteButton">
               Delete
               </a>
            </td>
         </tr>
         `;
	};

	async function removeData() {
		let content = document.querySelector('.schedulecontent');
		content.addEventListener('click', function (e) {
			if (e.target.id === 'deleteButton') {
				delData =
					e.target.parentElement.parentElement.children[0].textContent;
				delElemen = e.target.parentElement.parentElement;
				delElemen.remove();
				deleteData(delData);
			}
		});
	}

	showAllData();
	getData();
	removeData();
});
