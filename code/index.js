import got from 'got'
function socialMediaEndpointGenerator(username) {
    const root = "https://api.github.com/users/"
    const stem = "/social_accounts"

    const url = root + username + stem

    return url
}


async function invokeSocialMediaAPI(username) {
    const endpointUrl = socialMediaEndpointGenerator(username)
    const results = await got(endpointUrl)
    return results.body
}

async function main() {
    const result = await invokeSocialMediaAPI("hawkinsw")
    const socialUrls = JSON.parse(result)
    console.log("provider's name: " + socialUrls[0].provider)
}

await main()