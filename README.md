# atom-typings
These are now largely done, I've mostly focused on the parts of the API that were marked as public
and essential, submit PRs if you find anything useful missing. The parts of the API that were
deprecated in Atom 1.0 have been omitted entirely, don't submit PRs for those,
[upgrade your package](https://atom.io/docs/latest/upgrading-to-1-0-apis-upgrading-your-package)
instead.

The idea is to get these into [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped/)
but there's a bit of a backlog and a limited number of maintainers, so it'll take a while.

Here's the current status of getting these type definitions into [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped/):
- [x] [event-kit](https://github.com/borisyankov/DefinitelyTyped/tree/master/event-kit)
  - [x] PR merged
- [ ] [atom-keymap](https://github.com/enlight/atom-typings/tree/master/atom-keymap)
  - [x] [PR submitted](https://github.com/borisyankov/DefinitelyTyped/pull/4905)
  - [ ] PR merged
- [x] [first-mate](https://github.com/borisyankov/DefinitelyTyped/tree/master/first-mate)
  - [x] [PR submitted](https://github.com/borisyankov/DefinitelyTyped/pull/4906)
  - [x] PR merged
- [ ] [serializable](https://github.com/enlight/atom-typings/tree/master/serializable)
  - [ ] PR submitted
  - [ ] PR merged
- [ ] [text-buffer](https://github.com/enlight/atom-typings/tree/master/text-buffer)
  - [ ] PR submitted, depends on `serializable`
  - [ ] PR merged
- [ ] [atom](https://github.com/enlight/atom-typings/tree/master/atom)
  - [ ] PR submitted, depends on `serializable` and `text-buffer`
  - [ ] PR merged
