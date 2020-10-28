import {program} from 'commander'
import {version} from '../package.json'
import Lotto645 from "./game/Lotto645"
import path from 'path'
import fs from 'fs/promises'

program
    .option('-n --no <number>', '로또 6/45 회차')
    .option('-o, --output <path>', '게임 결과를 저장할 파일 경로')
    .version(version)

program.parse(process.argv)

async function main() {
    const lotto645 = new Lotto645()
    const result = program.no ? await lotto645.getResult(parseInt(program.no)) : await lotto645.getLatestResult()

    if (program.output) {
        const output = path.resolve(process.cwd(), program.output)
        await fs.writeFile(output, JSON.stringify(result, null, 2))
    }
}

main().then().catch((e) => {
    console.error(e)
    process.exit(1)
})
