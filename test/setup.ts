import {
  Registry,
  ScrollBlot,
  BlockBlot as BlockBlotBase,
  InlineBlot as InlineBlotBase,
  TextBlot as TextBlotBase,
  type BlotConstructor,
} from '../src/parchment';

import {
  AuthorBlot,
  BoldBlot,
  ItalicBlot,
  ScriptBlot,
} from './registry/inline';
import { Align, Color, Family, Id, Indent, Size } from './registry/attributor';
import { HeaderBlot } from './registry/block';
import { ImageBlot, VideoBlot } from './registry/embed';
import { ListContainer, ListItem } from './registry/list';
import { BreakBlot } from './registry/break';

// Create subclasses to allow marking `blotName` as readonly for TypeScript inference
// We can't do it on the base classes because it would prevent subclasses from having different blot names
class BlockBlot extends BlockBlotBase {
  static readonly blotName = 'block';
}
class InlineBlot extends InlineBlotBase {
  static readonly blotName = 'inline';
}
class TextBlot extends TextBlotBase {
  static readonly blotName = 'text';
}

const Blots = [
  // Essential blots
  BlockBlot,
  InlineBlot,
  TextBlot,
  // Format blots
  AuthorBlot,
  BoldBlot,
  ItalicBlot,
  ScriptBlot,
  HeaderBlot,
  ImageBlot,
  VideoBlot,
  ListItem,
  ListContainer,
  BreakBlot,
];

const Attributors = [Color, Size, Family, Id, Align, Indent];

type KnownBlots = typeof Blots[number];
type KnownAttributors = typeof Attributors[number];

const getTestRegistry = () => {
  const reg = new Registry(Blots, Attributors);

  reg.register(ScrollBlot as unknown as BlotConstructor);

  return reg;
};

type TestContext = {
  container: HTMLElement;
  scroll: ScrollBlot<KnownBlots, KnownAttributors>;
  registry: Registry<KnownBlots, KnownAttributors>;
};

export const setupContextBeforeEach = () => {
  const ctx = {} as TestContext;
  beforeEach(() => {
    const container = document.createElement('div');
    const registry = getTestRegistry();
    const scroll = new ScrollBlot(registry, container);
    ctx.container = container;
    ctx.scroll = scroll;
    ctx.registry = registry;
  });
  return ctx;
};
