import wa from 'waweb-phi'

export const server = (session = false) => {
    const client = new wa({
        puppeteer: { headless: true },
        authTimeout: 30000,
        session: session
    })
    return client
}