import {Octokit} from "octokit";

export class GithubAuth {
    async login(accessCode: string){
        const octokit = new Octokit({ auth: accessCode });
        console.log(octokit)
        octokit.rest.users.getAuthenticated().then(res => {
            console.log("success")
            return res
        }).catch(err => {
            console.log("error: ", err)
            return false
        })
    }
}