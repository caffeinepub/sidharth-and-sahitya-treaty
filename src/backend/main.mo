import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";
import Principal "mo:core/Principal";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // --- Notes ---

  type Note = {
    id : Text;
    date : Text;
    title : Text;
    description : Text;
    author : Text;
  };

  var stableNotes : [Note] = [];
  var nextId : Nat = 0;

  let notes = Map.empty<Text, Note>();

  // Restore notes from stable storage on upgrade
  for (n in stableNotes.vals()) {
    notes.add(n.id, n);
  };

  system func preupgrade() {
    stableNotes := notes.values().toArray();
    stableSigs := sigs.entries().toArray();
  };

  system func postupgrade() {
    stableNotes := [];
    stableSigs := [];
  };

  public shared func addNote(date : Text, title : Text, description : Text, author : Text) : async Text {
    let id = nextId.toText();
    nextId += 1;
    notes.add(id, { id; date; title; description; author });
    id;
  };

  public shared func deleteNote(id : Text) : async Bool {
    if (notes.containsKey(id)) {
      notes.remove(id);
      true;
    } else {
      false;
    };
  };

  public query func getNotes() : async [Note] {
    let arr = notes.values().toArray();
    arr.sort(func(a, b) {
      let ia = parseNat(a.id);
      let ib = parseNat(b.id);
      if (ia > ib) #less else if (ia < ib) #greater else #equal;
    });
  };

  // --- Treaty Signatures ---

  var stableSigs : [(Text, Text)] = [];
  let sigs = Map.empty<Text, Text>();

  for ((person, date) in stableSigs.vals()) {
    sigs.add(person, date);
  };

  public shared func signTreaty(person : Text, signedDate : Text) : async Bool {
    sigs.add(person, signedDate);
    true;
  };

  public query func getSignatures() : async [(Text, Text)] {
    sigs.entries().toArray();
  };

  public shared func clearSignatures() : async () {
    sigs.clear();
  };

  // --- Helpers ---

  func parseNat(t : Text) : Nat {
    var n : Nat = 0;
    for (c in t.chars()) {
      let d = c.toNat32();
      if (d >= 48 and d <= 57) {
        n := n * 10 + (d - 48).toNat();
      };
    };
    n;
  };
};
