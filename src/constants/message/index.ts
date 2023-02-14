export const MESSAGE_TYPE = {
  REQUEST__WEB_TO_CONTENT_SCRIPT: 'REQUEST__WEB_TO_CONTENT_SCRIPT',
  RESPONSE__WEB_TO_CONTENT_SCRIPT: 'RESPONSE__WEB_TO_CONTENT_SCRIPT',
  REQUEST__CONTENT_SCRIPT_TO_BACKGROUND: 'REQUEST__CONTENT_SCRIPT_TO_BACKGROUND',
  RESPONSE__CONTENT_SCRIPT_TO_BACKGROUND: 'RESPONSE__CONTENT_SCRIPT_TO_BACKGROUND',
  REQUEST__BACKGROUND_TO_POPUP: 'REQUEST__BACKGROUND_TO_POPUP',
  RESPONSE__BACKGROUND_TO_POPUP: 'RESPONSE__BACKGROUND_TO_POPUP',
} as const;

export const COSMOS_LISTENER_TYPE = {
  ACCOUNT_CHANGED: 'accountChanged',
} as const;

export const ETHEREUM_LISTENER_TYPE = {
  ACCOUNTS_CHANGED: 'accountsChanged',
  CHAIN_CHANGED: 'chainChanged',
} as const;

export const APTOS_LISTENER_TYPE = {
  ACCOUNT_CHANGED: 'accountChange',
  CHAIN_CHANGED: 'networkChange',
} as const;

export const SUI_LISTENER_TYPE = {
  ACCOUNT_CHANGED: 'accountChange',
  CHAIN_CHANGED: 'networkChange',
} as const;
