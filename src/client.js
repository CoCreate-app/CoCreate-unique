import observer from '@cocreate/observer';
import crud from '@cocreate/crud-client';

function init() {
    let elements = document.querySelectorAll('[unique]')
    initElements(elements)
}

function initElements(elements) {
    for (let element of elements)
        initElement(element)
}

function initElement(element) {
    setInputEvent(element)
}

function setInputEvent(input) {
    let delayTimer
    input.addEventListener('input', function (e) {
        input.setAttribute('unique', true);

        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            isUnique(input)
        }, 1000);
    });
}

async function isUnique(element) {
    let name = element.getAttribute('name');
    let value = element.getValue();
    let request = {
        db: 'indexeddb',
        collection: element.getAttribute('collection'),
        filter: {
            query: [{
                name,
                value,
                operator: '$eq'
            }]
        }
    };

    let data = await crud.readDocument(request)
    let response = {
        element,
        name,
        unique: true
    };
    if (data.document && data.document.length) {
        response.unique = false;
    }
    if (response.unique) {
        delete request.db
        response = await crud.socket.send('isUnique', request)
    }

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
        initElement(mutation.target)
});

init();
