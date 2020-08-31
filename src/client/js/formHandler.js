import { validateText } from './textValidate'
import { getMeaning } from './apiGetter'
import { getKey } from './keyGetter'
import { polarityGet } from './scoreTag'
import { updateUI } from './uiHandler'

const handleSubmit = async (event) => {
    event.preventDefault()
    let formText = document.getElementById('article').value

    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='
    const endTag = '&model=general&lang=en'

    const textURI = '&of=json&txt=' + encodeURI(formText)

    Client.validateText(formText)
    const apiKey = await Client.getKey()

    const meaningObj = await Client.getMeaning(baseURL, apiKey, textURI, endTag)

    console.log(meaningObj);
    const polarity = await Client.polarityGet(meaningObj.score_tag)

    Client.updateUI(polarity, meaningObj.agreement, meaningObj.subjectivity, meaningObj.confidence, meaningObj.irony)
}

export {
    validateText,
    getKey,
    getMeaning,
    polarityGet,
    updateUI,
    handleSubmit
 }
