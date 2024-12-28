import { User } from "./user";

export class ProducerData {
    id: number = 0;
    description: string = '';
    name: string = '';
    profession: string = '';
    image_One: string = '';
    image_One_Url: string = '';
    image_Two: string = '';
    image_Two_Url: string = '';
    image_Three: string = '';
    image_Three_Url: string = '';
    image_Profile: string = '';
    image_Profile_Url: string = '';
    userId: number = 0;
    user: User = new User();
}
