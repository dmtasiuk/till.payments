import { compile } from 'path-to-regexp';

export function pathToRoute(
  path: string,
  attributes: {
    [name: string]: string;
  },
) {
  return compile(path)(attributes);
}
