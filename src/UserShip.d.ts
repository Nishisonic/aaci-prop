import { MasterShip, MasterItem } from "../index";

export interface UserShip extends MasterShip {
  /** 装備 */
  readonly equipments: MasterItem[];
}
