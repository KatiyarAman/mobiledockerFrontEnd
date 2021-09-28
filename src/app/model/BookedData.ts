export class BookedData{
    userName!: string;
    userPhone!: string;
    userEmail!:string;
    userCity!: string;
    userZipCode!: string;
    userBookedId!: string;
    userStatus!:string;
    constructor(userResponse:any){
        this.userName=userResponse.userName;
        this.userPhone=userResponse.userPhone;
        this.userEmail=userResponse.userEmail;
        this.userStatus=userResponse.userStatus;
        this.userZipCode=userResponse.userZipCode;
        this.userBookedId=userResponse.userBookedId;
    }
}