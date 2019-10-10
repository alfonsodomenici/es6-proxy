import Myi18n from "./Myi18n.js";

export default class RestService {
    constructor({ url }) {
        this.base = url;
        this.url = this.base;
        this.headers = new Headers({
            'Authorization': 'Bearer ' + 'keycloak.token'
        });
        return new Proxy(this, this.handler);
    }

    handler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            const successMsg = Myi18n.getMessage(`${propKey}Success`);
            const failedMsg = Myi18n.getMessage(`${propKey}Failed`);
            return async (...args) => {
                try {
                    const start = performance.now();
                    target.fireLoadDataEvent(false);
                    const result = await origMethod.apply(target, args);
                    const end = performance.now();
                    console.log(`${propKey} duration -> ${end - start}`);
                    if(successMsg){
                        target.fireMessageEvent(successMsg,false);
                    }
                    return result;
                } catch (err) {
                    console.log(`${propKey} failed...`);
                    console.log(err);
                    if(failedMsg){
                        target.fireMessageEvent(failedMsg,true);
                    }
                }finally{
                    target.fireLoadDataEvent(true);
                }
            };

        }
    }

    fireLoadDataEvent(end) {
        const event = new CustomEvent(
            'ap-loading', {
            detail: {
                end
            },
            bubbles: true,
            composed: true
        }
        );
        document.dispatchEvent(event);
    }

    fireMessageEvent(message, error) {
        const event = new CustomEvent(
            'ap-message', {
            detail: {
                message,
                error
            },
            bubbles: true,
            composed: true
        }
        );
        document.dispatchEvent(event);
    }
}