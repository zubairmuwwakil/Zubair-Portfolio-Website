# archive/

Code that no longer ships but was worth keeping a copy of. Nothing here is
imported, and the directory sits outside every `tsconfig.json` include
(`client/src`, `shared`, `server`), so it is neither type-checked nor bundled.

Reviving a file means moving it back under `client/src/` and re-running
`npm run check` — its imports were valid when it was archived, but that is not a
promise they still are.

## ContactForm.tsx

The contact form the site used before it moved to plain `mailto:` links. Rescued
from the `backup-before-email-rewrite` branch, which was the only place it still
existed; that branch was deleted once this copy landed.

Worth knowing before reviving it: the form never had a backend. `onSubmit`
composes a `mailto:` URL and assigns `window.location.href`, which is what the
links on `/resume/` and the homepage now do directly — so it added a form's worth
of UI over the behaviour the links already have.

It also overstates what happened. After submit it renders "Your message is in my
inbox", but opening a mail client's compose window sends nothing; the visitor
still has to press send in their own client, and may not. A revived version
should say a draft was opened, not that the message arrived.
