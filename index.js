const axios = require('axios')
const cheerio = require('cheerio')


const LeanResponse = (html) => {

    return Promise.all(html('#imprimible').map(async (_, element) => {
        return {
            title: html(element).find('.text-center').text(),
            body_element: html(element).find('p'),
            strongs: html(element).find('strong')
        }
    }).get())
}


const parseBody = (body, html) => {
    return body.body_element.map((_, element) => {
        return {
            number: _ + 1,
            body: regexParse(html(element).text())
        }
    }).get()
}

const regexParse = (daa) => daa.replace(new RegExp("[0-9]", "g"), " ").replace(".", '').trim()

const toSliceArray = (data, body, html) => {
    let filt = ''
    return data.strongs.map((_, element) => {
        
    }).get()

}


const SearchNoticies = async (LeanResponse) => {
    try {
        const response = await axios({ url: 'https://www.bibliatodo.com/pt/a-biblia/nova-versao-internacional/genesis-4', method: 'get' })
        const html = cheerio.load(response.data)
        let objectReturn = await LeanResponse(html)
        objectReturn = objectReturn[0]
        const body = await parseBody(objectReturn, html)
        return body
    } catch (err) {
        throw new Error(err)
    }
}
(async () => {
    const search = await SearchNoticies(LeanResponse)
    console.log('search', JSON.stringify(search, null, 2))
})();
