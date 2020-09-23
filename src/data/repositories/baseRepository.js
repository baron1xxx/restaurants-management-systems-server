export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.findAll();
  }

  getById(id) {
    return this.model.findByPk(id);
  }

  getOne(findObj) {
    const where = {};
    Object.assign(where, findObj);
    return this.model.findOne({ where });
  }

  create(data) {
    return this.model.create(data);
  }

  async updateById(findObj, data) {
    const [result] = await this.model.update(data, {
      where: { ...findObj }
    });
    return result === 1;
  }

  deleteById(findObj) {
    return this.model.destroy({
      where: { ...findObj }
    });
  }
}
