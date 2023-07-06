/*
// Adapted (copied, really) from stack overflow:
function deferred_template_string([head, ...tail], ...tags) {
    return values => tail.reduce((acc, curr, i) => {
        return acc + values[tags[i]] + curr;
    }, head);
}
*/

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

import got from 'got'

const GITHUB_TEMPLATE = deferred_template_string`https://api.github.com/users/${'username'}/social_accounts`

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
*/

function socialMediaEndpointGenerator(username) {
  const root = "https://api.github.com/users/"
  const stem = "/social_accounts"

  const url = root + username + stem
  root = "https://www.bsky.app"
  return url
}

function main() {
  const endpoint = socialMediaEndpointGenerator("hawkinsw")
  console.log("Endpoint: " + endpoint)
}

main()
