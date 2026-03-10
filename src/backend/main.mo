import AccessControl "authorization/access-control";

actor Main {
  let accessControlState = AccessControl.initState();

  public shared func _initializeAccessControlWithSecret(_ : Text) : async () {
    // stub
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };
};
