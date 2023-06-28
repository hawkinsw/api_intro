// copied from stack overflow:
function fmt([fisrt, ...rest], ...tags) {
    return values => rest.reduce((acc, curr, i) => {
        return acc + values[tags[i]] + curr;
    }, fisrt);
}

/*
const GITHUB_TEMPLATE = fmt`https://api.github.com/users/${'username'}/social_accounts`

function download_socialmedia_links() {
    const pfetch = fetch(GITHUB_TEMPLATE({ username: "hawkinsw" }))
    return pfetch.then(async (response) => {
        var done = false
        var output = ""
        const reader = response.body.getReader()
        while (!done) {
            ({value: _output, done: _done} = await reader.read())
            output += (new TextDecoder("utf8")).decode(_output)
            done = _done
        }
        console.log(`data: ${output}`)
        console.log(output)
    }, (error) => {
        console.log("Failure: " + error)
    })
}
*/

import got from 'got'

const GITHUB_TEMPLATE = fmt`https://api.github.com/users/${'username'}/social_accounts`

async function download_socialmedia_links(username) {
    const result = await got(GITHUB_TEMPLATE({ username: username })).json()
    console.log(`You can find ${username} on the socials at:`)
    for (var ind of result) {
        console.log(`${ind.provider}: ${ind.url}`)
    }
}

async function main() {
    await download_socialmedia_links("hawkinsw")
}

main()