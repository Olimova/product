import z from "zod";
import mongoose from "mongoose";

export const OrderSchema = z.object({
    user: z.string().refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
    }),
    products: z.array(
        z.object({
        product: z.string().refine((val) => {
            return mongoose.Types.ObjectId.isValid(val);
        }),
        quantity: z.number().min(1),
        })
    ),
    address: z.string().trim(),
    status: z.enum(["pending", "shipped", "delivered", "cancelled"]),
});
