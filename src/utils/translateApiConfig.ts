const { Translate } = require('@google-cloud/translate').v2

let translate: any

export const setConfig = async () => {
  console.log("setConfig")
  translate = new Translate({
    credentials: {
      client_email: process.env.REACT_APP_GCP_CLIENT_EMAIL ?? ''.replace(/\\n/g, '\n'),
      private_key: process.env.REACT_APP_GCP_PRIVATE_KEY ?? ''.replace(/\\n/g, '\n')
    },
    projectId: process.env.REACT_APP_GCP_PROJECT_ID ?? ''.replace(/\\n/g, '\n')
  })
}

export const translateText = async (
  text: string | Array<string>,
  targetLanguage: string
) => {
  console.log("translateText")
  try {
    const [response] = await translate.translate(text, targetLanguage)
    let result: string | Array<string> = response

    if (Array.isArray(response)) {
      result = response.map((val: string, index) =>
        val !== '' ? val : text[index]
      )
    }
    return result
  } catch (error) {
    console.error('Error translate api =>', `${error}`)
    return text
  }
}
