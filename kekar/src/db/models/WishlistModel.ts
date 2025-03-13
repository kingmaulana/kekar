import { ObjectId } from "mongodb";
import database from "../config/mongodb";


class WishlistModel {

    static collection() {
        return database.collection("wishlist")
    }

    static async add(_id: ObjectId, userId: string) {
        // console.log("🚀 ~ WishlistModel ~ add ~ _id:", _id)
        const product = await database.collection('products').findOne(new ObjectId(_id))
        console.log("🚀 ~ WishlistModel ~ add ~ product:", product)
        if (!product) throw { message: "Product Not Found", status: 404 }
        // console.log("🚀 ~ WishlistModel ~ add ~ product:", product)

        await this.collection().insertOne({
            productId: new ObjectId(_id),
            userId: new ObjectId(userId),
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return "Success add to wishlist"
    }

    static async getAll(userId: string) {
        const wishlist = this.collection()
            .aggregate([
                { $match: { userId: new ObjectId(userId) } },
                {
                  $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product",
                  },
                },
                { $unwind: "$product" }
              ])
              .toArray()
        // console.log("🚀 ~ WishlistModel ~ getAll ~ wishlist:", wishlist)
        return wishlist
    }

    static async removeFromWishlist(wishlistId: string) {
        if (!ObjectId.isValid(wishlistId)) {
            throw { message: "Invalid wishlist ID format", status: 400 };
        }
    
        const result = await this.collection().deleteOne({
            _id: new ObjectId(wishlistId)
        });
    
        if (!result.deletedCount) {
            throw { message: "Product not found in wishlist", status: 404 };
        }
    
        return result;
    }


}

export default WishlistModel