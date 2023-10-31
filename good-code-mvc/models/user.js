const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

class User {
  static async fetchById(id) {
    const user = db
      .getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
    const { email, password, _id } = user;
    return new this(email, password, _id);
  }

  static async getByEmail(email) {
    const user = await db.getDb().collection('users').findOne({ email: email });
    if (!user) {
      return null;
    }

    const { password, _id } = user;
    return new this(email, password, _id);
  }

  static async alreadyExist(email) {
    return !!(await this.getByEmail(email));
  }

  static async login(email, password) {
    const user = this.getByEmail(email);
    return await bcrypt.compare(password, user.password);
  }

  constructor(email, password, id) {
    this.email = email;
    this.password = password;
    if (id) {
      this.id = new ObjectId(id);
    }
  }

  async passwordIsEqualTo(password) {
    return bcrypt.compare(password, this.password);
  }

  async login(password) {
    await bcrypt.compare(password, this.password);
  }
  
}

module.exports = User;
