import database from "../config/mongodb"

class ProductModel {
    static collection () {
        return database.collection("products")
    }

    static getAll(page: number, limit: number) {//Per-page ada 6 data
        const skip = (page - 1) * limit
        /*
         Logic pagination, diketahui :
          - kita tau ada 20 data di db
          - page 1 -> 1 sampai 6 data
          - page 2 -> 7 sampai 12 data

          cara mencari skip nya => (page * limit) - limit
        */
        // console.log("🚀 ~ ProductModel ~ getAll ~ page:", page)
        return this.collection().find().skip(skip).limit(limit).toArray()
    }

    static async getBySlug(slug: string) {
        const products = await this.collection().findOne({ slug })
        return products
    }

    static async getProductByName(name: string) {
        if (!name) return null;

        const query = {
            name: { $regex: name, $options: 'i' }
        }

        const products = await this.collection().find(query).toArray();

        if (!products || products.length === 0) {
            return null;
        }
        // console.log("🚀 ~ ProductModel ~ getProductByName ~ products:", products)
        return products;
    }

}

export default ProductModel
