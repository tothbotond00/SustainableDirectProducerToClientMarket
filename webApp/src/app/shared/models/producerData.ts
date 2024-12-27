import { User } from "./user";

export class ProducerData {
    id: number = 0;
    description: string = '';
    name: string = '';
    profession: string = '';
    image_One: string = '';
    image_Two: string = '';
    image_Three: string = '';
    image_Profile: string = '';
    imageUrl: string = '';
    userId: number = 0;
    user: User = new User();
}