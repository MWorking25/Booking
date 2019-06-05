
import { HotelSubaminities } from './hotel-subaminities';
export interface HotelAminityTitle {
    id : Number
    amenity : String
    amenity_icon : String
    AminitiesList:HotelSubaminities[],
    createdby : Number
}
