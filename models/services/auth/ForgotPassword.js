import {Model} from "@/models/Model";
import {Api} from "@/models/Api";

export class User extends Model {
  constructor(data= {}) {
    super(Api.END_POINTS.(), data);
  }

  login() {
    return this.post( Api.END_POINTS.LOGIN(), this.data())
  }

  logout(options = {}) {
    return this.post( Api.END_POINTS.LOGOUT(), options)
  }
