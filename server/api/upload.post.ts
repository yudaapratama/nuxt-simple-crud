import Stream from 'stream'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import ExcelJS from 'exceljs'
import fileHandler from '../utils/handler'

const s3Client = new S3Client({
  region: 'id',
  endpoint: 'https://nos.wjv-1.neo.id',
  credentials: {
    accessKeyId: '21a1d0900d8ad0a2b70c',
    secretAccessKey: 'uqsukHvVV6nnTJm0z99uIb/5rpnuQVAz50o/SVTL'
  },
  forcePathStyle: true
})

export default defineEventHandler(async (event) => {
  try {
    const { fields, files } = await fileHandler(event)
    const blob = new Blob([files[0].buffer])
    const file = new File([blob], files[0].filename as string)

    const fileExt = file.name.split('.').pop()
    // const buffer = fs.readFileSync(file)

    // const command = new PutObjectCommand({
    //   Bucket: 'excels',
    //   Key: files[0].filename as string,
    //   Body: files[0].buffer,
    //   ContentType: fileExt
    // })

    // await s3Client.send(command)

    const workbook = new ExcelJS.Workbook()
    const stream = new Stream.Readable()
    stream.push(files[0].buffer)
    const worksheet = await workbook.xlsx.read(stream)

    console.log(worksheet.getWorksheet())

    return {
      statusCode: 200,
      statusMessage: 'File uploaded successfully'
    }
  } catch (error) {
    console.error(error)
    throw createError({ statusMessage: 'Error uploading file' })
  }
})
