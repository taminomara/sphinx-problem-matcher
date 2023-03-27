# GitHub Actions Problem Matcher

Attaches a problem matcher that looks for errors during Sphinx builds.

## Usage

```yml
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: taminomara/sphinx-problem-matcher@v1
      - run: cd docs && make html
```

## Options

Name | Allowed values | Description
-- | -- | --
`action` | `add` (default), `remove` | If the problem matcher should be registered or removed

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
