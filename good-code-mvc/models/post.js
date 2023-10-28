const mongodb = require('mongodb');

const db = require('../data/database');
const ObjectId = mongodb.ObjectId;

class Post {
  static async fetchAll() {
    return await db.getDb().collection('posts').find().toArray();
  }

  static async fetch(id) {
    const { title, content, _id } = await db
      .getDb()
      .collection('posts')
      .findOne({ _id: new ObjectId(id) });
    return new this(title, content, _id);
  }

  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    if (id) {
      this.id = new ObjectId(id);
    }
  }

  async fetch() {
    const { title, content, _id: id } = await db
      .getDb()
      .collection('posts')
      .findOne({ _id: this.id });
    this.id = id;
    this.title = title;
    this.content = content;
  }

  async save() {
    let result;

    if (this.id) {
      result = await db
        .getDb()
        .collection('posts')
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
    } else {
      result = await db.getDb().collection('posts').insertOne({
        title: this.title,
        content: this.content,
      });
    }

    return result;
  }

  async delete() {
    if (!this.id) {
      return;
    }

    const result = await db
      .getDb()
      .collection('posts')
      .deleteOne({ _id: this.id });
    return result;
  }
}

module.exports = Post;
