export interface Ship {
  /** 艦ID */
  readonly shipId: number;
  /** 装備ID */
  readonly equipmentIds: number[];
}

export interface AACIRate extends Parameter {
  /** 発動確率 */
  readonly rate: number;
}

export interface Apidata {
  readonly api_mst_ship: MasterShip[];
  readonly api_mst_slotitem: MasterItem[];
}

export interface MasterShip {
  readonly api_id: number;
  readonly api_name: string;
  readonly api_yomi: string;
  readonly api_stype: number;
  readonly api_ctype: number;
}

export interface MasterItem {
  readonly api_id: number;
  readonly api_name: string;
  readonly api_type: number[];
  readonly api_tyku: number;
}

export interface Parameter {
  /** 種別値 */
  readonly kind: number;
  /** 優先度 */
  readonly priority: number;
  /** 固定ボーナス */
  readonly fixed: number;
  /** 割合ボーナス */
  readonly prop: number;
  /** 閾値 */
  readonly value: number;
}
