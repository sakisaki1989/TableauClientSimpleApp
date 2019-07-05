export class User {
    constructor(public username: string,
                public password: string,
                private _role: string,
                private _token: string) {}

 get token() {
    return this._token;
 }

 get role() {
    return this._role;
 }
}