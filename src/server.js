class CoCreateUnique {
	constructor(wsManager, crud) {
		this.wsManager = wsManager
		this.crud = crud
		this.init();
	}
	
	init() {
		if (this.wsManager) {
			this.wsManager.on('checkUnique', 
				(socket, data) => this.checkUnique(socket, data));
		}
	}


	async checkUnique(socket, data) {
		const self = this
		try {
			data.filter = {
				query: [
					{name: data['name'], value: data['value'], operator: '$eq'}
				]
			}

			this.crud.readDocument(data).then((data) => {
				let response = {
					request_id: data['request_id'],
					name: data['name'],
					unique: true
				};
				if (data.document.length) {
					response.unique = false;
				}
				self.wsManager.send(socket, 'checkedUnique', response);
			})
		} catch (error) {
			console.log(error);
		}
	}
	
}

module.exports = CoCreateUnique;