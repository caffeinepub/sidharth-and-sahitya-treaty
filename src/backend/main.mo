import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Keep old stable vars to satisfy upgrade compatibility
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = { name : Text };
  let userProfiles = Map.empty<Principal, UserProfile>();

  // --- Notes ---

  public type Note = {
    id : Text;
    date : Text;
    title : Text;
    description : Text;
    author : Text;
  };

  var nextId : Nat = 0;
  let notes = Map.empty<Text, Note>();

  public shared func addNote(date : Text, title : Text, description : Text, author : Text) : async Text {
    let id = nextId.toText();
    nextId += 1;
    notes.add(id, { id; date; title; description; author });
    id;
  };

  public shared func deleteNote(id : Text) : async Bool {
    notes.remove(id);
    true;
  };

  public query func getNotes() : async [Note] {
    notes.values().toArray().sort(func(a, b) {
      Nat.compare(parseNat(b.id), parseNat(a.id));
    });
  };

  func parseNat(t : Text) : Nat {
    var n : Nat = 0;
    for (c in t.chars()) {
      let d = Nat32.toNat(c.toNat32());
      if (d >= 48 and d <= 57) {
        n := n * 10 + (d - 48);
      };
    };
    n;
  };

  // --- Treaty Signatures ---

  let sigs = Map.empty<Text, Text>();

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

  // --- Treaty Text ---

  var treatyClauses : [Text] = [];

  public shared func saveTreatyText(clauses : [Text]) : async Bool {
    treatyClauses := clauses;
    true;
  };

  public query func getTreatyText() : async [Text] {
    treatyClauses;
  };

  // --- Daily Signatures ---

  let dailySigs = Map.empty<Text, Text>();

  public shared func signDaily(person : Text, date : Text, displayDate : Text) : async Bool {
    let key = person # ":" # date;
    dailySigs.add(key, displayDate);
    true;
  };

  public query func getDailySignatures() : async [(Text, Text)] {
    dailySigs.entries().toArray();
  };

};
