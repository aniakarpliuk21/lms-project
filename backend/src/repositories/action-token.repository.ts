import { IActionToken } from "../interfaces/action-token.interface";
import { ActionToken } from "../model/action-token.model";

class ActionTokenRepository {
  public async create(dto: Partial<IActionToken>): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }
  public async findByParams(
    params: Partial<IActionToken>,
  ): Promise<IActionToken> {
    return await ActionToken.findOne(params);
  }
  public async deleteByParams(params: Partial<IActionToken>): Promise<void> {
    await ActionToken.deleteOne(params);
  }
}
export const actionTokenRepository = new ActionTokenRepository();
