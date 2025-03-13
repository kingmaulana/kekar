/* eslint-disable @typescript-eslint/no-unused-vars */


import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI as string // type casting

const client = new MongoClient(uri)

const database = client.db("gc02-fase3")

export default database;