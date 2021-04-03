import { Repository, SelectQueryBuilder } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

export class BaseRepository<T> extends Repository<T> {

  protected appendLikeQuery(
    query: SelectQueryBuilder<T>,
    searchQuery: string | undefined,
    fields: string[],
  ): void {
    // TODO elasticsearch is power :)
    if (searchQuery === undefined || !searchQuery.length) {
      return;
    }
    for (const field of fields) {
      // and of course this isn't secure SQL query
      for (const phase of searchQuery.split(' ')) {
        query.orWhere(`${query.alias}.${field} like "%${phase}%"`)
      }
    }
  }

  /**
   * Handle pagination
   * @param {IPaginationOptions} options
   * @param {SelectQueryBuilder} query
   */
  protected doPaginate(
    options: IPaginationOptions, query: SelectQueryBuilder<T>,
  ): Promise<Pagination<T>> {
    return paginate<T>(query, options);
  }
}
