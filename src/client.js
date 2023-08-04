import observer from '@cocreate/observer';
import crud from '@cocreate/crud-client';


/**
* Initializes input event listeners for the specified elements. This is a convenience method for calling setInputEvent on each element.
* 
* @param elements - The HTMLElement or array of HTMLElements to listen
*/
function init(elements) {
    // Returns an array of unique elements
    if (!elements)
        elements = document.querySelectorAll('[unique]')
    // If elements is not an array of elements returns an array of elements.
    else if (!Array.isArray(elements))
        elements = [elements]
    for (let element of elements)
        setInputEvent(element)
}

/**
* Sets the input event to prevent duplicate. This is necessary because IE doesn't support unique = " true " in HTML5.
* 
* @param input - The input element to listen for changes on. Note that it's an object
*/
function setInputEvent(input) {
    let delayTimer
    input.addEventListener('input', function () {
        input.setAttribute('unique', true);

        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            isUnique(input)
        }, 1000);
    });
}

/**
* Checks if a value is unique. This is a helper function for CRUD operations that need to be performed on objects in order to make sure they are unique.
* 
* @param element - The element that is being checked for uniqueness. It should have the attribute ` name `
*/
async function isUnique(element) {
    let key = element.getAttribute('key');
    let value = element.getValue();
    let request = {
        method: 'read.object',
        db: 'indexeddb',
        array: element.getAttribute('array'),
        filter: {
            query: [{
                key,
                value,
                operator: '$eq'
            }]
        }
    };

    let data = await crud.send(request)
    let response = {
        element,
        key,
        unique: true
    };

    // If a object is returned, unique is set to false  
    if (data.object && data.object.length) {
        response.unique = false;
    }

    // If indexedb response is unique is true, check server response  
    if (response.unique) {
        delete request.storage
        request.method = 'isUnique'
        response = await crud.socket.send(request)
    }

    // Set unique attribute on the element
    if (response.unique)
        element.setAttribute('unique', true);
    else
        element.setAttribute('unique', false);

}

observer.init({
    name: 'CoCreateUnique',
    observe: ['addedNodes'],
    target: '[unique]',
    callback: mutation =>
        init(mutation.target)
});

init();

export default { init, isUnique }