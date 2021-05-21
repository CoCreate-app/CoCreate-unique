import uuid from '@cocreate/uuid'

const CoCreateUnique = {

	selector: `input[data-unique='true'], textarea[data-unique='true']`,
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
		CoCreate.crud.listenMessage('checkedUnique', function(data) {
			self.checkedUnique(data)
		})	
	},
	
	checkedUnique: function(data) {
		const request_id = data['request_id'];
		
		if (!request_id) return
		
		const element = document.querySelector(`[${this.requestAttr}='${request_id}']`)
		
		if (data['unique']) {
			element.classList.remove('data-unique-invalid');
			element.classList.add('data-unique-valid');
		} else {
			element.classList.remove('data-unique-valid');
			element.classList.add('data-unique-invalid');
		}
	},

	setInputEvent: function(input) {
		const self = this;
		input.addEventListener('input', function(e) {
			//. request check input
			let request_data = CoCreate.getCommonParams();
			request_data['collection'] = input.getAttribute('data-collection');
			request_data['name'] = input.getAttribute('name')
			request_data['value'] = e.target.value
			request_data['request_id'] = input.getAttribute(self.requestAttr)
			CoCreate.socket.send('checkUnique', request_data);
		})
		
	},
	
	checkValidate: function(form) {
		const items = form.querySelectorAll(this.selector);
		for (let i = 0; i < items.length; i++) {
			if (!items[i].classList.contains('data-unique-success')) {
				return false;
			}
		}
		return true;
	}
}

CoCreateUnique.init();
CoCreateUnique.initListener()