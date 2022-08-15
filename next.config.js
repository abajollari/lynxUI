module.exports = {
    // target: serverless,
    i18n: {
        locales: ['en-US', 'al'],
        defaultLocale: 'en-US',
    },
    images: {
        domains: [
            'research.stlouisfed.org',
            'hbr.org',
            'specials-images.forbesimg.com',
            'miro.medium.com',
        ],
    },
    env: {
        actionOnDispalyTime: 3000,
        rempApiKey: 'x5hbsy3o9u8dr6jumfhwyrhyo9j7p2b8j4rq353v',
        logoUrl: 'https://lynxui.azurewebsites.net/svgs/LogoText.svg',
        INFURA_API: '766c8254f4104de392184a6db207f89d',
        BLOCKCHAIN_NETWORK: 'ropsten',
    },
}
