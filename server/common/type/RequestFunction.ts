const enum RequestFunction {
  CREATE_IDENTITY = 'createIdentity',
  ADD_OWNER_FROM_RECOVERY = 'addOwnerFromRecovery',
  REMOVE_OWNER_FROM_RECOVERY = 'removeOwnerFromRecovery',
  CHANGE_RECOVERY = 'changeRecovery',
  FORWARD_TO = 'forwardTo',
}

export default RequestFunction;
