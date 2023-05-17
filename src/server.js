class CoCreateUnique {
    constructor(crud) {
        this.wsManager = crud.wsManager
        this.crud = crud
        this.init();
    }

    init() {
        if (this.wsManager) {
            this.wsManager.on('isUnique',
                (socket, data) => this.isUnique(socket, data));
        }
    }


    async isUnique(socket, data) {
        const self = this
        try {
            this.crud.readDocument(data).then((data) => {
                let response = {
                    unique: true,
                    uid: data.uid
                };
                if (data.document.length) {
                    response.unique = false;
                }
                self.wsManager.send(socket, 'isUnique', response);
            })
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = CoCreateUnique;