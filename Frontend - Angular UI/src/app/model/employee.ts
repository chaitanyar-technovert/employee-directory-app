export class Employee {
    id: number;
    firstName: string;
    lastName: number;
    email: string;
    jobTitleId: number
    officeLocationId: number
    departmentId: number
    phoneNumber: any
    skypeId: string

    constructor(args: any) {
        this.id = args.Id;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.email = args.email
        this.jobTitleId = args.jobTitleId
        this.officeLocationId = args.officeLocationId
        this.departmentId = args.departmentId
        this.phoneNumber = args.phoneNumber
        this.skypeId = args.skypeId
    }
}
