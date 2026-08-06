import type { ReactNode } from "react";

/**
 * A deliberately small markdown renderer.
 *
 * The blog needs headings, paragraphs, lists, code, blockquotes and links — and
 * nothing else. A dependency-free subset keeps the build surface identical to
 * what it was before the blog existed. Output is React elements, never
 * dangerouslySetInnerHTML, so a malformed post can't inject markup.
 */

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  /** Site-absolute path to the share/schema image, e.g. "/assets/looply-cover.jpg". */
  cover?: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "").trim();
}

export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(FRONTMATTER);
  const body = match ? raw.slice(match[0].length) : raw;
  const fields: Record<string, string> = {};

  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const at = line.indexOf(":");
      if (at === -1) continue;
      fields[line.slice(0, at).trim()] = line.slice(at + 1).trim();
    }
  }

  const rawTags = fields.tags ?? "";
  return {
    body,
    data: {
      title: stripQuotes(fields.title ?? "Untitled"),
      description: stripQuotes(fields.description ?? ""),
      date: stripQuotes(fields.date ?? ""),
      draft: fields.draft === "true",
      cover: fields.cover ? stripQuotes(fields.cover) : undefined,
      tags: rawTags
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((t) => stripQuotes(t))
        .filter(Boolean),
    },
  };
}

/** Inline pass: `code`, **bold**, *italic*, [text](href). Applied in that order. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;

    if (token.startsWith("`")) {
      nodes.push(
        <code key={key} className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em]">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const external = /^https?:\/\//.test(link[2]);
        nodes.push(
          <a
            key={key}
            href={link[2]}
            className="text-primary underline underline-offset-4 hover:no-underline"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {link[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function renderMarkdown(body: string): ReactNode[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Fenced code block
    if (line.startsWith("```")) {
      const buffer: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) buffer.push(lines[i++]);
      i++; // closing fence
      blocks.push(
        <pre
          key={`b${key++}`}
          className="overflow-x-auto rounded-xl border border-border/60 bg-secondary/60 p-4 text-sm"
        >
          <code className="font-mono">{buffer.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const sizes = ["text-3xl", "text-2xl", "text-xl", "text-lg"];
      const Tag = `h${Math.min(level + 1, 6)}` as "h2" | "h3" | "h4" | "h5";
      blocks.push(
        <Tag
          key={`b${key++}`}
          className={`${sizes[level - 1]} font-extrabold font-display mt-10 mb-3 leading-tight`}
        >
          {renderInline(heading[2], `b${key}`)}
        </Tag>,
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const buffer: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) buffer.push(lines[i++].slice(2));
      blocks.push(
        <blockquote
          key={`b${key++}`}
          className="my-6 border-l-4 border-primary/60 pl-4 italic text-muted-foreground"
        >
          {renderInline(buffer.join(" "), `b${key}`)}
        </blockquote>,
      );
      continue;
    }

    // Lists
    const ordered = /^\d+\.\s+/.test(line);
    if (ordered || /^[-*]\s+/.test(line)) {
      const items: string[] = [];
      const test = (l: string) => (ordered ? /^\d+\.\s+/.test(l) : /^[-*]\s+/.test(l));
      while (i < lines.length && test(lines[i])) {
        items.push(lines[i++].replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, ""));
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={`b${key++}`}
          className={`my-5 space-y-2 pl-6 ${ordered ? "list-decimal" : "list-disc"} marker:text-primary`}
        >
          {items.map((item, n) => (
            <li key={n} className="leading-relaxed">
              {renderInline(item, `b${key}-l${n}`)}
            </li>
          ))}
        </ListTag>,
      );
      continue;
    }

    // Paragraph: consume until a blank line or the start of another block
    const buffer: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("> ") &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i])
    ) {
      buffer.push(lines[i++]);
    }
    blocks.push(
      <p key={`b${key++}`} className="my-5 leading-relaxed text-foreground">
        {renderInline(buffer.join(" "), `b${key}`)}
      </p>,
    );
  }

  return blocks;
}
