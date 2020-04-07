# multiple-repositories-dispatch

An action to dispatch event to multiple repositories.

### How to use

```yml
- name: Dispatch event
  uses: guilouro/multiple-repositories-dispatch@v1
  with:
    repo_token: ${{ secrets.REPO_TOKEN }}
    event_type: event_name
    repositories: |
      user/repo1
      user/repo2
    client_payload: '{"github": ${{ toJson(github) }}}'
```

### Action params

| Name           | Required | Description                                                                                                                                                                                                 | Default |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| repo_token     | `true`   | The [Personal Access Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with `repo` scope of the project which will receive the event |         |
| event_type     | `true`   | Event type name that will be used in `on: repository_dispatch`                                                                                                                                              |         |
| repositories   | `true`   | A list of repositories that will receive the event. `org/repo`                                                                                                                                              |         |
| client_payload | `false`  | JSON payload with extra. data                                                                                                                                                                               | `{}`    |

_Obs: The client_payload is able to send a json with a maximum of 10 top-level as a specification of Github API. Therefore, set the value as this example below when need more than 10_

`client_payload: '{"github": ${{ toJson(github) }}}'`

## License

[MIT](LICENSE)
