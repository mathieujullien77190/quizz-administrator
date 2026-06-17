import { COLORS } from "./constants";
import type { Token } from "./types";

const re =
  /("(?:[^\\"]|\\.)*"(?=\s*:))|("(?:[^\\"]|\\.)*")|(true|false)|(null)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],:])/g;

export const tokenize = (json: string): Token[] => {
  const tokens: Token[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  re.lastIndex = 0;
  while ((m = re.exec(json)) !== null) {
    if (m.index > last)
      tokens.push({ text: json.slice(last, m.index), color: COLORS.space });
    const [, key, str, bool, nil, num, punct] = m;
    if (key)        tokens.push({ text: key,   color: COLORS.key });
    else if (str)   tokens.push({ text: str,   color: COLORS.string });
    else if (bool)  tokens.push({ text: bool,  color: COLORS.boolean });
    else if (nil)   tokens.push({ text: nil,   color: COLORS.null });
    else if (num)   tokens.push({ text: num,   color: COLORS.number });
    else if (punct) tokens.push({ text: punct, color: COLORS.punct });
    last = re.lastIndex;
  }
  if (last < json.length)
    tokens.push({ text: json.slice(last), color: COLORS.space });
  return tokens;
};
