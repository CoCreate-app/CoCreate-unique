import crud from '@cocreate/crud-client';

const CoCreateUnique = {

	selector: `input[unique], textarea[unique], contenteditable[unique]`,
	
	init: function(container) {
		
		let mainContainer = container || document;
		
		if (!mainContainer.querySelectorAll) {
			return;
		}
		
		let items = mainContainer.querySelectorAll(this.selector)
		const self = this;
		
		items.forEach((item) => {
			self.setInputEvent(item)
		})
	},
		
	checkedUnique: function(data) {
		const element = data.input
		if (data['unique'])
			element.setAttribute('unique', true);
		else
			element.setAttribute('unique', false);
	},

	setInputEvent: function(input) {
		const self = this;
		input.addEventListener('input', function(e) {
			let name = input.getAttribute('name');
			let value = input.getValue();
			let request = {
				collection: input.getAttribute('collection'),
				filter: {
					query: [{
						name, 
						value,
						operator: '$eq'
					}]
				}
			};

			crud.readDocument(request).then((data) => {
				let response = {
					input,
					name,
					unique: true
				};
				if (data.document && data.document.length) {
					response.unique = false;
				}
				self.checkedUnique(response)
			})

		});
	},
};

CoCreateUnique.init();
