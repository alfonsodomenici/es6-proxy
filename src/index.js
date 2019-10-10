import JsonPlaceHolderService from './JsonPlaceHolderService.js';
import Myi18n from './Myi18n.js';

const service = new JsonPlaceHolderService({url: 'https://jsonplaceholder.typicode.com'});

service.findTodos()
.then(json => {
    console.log(JSON.stringify(json));
});