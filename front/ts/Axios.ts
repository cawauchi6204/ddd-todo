import axios from 'axios';

// FIXME: ドメイン貧血症なので上手い書きかたを誰かのコードを見て真似る
export default class Axios {
    static get(url: string) {
        return axios.get<string>(url);
    }
}
