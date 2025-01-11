/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Busboy from 'busboy'

const fileHandler = async (event: any) => await new Promise<any>((resolve, reject) => {
  try {
    const { req } = event
    const handler = {
      files: [] as any,
      fields: {} as any
    }
    const busboy = Busboy({ headers: req.headers })

    busboy.on('file', (name: string, file: any, info: any) => {
      const { filename, encoding, mimeType } = info
      const chunks: any = []

      file.on('data', (chunk: any) => {
        chunks.push(chunk)
      })

      file.on('end', () => {
        handler.files.push({
          fieldname: name,
          filename,
          encoding,
          mimetype: mimeType,
          buffer: Buffer.concat(chunks)
        })
      })
    })

    busboy.on('field', (name: any, value: any, _: any) => {
      handler.fields[name] = value
    })

    busboy.on('finish', () => {
      resolve(handler)
    })

    req.pipe(busboy)
  } catch (error) {
    reject(error)
  }
})

export default fileHandler
