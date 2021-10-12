import crud from '@cocreate/crud-client'
import uuid from '@cocreate/uuid'

const CoCreateUnique = {

	selector: `input[unique], textarea[unique], contenteditable[unique]`,
	requestAttr: "data-unique_request_id",
	
	init: function(container) {
		
		let mainContainer = container || document;
		
		if (!mainContainer.querySelectorAll) {
			return;
		}
		
		let items = mainContainer.querySelectorAll(this.selector)
		const self = this;
		
		items.forEach((item) => {
			const request_id = uuid.generate();
			item.setAttribute(self.requestAttr, request_id);
			self.setInputEvent(item)
		})
	},
	
	initListener: function() {
		const self = this;
		crud.listen('checkedUnique', function(data) {
			self.checkedUnique(data)
		})	
	},
	
	checkedUnique: function(data) {
		const request_id = data['request_id'];
		
		if (!request_id) return
		
		const element = document.querySelector(`[${this.requestAttr}='${request_id}']`)
		
		if (data['unique']) {
			element.setAttribute('unique', true);
		} else {
			element.setAttribute('unique', false);
		}
	},

	setInputEvent: function(input) {
		const self = this;
		input.addEventListener('input', function(e) {
			let request_data = {};
			request_data['organization_id'] = window.config.organization_Id;
			request_data['apiKey'] = window.config.apiKey;
			request_data['collection'] = input.getAttribute('collection');
			request_data['name'] = input.getAttribute('name');
			request_data['value'] = e.target.value;
			request_data['request_id'] = input.getAttribute(self.requestAttr);
			crud.send('checkUnique', request_data);
		})
		
	},
	
	// checkValidate: function(form) {
	// 	const items = form.querySelectorAll(this.selector);
	// 	for (let i = 0; i < items.length; i++) {
	// 		if (!items[i].classList.contains('data-unique-success')) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }
}

CoCreateUnique.init();
CoCreateUnique.initListener()