import {User} from "../model/User";

export class UserService {
    public getMyUser() : Promise<User> {
        return new Promise((resolve, reject) => {
            fetch(window.location.origin + "/api/user",
                {
                    method: "OPTIONS",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem("ConquadeToken")
                    }
                }
            ).then((response) => {
                console.log(response);
                return response.json();
            }).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public get(id: number) : Promise<User> {
        return new Promise((resolve, reject) => {
            resolve({
                id: 1,
                mail: "alexis@email.com",
                username: "maeq",
                fullname: "Maeq",
                firstname: "Alexis",
                phone: "0605040302"
            });
            // fetch("").then((response) => (
            //     response.json()
            // )).then((data) => {
            //     resolve(data)
            // }).catch((error) => {
            //     reject(error);
            // });
        });
    }

    public getWithToken(username: string) : Promise<User> {
        return new Promise((resolve, reject) => {
            resolve({
                id: 1,
                mail: "alexis@email.com",
                username: "maeq",
                fullname: "Maeq",
                firstname: "Alexis",
                phone: "0605040302"
            });
            // fetch("").then((response) => (
            //     response.json()
            // )).then((data) => {
            //     resolve(data)
            // }).catch((error) => {
            //     reject(error);
            // });
        });
    }

    public changePassword(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
        })
    }
}