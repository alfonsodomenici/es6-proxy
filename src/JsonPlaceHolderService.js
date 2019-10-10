import RestService from "./RestService.js";

export default class JsonPlaceHolderService extends RestService {
    constructor({ url }) {
        super({ url });
    }

    async findTodos() {
        const resp = await fetch(this.url + `/todos`, {
            method: 'GET',
            headers: this.headers
        });
        if (!resp.ok) {
            throw new Error(response.statusText);
        }
        const json = await resp.json();
        return json;
    }


}