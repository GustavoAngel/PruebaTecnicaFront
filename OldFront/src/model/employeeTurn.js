export default class employee {
    constructor(userId,userNme,date=new Date().toLocaleDateString('en-CA'),PunchIn='09:00',PunchOut='19:00'){
        this.userId=userId;
        this.userNme=userNme;
        this.date=date;
        this.PunchIn=PunchIn;
        this.PunchOut=PunchOut;
     }
}

