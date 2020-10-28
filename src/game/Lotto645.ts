import axios from 'axios'
import cheerio from 'cheerio'
import iconv from 'iconv-lite'
import accounting from "accounting"

export interface Lotto645Result {
    drawNo: number
    drawDate: string
    winningNumbers: number[]
    bonusNumber: number
    winners: Lotto645Winner[]
    totalSellAmount: number
}

export interface Lotto645Winner {
    rank: number
    totalWinningAmount: number
    numberOfWinning: number
    winningAmountPerGame: number
}

export default class Lotto645 {

    /**
     * drawNo 회차의 당첨 결과를 가져온다
     *
     * @param drawNo 회차
     */
    async getResult(drawNo: number): Promise<Lotto645Result> {
        const response = await axios.get('https://www.dhlottery.co.kr/gameResult.do', {
            params: {
                method: 'byWin',
                drwNo: drawNo
            },
            responseType: 'arraybuffer'
        })
        const $ = cheerio.load(iconv.decode(response.data, 'euc-kr'))

        // 실제 회차 정보
        const realDrawNo = parseInt($('#article > div:nth-child(2) > div > div.win_result > h4 > strong').text())

        // Winners 정보
        const winners: Lotto645Winner[] = []

        // 날짜
        const drawDateText = $('div.win_result > p').text()
        const dateRegex = new RegExp(/(\d{4})년.(\d{2})월.(\d{2})일/)
        const [_, year, month, day] = dateRegex.exec(drawDateText)
        const drawDate = `${year}-${month}-${day}`

        // 당첨번호
        const winningNumbers = $('div.win_result > div > div.num.win > p > span.ball_645').toArray().map(e => parseInt($(e).text()))
        const bonusNumber = parseInt($('div.win_result > div > div.num.bonus > p > span').text())

        // 당첨정보
        for (let i = 0; i < 5; i++) {
            const rank = i + 1
            const totalWinningAmount = accounting.unformat($(`#article > div:nth-child(2) > div > table > tbody > tr:nth-child(${rank}) > td:nth-child(2)`).text())
            const numberOfWinning = accounting.unformat($(`#article > div:nth-child(2) > div > table > tbody > tr:nth-child(${rank}) > td:nth-child(3)`).text())
            const winningAmountPerGame = accounting.unformat($(`#article > div:nth-child(2) > div > table > tbody > tr:nth-child(${rank}) > td:nth-child(4)`).text())

            winners.push({rank, totalWinningAmount, numberOfWinning, winningAmountPerGame})
        }

        // 총 판매금액
        const totalSellAmount = accounting.unformat($('#article > div:nth-child(2) > div > ul > li:nth-child(2) > strong').text())

        return {
            drawNo: realDrawNo,
            drawDate,
            winningNumbers,
            bonusNumber,
            winners,
            totalSellAmount
        }
    }

    /**
     * 가장 최근 회차의 당첨 결과를 가져온다
     */
    async getLatestResult(): Promise<Lotto645Result> {
        return this.getResult(undefined);
    }
}
