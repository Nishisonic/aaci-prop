import { UserShip } from "./UserShip";
import { calc } from "./calc";
import { AACIRate, Apidata, MasterItem, MasterShip, Ship } from "../index";
import { readFileSync } from "fs";

export default function (
  ships: Ship[],
  apidata: Apidata = JSON.parse(
    readFileSync("static/START2.json", "utf8").toString(),
  ),
): AACIRate[] {
  const masterShip: Readonly<{
    [key: number]: MasterShip;
  }> = apidata.api_mst_ship.reduce(
    (previous: { [key: number]: MasterShip }, current: MasterShip) => {
      previous[current.api_id] = current;
      return previous;
    },
    {},
  );
  const masterItem: Readonly<{
    [key: number]: MasterItem;
  }> = apidata.api_mst_slotitem.reduce(
    (previous: { [key: number]: MasterItem }, current: MasterItem) => {
      previous[current.api_id] = current;
      return previous;
    },
    {},
  );

  const userShips: Readonly<UserShip[]> = ships.map(
    (ship): UserShip => ({
      ...(masterShip[ship.shipId] ?? { api_id: ship.shipId }),
      equipments: ship.equipmentIds.map(
        (id) => masterItem[id] ?? { api_id: id, api_type: [0, 0, 0, 0, 0] },
      ),
    }),
  );

  return calc(userShips);
}
