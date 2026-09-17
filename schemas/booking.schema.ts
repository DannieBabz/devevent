import { Schema } from "mongoose"
import { Booking } from "@/types/booking"

export const BookingSchema = new Schema<Booking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required:[true, 'Event ID is required']
        },
        email: {
            type:String,
            required:[true, 'Email is required'],
            trim: true,
            lowercase: true,
            validate: {
                validator: function(email: string){
                    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    return emailRegex.test(email);                    
                },
                message: 'Please provide a valid email address',
            },
        },
    },
    {
        timestamps: true,
    }
)