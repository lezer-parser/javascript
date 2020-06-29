## 0.9.1 (2020-06-29)

### Bug fixes

Fix accidental use of non-ES5 library methods.

## 0.9.0 (2020-06-08)

### Breaking changes

Upgrade to 0.9 parser serialization

## 0.8.4 (2020-05-30)

### Bug fixes

Fix the package.json `main` field pointing at the wrong file, breaking the library in node versions older than 13.

## 0.8.3 (2020-04-09)

### Bug fixes

Regenerate parser with a fix in lezer-generator so that the top node prop is properly assigned.

## 0.8.2 (2020-04-01)

### Bug fixes

Make the package load as an ES module on node

## 0.8.1 (2020-02-28)

### New features

Provide an ES module file.

## 0.8.0 (2020-02-03)

### Bug fixes

Add support for the spread ... operator in array literals.

### New features

Follow 0.8.0 release of the library.

Add support for nullish coalescing and optional chaining.

## 0.7.0 (2020-01-20)

### Breaking changes

Use the lezer 0.7.0 parser format.

## 0.5.2 (2020-01-15)

### Bug fixes

Regenerate with lezer-generator 0.5.2 to avoid cyclic forced reductions.

## 0.5.1 (2019-10-22)

### Bug fixes

Fix top prop missing from build output.

## 0.5.0 (2019-10-22)

### Breaking changes

Move from `lang` to `top` prop on document node.

## 0.4.0 (2019-09-10)

### Breaking changes

Adjust to 0.4.0 parse table format.

## 0.3.0 (2019-08-22)

### New features

Go back to node names, add props, follow changes in grammar syntax.

## 0.2.0 (2019-08-02)

### New features

Use tags rather than names.

## 0.1.0 (2019-07-09)

### New Features

First documented release.
