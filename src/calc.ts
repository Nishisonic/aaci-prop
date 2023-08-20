import { UserShip } from "./UserShip";
import { AACIRate, Parameter } from "../index";

const LIST: Readonly<{
  [key: number]: Parameter;
}> = {
  1: { kind: 1, priority: 11, fixed: 7, prop: 1.7, value: 65 },
  2: { kind: 2, priority: 16, fixed: 6, prop: 1.7, value: 58 },
  3: { kind: 3, priority: 26, fixed: 4, prop: 1.6, value: 50 },
  4: { kind: 4, priority: 15, fixed: 6, prop: 1.5, value: 52 },
  5: { kind: 5, priority: 27, fixed: 4, prop: 1.5, value: 55 },
  6: { kind: 6, priority: 28, fixed: 4, prop: 1.45, value: 40 },
  7: { kind: 7, priority: 36, fixed: 3, prop: 1.35, value: 45 },
  8: { kind: 8, priority: 33, fixed: 4, prop: 1.4, value: 50 },
  9: { kind: 9, priority: 45, fixed: 2, prop: 1.3, value: 40 },
  10: { kind: 10, priority: 6, fixed: 8, prop: 1.65, value: 60 },
  11: { kind: 11, priority: 9, fixed: 6, prop: 1.5, value: 55 },
  12: { kind: 12, priority: 40, fixed: 3, prop: 1.25, value: 45 },
  13: { kind: 13, priority: 34, fixed: 4, prop: 1.35, value: 35 },
  14: { kind: 14, priority: 25, fixed: 4, prop: 1.45, value: 63 },
  15: { kind: 15, priority: 35, fixed: 3, prop: 1.3, value: 56 },
  16: { kind: 16, priority: 24, fixed: 4, prop: 1.4, value: 62 },
  17: { kind: 17, priority: 42, fixed: 2, prop: 1.25, value: 55 },
  18: { kind: 18, priority: 43, fixed: 2, prop: 1.2, value: 60 },
  19: { kind: 19, priority: 21, fixed: 5, prop: 1.45, value: 58 },
  20: { kind: 20, priority: 37, fixed: 3, prop: 1.25, value: 65 },
  21: { kind: 21, priority: 22, fixed: 5, prop: 1.45, value: 60 },
  22: { kind: 22, priority: 44, fixed: 2, prop: 1.2, value: 59 },
  23: { kind: 23, priority: 46, fixed: 1, prop: 1.05, value: 80 },
  24: { kind: 24, priority: 38, fixed: 3, prop: 1.25, value: 54 },
  25: { kind: 25, priority: 10, fixed: 7, prop: 1.55, value: 61 },
  26: { kind: 26, priority: 14, fixed: 6, prop: 1.4, value: 60 },
  27: { kind: 27, priority: 19, fixed: 5, prop: 1.55, value: 55 },
  28: { kind: 28, priority: 29, fixed: 4, prop: 1.4, value: 55 },
  29: { kind: 29, priority: 23, fixed: 5, prop: 1.55, value: 60 },
  30: { kind: 30, priority: 32, fixed: 3, prop: 1.3, value: 44 },
  31: { kind: 31, priority: 41, fixed: 2, prop: 1.25, value: 53 },
  32: { kind: 32, priority: 39, fixed: 3, prop: 1.2, value: 37 },
  33: { kind: 33, priority: 31, fixed: 3, prop: 1.35, value: 44 },
  34: { kind: 34, priority: 12, fixed: 7, prop: 1.6, value: 60 },
  35: { kind: 35, priority: 17, fixed: 6, prop: 1.55, value: 55 },
  36: { kind: 36, priority: 18, fixed: 6, prop: 1.55, value: 55 },
  37: { kind: 37, priority: 30, fixed: 4, prop: 1.45, value: 40 },
  38: { kind: 38, priority: 1, fixed: 10, prop: 1.85, value: 59 },
  39: { kind: 39, priority: 2, fixed: 10, prop: 1.7, value: 55 },
  40: { kind: 40, priority: 3, fixed: 10, prop: 1.7, value: 55 },
  41: { kind: 41, priority: 5, fixed: 9, prop: 1.65, value: 59 },
  42: { kind: 42, priority: 4, fixed: 10, prop: 1.65, value: 64 },
  43: { kind: 43, priority: 7, fixed: 8, prop: 1.6, value: 59 },
  44: { kind: 44, priority: 13, fixed: 6, prop: 1.6, value: 54 },
  45: { kind: 45, priority: 20, fixed: 5, prop: 1.55, value: 50 },
  46: { kind: 46, priority: 8, fixed: 8, prop: 1.55, value: 50 },
};

export function calc(ships: readonly UserShip[]): AACIRate[] {
  const UK_SHIPS = [67, 78, 82, 88, 108, 112];
  return ships
    .map((ship) => {
      const list: number[] = [];
      /** 大口径主砲 */
      const lMainGun = ship.equipments.filter(
        ({ api_type }) => api_type[2] === 3,
      ).length;
      /** 電探 */
      const radar = ship.equipments.filter(
        ({ api_type }) => api_type[3] === 11,
      ).length;
      /** 対空電探 */
      const aaRadar = ship.equipments.filter(
        ({ api_type, api_tyku }) => api_type[3] === 11 && api_tyku >= 2,
      ).length;
      /** 高角砲 */
      const haGun = ship.equipments.filter(
        ({ api_type }) => api_type[3] === 16,
      ).length;
      /** 対空7以下の高角砲 */
      const haGunNormal = ship.equipments.filter(
        ({ api_type, api_tyku }) => api_type[3] === 16 && api_tyku <= 7,
      ).length;
      /** 対空8以上の高角砲(特殊高角砲) */
      const haGunFD = ship.equipments.filter(
        ({ api_type, api_tyku }) => api_type[3] === 16 && api_tyku >= 8,
      ).length;
      /** 三式弾 */
      const type3Shell = ship.equipments.filter(
        ({ api_type }) => api_type[2] === 18,
      ).length;
      /** 機銃 */
      const aaGun = ship.equipments.filter(
        ({ api_type }) => api_type[2] === 21,
      ).length;
      /** 対空3以上8以下の機銃 */
      const aaGunNormal = ship.equipments.filter(
        ({ api_type, api_tyku }) =>
          api_type[2] === 21 && api_tyku >= 3 && api_tyku <= 8,
      ).length;
      /** 対空4以上の機銃 */
      const aaGun4 = ship.equipments.filter(
        ({ api_type, api_tyku }) => api_type[2] === 21 && api_tyku >= 4,
      ).length;
      /** 対空6以上の機銃 */
      const aaGun6 = ship.equipments.filter(
        ({ api_type, api_tyku }) => api_type[2] === 21 && api_tyku >= 6,
      ).length;
      /** 対空9以上の機銃(特殊機銃) */
      const aaGunCD = ship.equipments.filter(
        ({ api_type, api_tyku }) => api_type[2] === 21 && api_tyku >= 9,
      ).length;
      /** 高射装置 */
      const aaFD = ship.equipments.filter(
        ({ api_type }) => api_type[2] === 36,
      ).length;
      const count = (id: number) =>
        ship.equipments.filter(({ api_id }) => api_id === id).length;

      // 秋月型は5, 7, 8種が出ない
      if (ship.api_ctype === 54) {
        if (haGun >= 2 && radar) {
          // 高角砲x2/電探(秋月型)
          list.push(1);
        }
        if (haGun && radar) {
          // 高角砲/電探(秋月型)
          list.push(2);
        }
        if (haGun >= 2) {
          // 高角砲x2(秋月型)
          list.push(3);
        }
      } else {
        if (haGunFD >= 2 && aaRadar) {
          // 大口径主砲/三式弾/高射装置/対空電探
          list.push(5);
        }
        if (aaFD && haGun && aaRadar) {
          // 高角砲/高射装置/対空電探
          list.push(7);
        }
        if (haGunFD && aaRadar) {
          // 高角砲+高射装置/対空電探
          list.push(8);
        }
      }
      if (lMainGun && type3Shell && aaFD && aaRadar) {
        // 大口径主砲/三式弾/高射装置/対空電探
        list.push(4);
      }
      if (lMainGun && type3Shell && aaFD) {
        // 大口径主砲/三式弾/高射装置
        list.push(6);
      }
      if (haGun && aaFD) {
        // 高角砲/高射装置
        list.push(9);
      }
      // 摩耶改二は13種が出ない
      if (ship.api_id === 428) {
        if (haGun && aaGunCD && aaRadar) {
          // 高角砲/特殊機銃/対空電探(摩耶改二)
          list.push(10);
        }
        if (haGun && aaGunCD) {
          // 高角砲/特殊機銃(摩耶改二)
          list.push(11);
        }
      } else {
        if (haGunFD && aaGunCD && aaRadar) {
          // 高角砲/特殊機銃/対空電探
          list.push(13);
        }
      }
      if (aaGunCD && aaGun >= 2 && aaRadar) {
        // 特殊機銃/機銃/電探
        list.push(12);
      }
      if (ship.api_id === 141 && haGun && aaGun) {
        if (aaRadar) {
          // 高角砲/機銃/対空電探(五十鈴改二)
          list.push(14);
        }
        // 高角砲/機銃(五十鈴改二)
        list.push(15);
      }
      if ([470, 622].includes(ship.api_id) && haGun && aaGun) {
        if (aaRadar) {
          // 高角砲/機銃/対空電探(霞改二乙)
          list.push(16);
        }
        // 高角砲/機銃(霞改二乙)
        list.push(17);
      }
      if (ship.api_id === 418 && aaGunCD) {
        // 特殊機銃(皐月改二)
        list.push(18);
      }
      if (ship.api_id === 487 && aaGunCD) {
        if (haGunNormal) {
          // 高角砲(非高射装置)/特殊機銃(鬼怒改二)
          list.push(19);
        }
        // 特殊機銃(鬼怒改二)
        list.push(20);
      }
      if (ship.api_id === 488 && haGun && aaRadar) {
        // 高角砲/対空電探(由良改二)
        list.push(21);
      }
      if (ship.api_id === 548 && aaGunCD) {
        // 特殊機銃(文月改二)
        list.push(22);
      }
      if ([539, 530].includes(ship.api_id) && aaGunNormal) {
        // 機銃(対空3~8機銃)(UIT-25/伊504)
        list.push(23);
      }
      if ([477, 478].includes(ship.api_id) && haGun && aaGunNormal) {
        // 高角砲/機銃(対空3~8機銃)(天龍型改二)
        list.push(24);
      }
      if (
        [82, 88, 553, 554].includes(ship.api_id) &&
        count(274) &&
        type3Shell &&
        aaRadar
      ) {
        // 12cm30連装噴進砲改二/三式弾/対空電探(伊勢型改(二))
        list.push(25);
      }
      if ([546, 911, 916].includes(ship.api_id) && count(275) && aaRadar) {
        // 10cm連装高角砲改+増設機銃/対空電探(大和型改二)
        list.push(26);
      }
      if (ship.api_id === 321 && count(275) && count(274) && aaRadar) {
        // 10cm連装高角砲改＋増設機銃/12cm30連装噴進砲改二/対空電探(大淀改)
        list.push(27);
      }
      if (
        [82, 88, 553, 554, 148, 546].includes(ship.api_id) &&
        count(274) &&
        aaRadar
      ) {
        // 12cm30連装噴進砲改二/対空電探(伊勢型改(二)/武蔵改(二))
        list.push(28);
      }
      if ([557, 558].includes(ship.api_id) && haGun && aaRadar) {
        // 高角砲/対空電探(浜風乙改/磯風乙改)
        list.push(29);
      }
      if ([477, 579, 630].includes(ship.api_id) && haGun >= 3) {
        // 高角砲x3(天龍改二/Gotland改)
        list.push(30);
      }
      if (ship.api_id === 477 && haGun >= 2) {
        // 高角砲x2(天龍改二)
        list.push(31);
      }
      if (
        (UK_SHIPS.includes(ship.api_ctype) ||
          [149, 150, 151, 152, 591, 592, 593, 954].includes(ship.api_id)) &&
        (count(301) >= 2 || (count(300) && count(191) + count(301)))
      ) {
        // 20連装7inch UP Rocket Launchersx2(英国艦/金剛型改二)
        // 16inch Mk.I三連装砲改+FCR type284 or 20連装7inch UP Rocket Launchers/QF 2ポンド8連装ポンポン砲(英国艦/金剛型改二)
        list.push(32);
      }
      if ([579, 630].includes(ship.api_id) && haGun && aaGun4) {
        // 高角砲/機銃(対空4以上)(Gotland改)
        list.push(33);
      }
      if (ship.api_ctype === 91) {
        if (count(308) >= 2) {
          // 5inch単装砲 Mk.30改+GFCS Mk.37x2(Fletcher級)
          list.push(34);
        }
        if (count(308) && count(284) + count(313)) {
          // 5inch単装砲 Mk.30改+GFCS Mk.37/5inch単装砲 Mk.30改(Fletcher級)
          list.push(35);
        }
        if (count(284) + count(313) >= 2 && count(307)) {
          // 5inch単装砲 Mk.30改x2/GFCS Mk.37(Fletcher級)
          list.push(36);
        }
        if (count(313) >= 2) {
          // 5inch単装砲 Mk.30改x2(Fletcher級)
          list.push(37);
        }
      }
      if (ship.api_ctype === 99) {
        if (count(363) >= 2) {
          // GFCS Mk.37+5inch連装両用砲(集中配備)x2(Atlanta級)
          list.push(38);
        }
        if (count(363) && count(362)) {
          // GFCS Mk.37+5inch連装両用砲(集中配備)/5inch連装両用砲(集中配備)(Atlanta級)
          list.push(39);
        }
        if (count(363) + count(362) >= 2 && count(307)) {
          // (GFCS Mk.37+)5inch連装両用砲(集中配備)x2/GFCS Mk.37(Atlanta級)
          list.push(40);
        }
        if (count(363) + count(362) >= 2) {
          // (GFCS Mk.37+)5inch連装両用砲(集中配備)x2(Atlanta)
          list.push(41);
        }
      }
      if ([546, 911, 916].includes(ship.api_id)) {
        // まだ増えそうな気配があるので変数分離
        const yamatoRadar = count(142) + count(460);
        if (count(464) >= 2 && aaGun6 && yamatoRadar) {
          // 10cm連装高角砲群 集中配備x2/機銃(対空6以上)/大和型電探(大和型改二)
          list.push(42);
        }
        if (count(464) >= 2 && yamatoRadar) {
          // 10cm連装高角砲群 集中配備x2/大和型電探(大和型改二)
          list.push(43);
        }
        if (count(464) && aaGun6 && yamatoRadar) {
          // 10cm連装高角砲群 集中配備/機銃(対空6以上)/大和型電探(大和型改二)
          list.push(44);
        }
        if (count(464) && yamatoRadar) {
          // 10cm連装高角砲群 集中配備/大和型電探(大和型改二)
          list.push(45);
        }
      }
      if (
        ship.api_id === 593 &&
        count(502) + count(503) &&
        aaGunCD &&
        aaRadar
      ) {
        // 35.6cm連装砲改三(ダズル迷彩仕様)or35.6cm連装砲改四/特殊機銃/対空電探(榛名改二乙)
        list.push(46);
      }
      return list;
    })
    .flat()
    .map((id) => LIST[id])
    .sort((a, b) => Math.sign(a.priority - b.priority))
    .reduce<{
      rate: number;
      rates: { kind: number; rate: number }[];
    }>(
      (p, { kind, value }) => {
        const rate = ((1 - p.rate) * value) / 100;
        p.rate += rate;
        const tmp = p.rates.pop();
        if (tmp === undefined) {
          p.rates.push({ kind, rate });
        } else if (tmp.kind !== kind) {
          p.rates.push(tmp, { kind, rate });
        } else {
          p.rates.push({ kind, rate: tmp.rate + rate });
        }
        return p;
      },
      {
        rate: 0,
        rates: [],
      },
    )
    .rates.map(({ kind, rate }): AACIRate => ({ ...LIST[kind], rate }));
}
