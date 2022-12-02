export default class employee {
    userId: string;

    userNme:string;

    date:any;

    PunchIn:Date;

    PunchOut:Date;

    constructor(userId = '', userNme = '', date = new Date(), punchIn = new Date(), punchOut = new Date()) {
      this.userId = userId;
      this.userNme = userNme;
      this.date = date;
      this.PunchIn = punchIn;
      this.PunchOut = punchOut;
    }
}
