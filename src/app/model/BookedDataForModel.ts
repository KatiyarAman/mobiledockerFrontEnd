import { UserBrand } from "../ModelInterface/modelInterface";

export class BookedDataForEdit {
    userName!: string;
    userPhone!: string;
    userCity!: string;
    userZipCode!: string;
    userBookedId!: string;
    userStatus!:string;
    brand!: UserBrand[];
    model!: UserBrand[];
    userIssue!:string;
}