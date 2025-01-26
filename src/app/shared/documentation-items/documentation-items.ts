import {Injectable} from '@angular/core';
import {EXAMPLE_COMPONENTS} from '@angular/components-examples';

export interface AdditionalApiDoc {
  name: string;
  path: string;
}

export interface ExampleSpecs {
  prefix: string;
  exclude?: string[];
}

export interface DocItem {
  /** Id of the doc item. Used in the URL for linking to the doc. */
  id: string;
  /** Display name of the doc item. */
  name: string;
  /** Short summary of the doc item. */
  summary?: string;
  /** Package which contains the doc item. */
  packageName?: string;
  /** Specifications for which examples to be load. */
  exampleSpecs: ExampleSpecs;
  /** List of examples. */
  examples?: string[];
  /** Optional id of the API document file. */
  apiDocId?: string;
  /** Optional path to the overview file of this doc item. */
  overviewPath?: string;
  /** List of additional API docs. */
  additionalApiDocs?: AdditionalApiDoc[];
  /** Whether the doc item can display styling information. */
  hasStyling?: boolean;
}

export interface DocSection {
  name: string;
  summary: string;
}

const exampleNames = Object.keys(EXAMPLE_COMPONENTS);
const MARKET = 'market';
const TRADE = 'trade';
const SERVICES = 'services';
export const SECTIONS: { [key: string]: DocSection } = {
  [MARKET]: {
    name: 'Market',
    summary: 'Market'
  },
  [TRADE]: {
    name: 'Trade',
    summary: 'Trade'
  },
  [SERVICES]: {
    name: 'Services',
    summary: 'Services'
  }
};


const DOCS: { [key: string]: DocItem[] } = {
  [MARKET]: [
    {
      id: 'overview',
      name: 'Overview',
      summary: 'Utilities for screen readers, focus and more.',
      exampleSpecs: {
        prefix: 'overview-',
      },
    },
    {
      id: 'indices',
      name: 'indices',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'indices-',
      },
    },
    {
      id: 'stocks',
      name: 'Stocks',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'stocks-',
      },
    },
  ],
  [TRADE]: [
    {
      id: 'overview',
      name: 'Overview',
      summary: 'Utilities for screen readers, focus and more.',
      exampleSpecs: {
        prefix: 'overview-',
      },
    },
    {
      id: 'indices',
      name: 'indices',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'indices-',
      },
    },
    {
      id: 'stocks',
      name: 'Stocks',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'stocks-',
      },
    },
  ],
  [SERVICES]: [
    {
      id: 'deposit',
      name: 'Deposit',
      summary: 'Utilities for screen readers, focus and more.',
      exampleSpecs: {
        prefix: 'deposit-',
      },
    },
    {
      id: 'withdraw',
      name: 'Withdraw',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'withdraw-',
      },
    },
    {
      id: 'ipo',
      name: 'IPO',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'ipo-',
      },
    },
    {
      id: 'tax-certification',
      name: 'Tax Certification',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'tax-certification-',
      },
    },
    {
      id: 'product-switch',
      name: 'Product Switch',
      summary: 'Component with one or more expandable sections.',
      exampleSpecs: {
        prefix: 'product-switch-',
      },
    },
  ]
  // TODO(jelbourn): re-add utilities and a11y as top-level categories once we can generate
  // their API docs with dgeni. Currently our setup doesn't generate API docs for constants
  // and standalone functions (much of the utilities) and we have no way of generating API
  // docs more granularly than directory-level (within a11y) (same for viewport).
};

const ALL_MARKET = processDocs('market', DOCS[MARKET]);
const ALL_TRADE = processDocs('trade', DOCS[TRADE]);
const ALL_SERVICES = processDocs('services', DOCS[SERVICES]);
const ALL_DOCS = [...ALL_MARKET, ...ALL_TRADE, ...ALL_SERVICES];

@Injectable({providedIn: 'root'})
export class DocumentationItems {

  getItems(section: string): DocItem[] {
    if (section === MARKET) {
      return ALL_MARKET;
    }
    if (section === TRADE) {
      return ALL_TRADE;
    }
    if (section === SERVICES) {
      return ALL_SERVICES;
    }
    return [];
  }

  getItemById(id: string, section: string): DocItem | undefined {
    const sectionLookup = section === 'cdk' ? 'cdk' : 'material';
    return ALL_DOCS.find(doc => doc.id === id && doc.packageName === sectionLookup);
  }
}

function processDocs(packageName: string, docs: DocItem[]): DocItem[] {
  for (const doc of docs) {
    doc.packageName = packageName;
    doc.hasStyling ??= packageName === 'material';
    doc.examples = exampleNames.filter(key =>
      key.match(RegExp(`^${doc.exampleSpecs.prefix}`)) &&
      !doc.exampleSpecs.exclude?.some(excludeName => key.indexOf(excludeName) === 0));
  }

  //return docs.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  return docs;
}
