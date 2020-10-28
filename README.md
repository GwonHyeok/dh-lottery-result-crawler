# 동행복권 결과 크롤러

### CLI

#### 600 회차의 결과를 result.json 파일로 저장
```shell script
yarn ts-node src/index.ts -n 600 -o ./result.json 
```

#### 가장 최근 회차의 결과를 result.json 파일로 저장
```shell script
yarn ts-node src/index.ts -o ./result.json 
```

### Programmatically

#### 600 회차의 결과를 프로그래밍 방식으로 사용
```typescript
import Lotto645 from '@/src/game/Lotto645'

const lotto645 = new Lotto645()
await lotto645.getResult(600)
```

#### 가장 최근 회차의 결과를 프로그래밍 방식으로 사용
```typescript
import Lotto645 from '@/src/game/Lotto645'

const lotto645 = new Lotto645()
await lotto645.getLatestResult()
```

### Result Example
```json
{
  "drawNo": 1,
  "drawDate": "2002-12-07",
  "winningNumbers": [
    10,
    23,
    29,
    33,
    37,
    40
  ],
  "bonusNumber": 16,
  "winners": [
    {
      "rank": 1,
      "totalWinningAmount": 0,
      "numberOfWinning": 0,
      "winningAmountPerGame": 0
    },
    {
      "rank": 2,
      "totalWinningAmount": 143934100,
      "numberOfWinning": 1,
      "winningAmountPerGame": 143934100
    },
    {
      "rank": 3,
      "totalWinningAmount": 143934000,
      "numberOfWinning": 28,
      "winningAmountPerGame": 5140500
    },
    {
      "rank": 4,
      "totalWinningAmount": 287695800,
      "numberOfWinning": 2537,
      "winningAmountPerGame": 113400
    },
    {
      "rank": 5,
      "totalWinningAmount": 401550000,
      "numberOfWinning": 40155,
      "winningAmountPerGame": 10000
    }
  ],
  "totalSellAmount": 3681782000
}
```

### Test
> 1회차 500회차 900회차의 결과를 비교하여 크롤러가 작동하는지 확인
```shell script
yarn jest
```
