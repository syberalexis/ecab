import {User} from "../model/User";

export default class AuthService {
    static readonly TOKEN_NAME = "ConquadeToken";

    public register(user: User) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
            fetch(window.location.origin + "/api/user", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then((response) => (
                response.json()
            )).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public login(login: string, password: string) : Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(window.location.origin + "/api/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: login, password: password})
            }).then((response) => {
                if (response.ok && window.sessionStorage) {
                    sessionStorage.setItem(AuthService.TOKEN_NAME, response.headers.get("Authorization"));
                    resolve();
                } else {
                    reject("Browser not supported !");
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public logout() : Promise<void> {
        return new Promise((resolve, reject) => {
            if (window.sessionStorage) {
                sessionStorage.setItem(AuthService.TOKEN_NAME, '');
                resolve();
            } else {
                reject("Browser not supported !");
            }
        });
    }

    public isLogged() : Promise<string> {
        return new Promise((resolve, reject) => {
            if (window.sessionStorage) {
                resolve(sessionStorage.getItem(AuthService.TOKEN_NAME));
            } else {
                reject("Browser not supported !");
            }
        });
    }
}