class CoCreateUnique {
    /**
    * @param crud
    */
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


    /**
    * Checks if a object is unique by sending a message to the socket. This is a blocking call so it returns a Promise
    * 
    * @param socket - the socket to send the message to
    * @param data - the data to read from the database usually an object
    * 
    * @return { Promise } - resolves with the response from the server or rejects with an error if there was a
    */
    async isUnique(socket, data) {
        const self = this
        try {
            data.method = 'read.object'
            this.crud.send(data).then((data) => {
                let response = {
                    method: 'isUnique',
                    unique: true,
                    uid: data.uid
                };
                // If the object is unique
                if (data.object.length) {
                    response.unique = false;
                }
                return self.wsManager.send(socket, response);
            })
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = CoCreateUnique;