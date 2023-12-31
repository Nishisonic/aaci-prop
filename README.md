aaci-prop
[![npm](https://img.shields.io/npm/v/aaci-prop)](https://www.npmjs.com/package/aaci-prop)
[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/Nishisonic/aaci-prop/blob/master/LICENSE)
====

艦これ対空カットインの確率を返します

## Install

```shell
$ npm install aaci-prop
```

## Usage

```JS
import prop from "aaci-prop";

const tmp = prop([{ shipId: 1, equipmentIds: [122, 122, 27] }]);
console.log(tmp);
// [
//   { kind: 5, priority: 27, fixed: 4, prop: 1.5, value: 55, rate: 0.55 },
//   {
//     kind: 8,
//     priority: 33,
//     fixed: 4,
//     prop: 1.4,
//     value: 50,
//     rate: 0.22499999999999998
//   }
// ]
```

## Tips

### 対空カットインの確率について

TsunDB の統計結果を元にした確率を採用しています。  
艦これ改では定数を 101 で割った結果を使用していますが、このライブラリでは 100 で割った結果を使用しています。  
優先度ソース元：[対空カットイン発動優先調査　公開用](https://docs.google.com/spreadsheets/d/1agGoLv57g5eOXLXtNIKHRoBYy61OQYxibWP6Vi_DMuY/edit?usp=sharing)

| Kind | 優先度 | 固定 | 割合 | 確率 | 発動艦                            |
| :--: | :----: | :--: | :--: | :--: | --------------------------------- |
|  1   |   11   |  7   | 1.7  |  65  | 秋月型                            |
|  2   |   16   |  6   | 1.7  |  55  | 秋月型                            |
|  3   |   26   |  4   | 1.6  |  50  | 秋月型                            |
|  4   |   15   |  6   | 1.5  |  52  |                                   |
|  5   |   27   |  4   | 1.5  |  50  | 秋月型発動不可                    |
|  6   |   28   |  4   | 1.45 |  40  |                                   |
|  7   |   36   |  3   | 1.35 |  45  | 秋月型発動不可                    |
|  8   |   33   |  4   | 1.4  |  50  | 秋月型発動不可                    |
|  9   |   45   |  2   | 1.3  |  40  |                                   |
|  10  |   6    |  8   | 1.65 |  60  | 摩耶改二                          |
|  11  |   9    |  6   | 1.5  |  55  | 摩耶改二                          |
|  12  |   40   |  3   | 1.25 |  45  |                                   |
|  13  |   34   |  4   | 1.35 |  35  | 摩耶改二発動不可                  |
|  14  |   25   |  4   | 1.45 |  63  | 五十鈴改二                        |
|  15  |   35   |  3   | 1.3  |  56  | 五十鈴改二                        |
|  16  |   24   |  4   | 1.4  |  62  | 霞改二乙,夕張改二                 |
|  17  |   42   |  2   | 1.25 |  55  | 霞改二乙                          |
|  18  |   43   |  2   | 1.2  |  60  | 皐月改二                          |
|  19  |   21   |  5   | 1.45 |  58  | 鬼怒改二                          |
|  20  |   37   |  3   | 1.25 |  65  | 鬼怒改二                          |
|  21  |   22   |  5   | 1.45 |  60  | 由良改二                          |
|  22  |   44   |  2   | 1.2  |  59  | 文月改二                          |
|  23  |   46   |  1   | 1.05 |  80  | UIT-25,伊 504                     |
|  24  |   38   |  3   | 1.25 |  54  | 龍田改二                          |
|  25  |   10   |  7   | 1.55 |  60  | 伊勢型改(二)                      |
|  26  |   14   |  6   | 1.4  |  60  | 大和型改二(重)                    |
|  27  |   19   |  5   | 1.55 |  55  | 大淀改                            |
|  28  |   29   |  4   | 1.4  |  55  | 伊勢型改(二),武蔵改(二)           |
|  29  |   23   |  5   | 1.55 |  60  | 浜風乙改,磯風乙改                 |
|  30  |   32   |  3   | 1.3  |  44  | 天龍改二,Gotland 改,Gotland andra |
|  31  |   41   |  2   | 1.25 |  53  | 天龍改二                          |
|  32  |   39   |  3   | 1.2  |  51  | 英国艦,金剛型改二(乙/丙)          |
|  33  |   31   |  3   | 1.35 |  44  | Gotland 改,Gotland andra          |
|  34  |   12   |  7   | 1.6  |  56  | Fletcher 級                       |
|  35  |   17   |  6   | 1.55 |  53  | Fletcher 級                       |
|  36  |   18   |  6   | 1.55 |  53  | Fletcher 級                       |
|  37  |   30   |  4   | 1.45 |  44  | Fletcher 級                       |
|  38  |   1    |  10  | 1.85 |  59  | Atlanta 級                        |
|  39  |   2    |  10  | 1.7  |  56  | Atlanta 級                        |
|  40  |   3    |  10  | 1.7  |  55  | Atlanta 級                        |
|  41  |   5    |  9   | 1.65 |  54  | Atlanta 級                        |
|  42  |   4    |  10  | 1.65 |  64  | 大和型改二(重)                    |
|  43  |   7    |  8   | 1.6  |  59  | 大和型改二(重)                    |
|  44  |   13   |  6   | 1.6  |  54  | 大和型改二(重)                    |
|  45  |   20   |  5   | 1.55 |  50  | 大和型改二(重)                    |
|  46  |   8    |  8   | 1.55 |  60  | 榛名改二乙                        |

### バージョン命名

> vX.Y.Z

- X … 引数変更(例：改修値で対空カットイン確率が変わる仕様変更が起こった)
- Y … ソース変更(対空カットイン追加/確率修正等)
- Z … START2(マスターデータ)更新 or 本体に影響しない修正(README変更等)
