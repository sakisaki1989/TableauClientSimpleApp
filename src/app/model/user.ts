export class User {
    constructor(public username: string,
                public user_id: string,
                private _role: string,
                private _token: string,
                private _tableauToken: string) {}

 get token() {
    return this._token;
 }

 get role() {
    return this._role;
 }
}