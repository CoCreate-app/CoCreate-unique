import observer from '@cocreate/observer';
import crud from '@cocreate/crud-client';


/**
 * Initializes elements to ensure their values are unique. This function targets elements with the 'unique' attribute and uses CRUD operations to check if the element's value already exists.
 * If no elements are provided, it queries and initializes all elements with the 'unique' attribute in the document.
 *
 * @param {(Element|Element[]|null)} [elements] - Optional. A single element, an array of elements, or null.
 *     - If a single element or an array of elements is provided, the function checks each element's value for uniqueness.
 *     - If null or omitted, all elements in the document with the 'unique' attribute are queried and processed for uniqueness checks.
 */
function init(elements) {
    if (!elements)
        elements = document.querySelectorAll('[unique]')
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
    let value = await element.getValue();
    let data = {
        method: 'object.read',
        storage: 'indexeddb',
        array: element.getAttribute('array'),
        $filter: {
            query: [{
                key,
                value,
                operator: '$eq'
            }],
            limit: 1
        }
    };

    data = await crud.send(data)

    let response = {}
    // If a object is returned, unique is set to false  
    if (data.object && data.object.length) {
        response.unique = false;
    } else
        response.unique = true

    // If indexedb response is unique is true, check server response  
    if (response.unique) {
        delete data.storage
        data.method = 'isUnique'
        response = await crud.socket.send(data)
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