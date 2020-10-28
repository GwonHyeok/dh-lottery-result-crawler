import Lotto645 from "../src/game/Lotto645";

test('로또 6/45 결과 적합성 테스트', async () => {
    const lotto645 = new Lotto645()

    // 1회차 데이터 확인
    const resultNo1 = await lotto645.getResult(1);
    expect(resultNo1).toEqual(realResultNo1)

    // 500회차 데이터 확인
    const resultNo500 = await lotto645.getResult(500);
    expect(resultNo500).toEqual(realResultNo500)

    // 900회차 데이터 확인
    const resultNo900 = await lotto645.getResult(900);
    expect(resultNo900).toEqual(realResultNo900)
})

const realResultNo1 = {
    drawNo: 1,
    drawDate: '2002-12-07',
    winningNumbers: [10, 23, 29, 33, 37, 40],
    bonusNumber: 16,
    winners: [
        {
            rank: 1,
            totalWinningAmount: 0,
            numberOfWinning: 0,
            winningAmountPerGame: 0
        },
        {
            rank: 2,
            totalWinningAmount: 143934100,
            numberOfWinning: 1,
            winningAmountPerGame: 143934100
        },
        {
            rank: 3,
            totalWinningAmount: 143934000,
            numberOfWinning: 28,
            winningAmountPerGame: 5140500
        },
        {
            rank: 4,
            totalWinningAmount: 287695800,
            numberOfWinning: 2537,
            winningAmountPerGame: 113400
        },
        {
            rank: 5,
            totalWinningAmount: 401550000,
            numberOfWinning: 40155,
            winningAmountPerGame: 10000
        }
    ],
    totalSellAmount: 3681782000
}

const realResultNo500 = {
    drawNo: 500,
    drawDate: '2012-06-30',
    winningNumbers: [3, 4, 12, 20, 24, 34],
    bonusNumber: 41,
    winners: [
        {
            rank: 1,
            totalWinningAmount: 12159651375,
            numberOfWinning: 9,
            winningAmountPerGame: 1351072375
        },
        {
            rank: 2,
            totalWinningAmount: 2026608624,
            numberOfWinning: 68,
            winningAmountPerGame: 29803068
        },
        {
            rank: 3,
            totalWinningAmount: 2026609392,
            numberOfWinning: 1831,
            winningAmountPerGame: 1106832
        },
        {
            rank: 4,
            totalWinningAmount: 4248950000,
            numberOfWinning: 84979,
            winningAmountPerGame: 50000
        },
        {
            rank: 5,
            totalWinningAmount: 6544315000,
            numberOfWinning: 1308863,
            winningAmountPerGame: 5000
        }
    ],
    totalSellAmount: 54012267000
}

const realResultNo900 = {
    drawNo: 900,
    drawDate: '2020-02-29',
    winningNumbers: [7, 13, 16, 18, 35, 38],
    bonusNumber: 14,
    winners: [
        {
            rank: 1,
            totalWinningAmount: 20099108250,
            numberOfWinning: 6,
            winningAmountPerGame: 3349851375
        },
        {
            rank: 2,
            totalWinningAmount: 3349851411,
            numberOfWinning: 51,
            winningAmountPerGame: 65683361
        },
        {
            rank: 3,
            totalWinningAmount: 3349851750,
            numberOfWinning: 2385,
            winningAmountPerGame: 1404550
        },
        {
            rank: 4,
            totalWinningAmount: 5656600000,
            numberOfWinning: 113132,
            winningAmountPerGame: 50000
        },
        {
            rank: 5,
            totalWinningAmount: 9364275000,
            numberOfWinning: 1872855,
            winningAmountPerGame: 5000
        }
    ],
    totalSellAmount: 83639372000
}
