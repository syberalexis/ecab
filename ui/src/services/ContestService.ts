import {Contest} from "../model/Contest";
import {Language} from "../model/Language";

export class ContestService {
    public participate(contest: Contest) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
            // fetch("").then((response) => (
            //     response.json()
            // )).then((data) => {
            //     resolve(data)
            // }).catch((error) => {
            //     reject(error);
            // });
        });
    }

    public getStarted(userId: Number): Promise<Array<Contest>> {
        let user = {
            id: 1,
            mail: "alexis@email.com",
            username: "maeq",
            fullname: "Maeq",
            firstname: "Alexis",
            phone: "0605040302"
        };
        return new Promise((resolve, reject) => {
            resolve([
                new Contest(1, 'my first contest', user, Language.ALL, 'Best contest of the world !!!', "https://truc"),
                new Contest(1, 'my first contest', user, Language.ALL, 'Best contest of the world !!!', "https://truc")
            ])
        });
    }

    public getEnded(userId: Number): Promise<Array<Contest>> {
        let user = {
            id: 1,
            mail: "alexis@email.com",
            username: "maeq",
            fullname: "Maeq",
            firstname: "Alexis",
            phone: "0605040302"
        };
        return new Promise((resolve, reject) => {
            resolve([
                new Contest(1, 'my first contest', user, Language.ALL, 'Best contest of the world !!!', "https://truc"),
                new Contest(1, 'my first contest', user, Language.ALL, 'Best contest of the world !!!', "https://truc")
            ])
        });
    }

    public get(id: number): Promise<Contest> {
        let user = {
            id: 1,
            mail: "alexis@email.com",
            username: "maeq",
            fullname: "Maeq",
            firstname: "Alexis",
            phone: "0605040302"
        };
        return new Promise((resolve, reject) => {
            resolve(new Contest(1, 'my first contest', user, Language.ALL, 'Best contest of the world !!!', "https://truc"))
        });
    }

    public getAll(): Promise<Array<Contest>> {
        let user = {
            id: 1,
            mail: "alexis@email.com",
            username: "maeq",
            fullname: "Maeq",
            firstname: "Alexis",
            phone: "0605040302"
        };
        return new Promise((resolve, reject) => {
            resolve([
                new Contest(1, 'my first contest', user, Language.ALL, 'Best contest of the world !!!', "https://truc"),
                new Contest(1, 'my first contest', user, Language.ALL, 'Best contest of the world !!!', "https://truc")
            ])
        });
    }
}