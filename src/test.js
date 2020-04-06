const { request } = require('@octokit/request')
const core = require('@actions/core')

const mockParams = {
  repo_token: '123',
  repositories: 'guilouro/repo1 \nguilouro/repo2 \nguilouro/repo3',
  'event-type': 'my_event',
  'client-payload': '{ "test": "123"}'
}

jest.mock('@actions/core')
jest.mock('@octokit/request')

request.mockImplementation(() => jest.fn())
core.getInput.mockImplementation((key) => mockParams[key])

describe('Action', () => {
  it('Should send post for repositories', () => {
    require('./index')
    expect(request).toBeCalledTimes(3)
    expect(request.mock.calls[0][0]).toBe(
      'POST /repos/guilouro/repo1/dispatches'
    )
    expect(request.mock.calls[1][0]).toBe(
      'POST /repos/guilouro/repo2/dispatches'
    )
    expect(request.mock.calls[2][0]).toBe(
      'POST /repos/guilouro/repo3/dispatches'
    )
  })

  it('Should use repo_token in authorization header', () => {
    require('./index')
    expect(request.mock.calls[0][1]).toMatchObject({
      headers: { authorization: `token ${mockParams.repo_token}` }
    })
  })

  it('Should send client payload in request', () => {
    require('./index')
    expect(request.mock.calls[0][1]).toMatchObject({
      client_payload: JSON.parse(mockParams['client-payload'])
    })
  })

  it('Should send event type in request', () => {
    require('./index')
    expect(request.mock.calls[0][1]).toMatchObject({
      event_type: mockParams['event-type']
    })
  })
})
