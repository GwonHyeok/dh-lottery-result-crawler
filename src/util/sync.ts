import Lotto645 from "../game/Lotto645"
import dotenv from 'dotenv'
import {Storage} from '@google-cloud/storage'
import stream from 'stream'
import {File} from "@google-cloud/storage/build/src/file";

dotenv.config()

/**
 * Sync To Google Cloud Storage
 *
 * Global Environment
 *
 * GOOGLE_APPLICATION_CREDENTIALS
 */
async function syncToGoogleStorage() {
    const lotto645 = new Lotto645()
    const lastResult = await lotto645.getLatestResult()
    const lastDrawNo = lastResult.drawNo

    const storage = new Storage()
    const bucket = await storage.bucket(process.env.SYNC_GOOGLE_CLOUD_STORAGE_NAME)

    // 현재 GCS에 싱크된 상태 정보
    const [statusFiles, _, __] = await bucket.getFiles({
        prefix: 'status.json'
    })

    // 싱크가 한번이라도 돌았는지 여부
    const isNotInitialized = statusFiles.length === 0

    // 몇 회차부터 Sync 해야하는지
    let syncFrom;
    if (isNotInitialized) {
        syncFrom = 1
    } else {
        const statusFile = statusFiles[0]
        const [status] = await statusFile.download()
        const decodedStatus = JSON.parse(Buffer.from(status).toString('utf-8'))
        syncFrom = decodedStatus['drawNo'] + 1
    }
    console.log(`Sync From : ${syncFrom}`)

    for (let i = syncFrom; i <= lastDrawNo; i++) {
        const result = await lotto645.getResult(i)
        const fileName = `${i}.json`

        const bucketFile = bucket.file(fileName)
        await uploadFile(bucketFile, JSON.stringify(result))

        console.log(`Uploaded DrawNo ${i} to ${fileName}`)
    }

    // Upload Status
    const status = {drawNo: lastDrawNo, syncAt: new Date().getTime()}
    await uploadFile(bucket.file('status.json'), JSON.stringify(status))
    console.log(`Uploaded status.json`)
}

async function uploadFile(file: File, data: any) {
    const dataStream = new stream.PassThrough()
    dataStream.push(data)
    dataStream.push(null)

    return new Promise((resolve, reject) => {
        dataStream.pipe(file.createWriteStream({
            resumable: false,
            validation: false,
            metadata: {'Cache-Control': 'public, max-age=31536000'}
        }))
            .on('error', (error: Error) => reject(error))
            .on('finish', () => resolve(true))
    })
}

syncToGoogleStorage()
    .then()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
