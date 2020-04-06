const { request } = require('@octokit/request')
const core = require('@actions/core')

;(async function () {
  try {
    const token = core.getInput('repo_token')
    const repositories = core.getInput('repositories').split(' \n')
    const eventType = core.getInput('event_type')
    const payload = core.getInput('client_payload') || '{}'

    repositories.forEach(async (repo) => {
      try {
        const post = `POST /repos/${repo}/dispatches`
        await request(post, {
          headers: { authorization: `token ${token}` },
          mediaType: { previews: ['everest'] },
          event_type: `${eventType}`,
          client_payload: JSON.parse(payload)
        })
        console.log(`${post} was done!`)
      } catch (error) {
        core.setFailed(`${repo}: ${error.message}`)
      }
    })
  } catch (error) {
    core.setFailed(error.message)
  }
})()
