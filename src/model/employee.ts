export default class employee {
    userId: string;

    userNme:string;

    date:any;

    PunchIn:any;

    PunchOut:any;

    constructor(userId = '', userNme = '', date = new Date(), punchIn = new Date(), punchOut = new Date()) {
      this.userId = userId;
      this.userNme = userNme;
      this.date = date.toISOString().split('T')[0].substring(0, 10);
      this.PunchIn = punchIn.toISOString().split('T')[1].substring(0, 5);
      this.PunchOut = punchOut.toISOString().split('T')[1].substring(0, 5);
    }
}
