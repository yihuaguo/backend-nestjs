import { Model, Op } from 'sequelize';
import { nanoid } from 'nanoid';
import { throwErr } from './utils';

export default class InitModel extends Model {
  /**
   * 通用唯一查询（主键id）
   * @param {string} id
   * @return {object}
   */
  static async findOneById(id: string): Promise<any> {
    return (await this.findByPk(id)) || {};
  }

  /**
   * 通用唯一查询（条件）
   * @param {any} where
   * @return {object}
   */
  static async findOneByCond(where: any): Promise<any> {
    try {
      return (await this.findOne({ where })) || {};
    } catch (e) {
      throwErr('查询错误！', 500);
    }
  }

  /**
   * 通用列表查询（条件）
   * @param {any} where
   * @return {Array<any>}
   */
  static async findListByCond(where: any): Promise<Array<any>> {
    try {
      return (await this.findAll({ where, raw: true })) || [];
    } catch (e) {
      throwErr('查询错误！', 500);
    }
  }

  /**
   * 通用表格分页条件查询方法
   * @param {pageIndex, pageSize, order, ...otherParams} params
   * @returns {list, count, pageSize, pageIndex}
   */
  static async findTable(params: {
    pageIndex: number;
    pageSize: number;
    order?: string;
    field?: any;
    whereParams?: any;
    whereOfLike?: any;
  }): Promise<{
    pageIndex: number;
    pageSize: number;
    list: Array<any>;
    total: number;
  }> {
    const {
      pageIndex,
      pageSize,
      order,
      field,
      whereParams,
      whereOfLike = {},
    } = params;
    const likeSearchParams = {};
    Object.entries(whereOfLike).forEach((item) => {
      if (!item[1]) return;
      likeSearchParams[item[0]] = {
        [Op.like]: `%${item[1]}%`,
      };
    });
    try {
      const { count: total, rows: list } = await this.findAndCountAll({
        attributes: field,
        where: {
          ...likeSearchParams,
          ...whereParams,
        },
        limit: pageSize,
        order: order ? [[order, 'ASC']] : [],
        offset: (pageIndex - 1) * pageSize,
        raw: true,
      });
      return {
        list,
        total,
        pageSize: Number(pageSize),
        pageIndex: Number(pageIndex),
      };
    } catch (e) {
      throwErr('表格查询错误！', 500);
    }
  }

  /**
   * 通用新增
   * @param {any} params
   * @return {object}
   */
  static async addData(params: any): Promise<object> {
    try {
      return await this.create(params);
    } catch (e) {
      throwErr('新增错误！', 500);
    }
  }

  /**
   * 通用新增（id）
   * @param {any} params
   * @return {object}
   */
  static async addDataAndId(params: any): Promise<object> {
    try {
      return await this.create({
        id: nanoid(),
        ...params,
      });
    } catch (e) {
      throwErr('新增错误！', 500);
    }
  }

  /**
   * 通用编辑（主键id）
   * @param {any} where
   * @return {void}
   */
  static async editDataById(where: {
    id: string;
    [propName: string]: any;
  }): Promise<void> {
    const { id, ...editParams } = where;
    const result = await this.update(editParams, { where: { id } });
    !result[0] && throwErr('编辑错误！', 500);
  }

  /**
   * 通用编辑（条件）
   * @param {any} where
   * @return {void}
   */
  static async editDataByCond(where: {
    editWhere: any;
    editParams: any;
  }): Promise<void> {
    const { editWhere, editParams } = where;
    const result = await this.update(editParams, { where: editWhere });
    !result[0] && throwErr('编辑错误！', 500);
  }

  /**
   * 通用删除（主键id）
   * @param {string} id
   * @return {void}
   */
  static async deleteDataById(id: string): Promise<void> {
    const result = await this.destroy({ where: { id } });
    !result && throwErr('删除错误！', 500);
  }

  /**
   * 通用删除（条件）
   * @param {any} where
   * @return {void}
   */
  static async deleteDataByCond(where: any): Promise<void> {
    const result = await this.destroy({ where });
    !result && throwErr('删除错误！', 500);
  }
}
