import { problemMatcher as problemMatcherJson } from "../src/problem-matcher.json";

import type { ProblemMatcher, ProblemPattern } from "github-actions-problem-matcher-typings";
import assert from "assert";

const problemMatchers: ProblemMatcher[] = problemMatcherJson;

function match(line: string, problemPattern: ProblemPattern) {
  const regexp = new RegExp(problemPattern.regexp);
  const result = regexp.exec(line);
  if (result !== null) {
    return {
      file: problemPattern.file !== undefined ? result[problemPattern.file] : undefined,
      line: problemPattern.line !== undefined ? result[problemPattern.line] : undefined,
      column: problemPattern.column !== undefined ? result[problemPattern.column] : undefined,
      code: problemPattern.code !== undefined ? result[problemPattern.code] : undefined,
      message: problemPattern.message !== undefined ? result[problemPattern.message] : undefined,
      severity: problemPattern.severity !== undefined ? result[problemPattern.severity] : undefined,
    }
  }
}

const testCases = [
  {
    desc: "full matcher",
    log: "/Users/taminomara/Documents/yuio/docs/source/app.rst:6: ERROR: Unknown directive type \"xxx\".",
    matcher: problemMatchers[0],
    file: "/Users/taminomara/Documents/yuio/docs/source/app.rst",
    line: "6",
    message: "Unknown directive type \"xxx\".",
    severity: "ERROR",
  },
  {
    desc: "autodoc matcher",
    log: "/opt/hostedtoolcache/Python/3.8.16/x64/lib/python3.8/site-packages/yuio/app.py:docstring of yuio.app.App.SubCommand:1: WARNING: undefined label: 'foobar'",
    matcher: problemMatchers[1],
    file: "/opt/hostedtoolcache/Python/3.8.16/x64/lib/python3.8/site-packages/yuio/app.py",
    message: "docstring of yuio.app.App.SubCommand:1: WARNING: undefined label: 'foobar'",
    severity: "WARNING",
  },
  {
    desc: "loose matcher",
    log: "checking consistency... /Users/taminomara/Documents/yuio/docs/source/app.rst: WARNING: document isn't included in any toctree",
    matcher: problemMatchers[2],
    file: "/Users/taminomara/Documents/yuio/docs/source/app.rst",
    message: "document isn't included in any toctree",
    severity: "WARNING",
  },
  {
    desc: "loose matcher 2",
    log: "WARNING: dot command 'dot' cannot be run (needed for graphviz output), check the graphviz_dot setting",
    matcher: problemMatchers[3],
    message: "dot command 'dot' cannot be run (needed for graphviz output), check the graphviz_dot setting",
    severity: "WARNING",
  },
];


describe("pattern matchers", () => {
  it("has correct number of pattern matchers", () => {
    expect(problemMatchers.length).toEqual(4);
  });

  const seenOwners: string[] = [];

  for (const i in problemMatchers) {
    const problemMatcher = problemMatchers[i];
    describe(`problem matcher ${i}`, () => {
      it("has one pattern", () => {
        expect(problemMatcher.pattern.length).toEqual(1);
      });

      it("has the correct owner", () => {
        const prefix = "sphinx-problem-matcher";
        expect(problemMatcher.owner.substring(0, prefix.length)).toEqual(prefix);
      });
      it("has a unique owner", () => {
        expect(seenOwners).not.toContain(problemMatcher.owner);
        seenOwners.push(problemMatcher.owner);
      });
    });
  }
});

for (const testCase of testCases) {
  const {desc, log, matcher, file, line, message, severity} = testCase;
  const pattern = matcher.pattern[0];

describe(testCase.desc, () => {
    const result = match(log, pattern);

    it ("has one pattern", () => {
      expect(matcher.pattern.length).toEqual(1);
    });

    it("matches an error", () => {
      expect(result).not.toBeNaN();
      expect(result).not.toBeUndefined();
    });

    it ("returns correct file", () => {
      expect((result || {}).file).toEqual(file);
    });

    it ("returns correct line", () => {
      expect((result || {}).line).toEqual(line);
    });

    it ("returns correct message", () => {
      expect((result || {}).message).toEqual(message);
    });

    it ("returns correct severity", () => {
      expect((result || {}).severity).toEqual(severity);
    });
  });
}
