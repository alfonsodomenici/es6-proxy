export default class Myi18n {

    static getMessage(key) {
        return Reflect.get(Myi18n.messages, key);
    }

    static messages = {
        "findTodosSuccess": "todos caricati con successo",
        "findTodosFailed": "errore nel caricamento dei todos",
    }
}