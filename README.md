# GitHub Actions Problem Matcher

Attaches a problem matcher that looks for errors during Sphinx builds.

## Usage

Run this action before building cods:

```yml
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: python -m pip install --editable '.[doc]'
      - uses: taminomara/sphinx-problem-matcher@v1
      - run: cd docs && make html
```

**Note:** if you're installing your package to site-packages, you'll need to do it in editable mode.
Otherwise, github won't link files properly.

**Note:** this action doesn't handle actually building docs.

## Example

See the example usage in [taminomara/yuio].

[taminomara/yuio]: https://github.com/taminomara/yuio/blob/main/.github/workflows/docs.yaml

## Options

Name | Allowed values | Description
-- | -- | --
`action` | `add` (default), `remove` | If the problem matcher should be registered or removed

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
