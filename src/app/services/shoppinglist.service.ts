import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {UserDatabaseService} from "./user-database.service";
import {DatabaseService} from "./database-service";


@Injectable({
    providedIn: 'root'
})
export class ShoppinglistService {

    constructor(private authService:AuthService,
                private userDatabaseService:UserDatabaseService) {
    }


}
