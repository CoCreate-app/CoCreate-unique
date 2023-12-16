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
            this.wsManager.on('isUnique', (data) => this.isUnique(data));
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
    async isUnique(data) {
        const self = this
        try {
            data.method = 'object.read'
            this.crud.send(data).then((data) => {
                data.method = 'isUnique'

                if (data.object.length) {
                    data.unique = false;
                } else
                    data.unique = true;

                return self.wsManager.send(data);
            })
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = CoCreateUnique;