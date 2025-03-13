export type Products = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
}

export type WishListItem = {
  _id: string;
  productId: string;
  userId: string;
  product: [{
      _id: string;
      name: string;
      slug: string;
      description: string;
      excerpt: string;
      price: number;
      tags: string[];
      thumbnail: string;
      images: string[];
  }]
}
  

export type CustomError = {
    message: string
    status: number
}

export type NewUser = {
    email: string,
    password: string,
    username: string,
    createdAt?: Date,
    updatedAt?: Date
}

export type LoginUser = {
    email: string,
    password: string,
}

