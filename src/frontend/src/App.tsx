import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Heart,
  Loader2,
  LogOut,
  Plus,
  ScrollText,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Note {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  author: string;
}

type User = "Sidharth" | "Sahitya";
type View = "calendar" | "treaty";

// ─── Constants ───────────────────────────────────────────────────────────────

const CREDENTIALS: Record<string, string> = {
  Sidharth: "Tillu",
  Sahitya: "Tillu",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TREATY_CLAUSES = [
  "We promise to always be honest with each other, no matter what.",
  "We promise to support each other through every storm and sunshine.",
  "We promise to celebrate each other's wins like our own.",
  "We promise to never go to bed angry, always resolve with love.",
  "We promise to keep building memories, one day at a time.",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

// ─── Login Page ──────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: (user: User) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const matchedKey = Object.keys(CREDENTIALS).find(
      (k) => k.toLowerCase() === username.trim().toLowerCase(),
    );
    if (matchedKey && CREDENTIALS[matchedKey] === password.trim()) {
      onLogin(matchedKey as User);
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen parchment-bg flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/60 via-amber-50/40 to-rose-100/50" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Decorative card */}
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-warm-lg overflow-hidden">
          {/* Header strip */}
          <div className="bg-primary px-8 py-6 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-primary-foreground fill-current" />
                <Heart className="h-3 w-3 text-primary-foreground/60 fill-current" />
                <Heart className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <h1 className="text-3xl font-display font-bold text-primary-foreground leading-tight">
                Sidharth &amp; Sahitya
              </h1>
              <p className="text-primary-foreground/70 text-sm font-body mt-1 tracking-widest uppercase">
                Our Sacred Treaty
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <p className="text-center text-muted-foreground text-sm mb-6 font-body italic">
              Welcome back, dearest. Please sign in.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="font-display text-foreground/80 text-sm"
                >
                  Your Name
                </Label>
                <Input
                  id="username"
                  data-ocid="login.input"
                  type="text"
                  placeholder="Sidharth or Sahitya"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-border bg-input/60 focus:border-primary focus:ring-ring font-body"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="font-display text-foreground/80 text-sm"
                >
                  Secret Password
                </Label>
                <Input
                  id="password"
                  data-ocid="login.password_input"
                  type="password"
                  placeholder="Enter your secret word"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-border bg-input/60 focus:border-primary focus:ring-ring font-body"
                  autoComplete="current-password"
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    data-ocid="login.error_state"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 text-sm font-body"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                data-ocid="login.submit_button"
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display text-base py-5 rounded-xl shadow-warm transition-all duration-200 hover:shadow-warm-lg"
              >
                Enter Our World
              </Button>
            </form>

            <p className="text-center text-muted-foreground/60 text-xs mt-6 font-body italic">
              &quot;In love and loyalty, we stand together.&quot;
            </p>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div
            className="rounded-full bg-accent"
            style={{ width: 4, height: 4, opacity: 0.5 }}
          />
          <div
            className="rounded-full bg-accent"
            style={{ width: 4, height: 4, opacity: 0.5 }}
          />
          <div
            className="rounded-full bg-accent"
            style={{ width: 8, height: 8, opacity: 1 }}
          />
          <div
            className="rounded-full bg-accent"
            style={{ width: 4, height: 4, opacity: 0.5 }}
          />
          <div
            className="rounded-full bg-accent"
            style={{ width: 4, height: 4, opacity: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Calendar Grid ────────────────────────────────────────────────────────────

function CalendarGrid({
  year,
  month,
  selectedDate,
  noteDates,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: {
  year: number;
  month: number;
  selectedDate: string | null;
  noteDates: Set<string>;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = formatDate(new Date());

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-warm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-primary/5">
        <Button
          data-ocid="calendar.pagination_prev"
          variant="ghost"
          size="icon"
          onClick={onPrevMonth}
          className="hover:bg-primary/10 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </Button>

        <h2 className="font-display text-xl font-semibold text-foreground">
          {MONTHS[month]} {year}
        </h2>

        <Button
          data-ocid="calendar.pagination_next"
          variant="ghost"
          size="icon"
          onClick={onNextMonth}
          className="hover:bg-primary/10 rounded-full"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </Button>
      </div>

      <div className="grid grid-cols-7 border-b border-border">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center py-3 text-xs font-body font-semibold text-muted-foreground tracking-wider uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 p-2 gap-1">
        {cells.map((day, idx) => {
          if (!day) {
            return (
              <div
                key={`empty-cell-${Math.floor(idx / 7)}-${idx % 7}`}
                className="h-12"
              />
            );
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          const hasNote = noteDates.has(dateStr);

          return (
            <button
              type="button"
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={[
                "h-12 w-full rounded-xl flex flex-col items-center justify-center relative transition-all duration-150 text-sm font-body group",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-warm font-semibold"
                  : isToday
                    ? "bg-accent/30 text-accent-foreground font-semibold border border-accent"
                    : "hover:bg-primary/8 text-foreground hover:text-primary",
              ].join(" ")}
            >
              <span>{day}</span>
              {hasNote && (
                <span
                  className={[
                    "absolute bottom-1.5 rounded-full",
                    isSelected ? "bg-primary-foreground" : "bg-primary",
                  ].join(" ")}
                  style={{ width: 4, height: 4 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Note Panel ───────────────────────────────────────────────────────────────

function NotePanel({
  selectedDate,
  notes,
  currentUser,
  onAdd,
  onDelete,
  isSaving,
  isDeleting,
}: {
  selectedDate: string | null;
  notes: Note[];
  currentUser: User;
  onAdd: (note: Omit<Note, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isSaving: boolean;
  isDeleting: string | null;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);

  const filteredNotes = selectedDate
    ? notes.filter((n) => n.date === selectedDate)
    : [];

  const formatDisplayDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleAdd = async () => {
    if (!selectedDate || !title.trim()) return;
    await onAdd({
      date: selectedDate,
      title: title.trim(),
      description: description.trim(),
      author: currentUser,
    });
    setTitle("");
    setDescription("");
    setAdding(false);
  };

  if (!selectedDate) {
    return (
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-warm flex flex-col items-center justify-center h-full min-h-64 p-8 text-center">
        <CalendarDays className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <p className="font-display text-lg text-muted-foreground/60">
          Select a date to view memories
        </p>
        <p className="text-sm text-muted-foreground/40 mt-2 font-body italic">
          Each day holds a story worth telling.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-warm overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-border bg-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {formatDisplayDate(selectedDate)}
            </h3>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              {filteredNotes.length}{" "}
              {filteredNotes.length === 1 ? "memory" : "memories"}
            </p>
          </div>
          <Button
            data-ocid="note.add_button"
            size="sm"
            onClick={() => setAdding(!adding)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Memory
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3 bg-primary/3">
              <div>
                <Label className="text-xs font-body text-muted-foreground mb-1 block">
                  Title
                </Label>
                <Input
                  data-ocid="note.input"
                  placeholder="What's this memory about?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-card border-border text-sm font-body"
                />
              </div>
              <div>
                <Label className="text-xs font-body text-muted-foreground mb-1 block">
                  Details
                </Label>
                <Textarea
                  data-ocid="note.textarea"
                  placeholder="Describe this precious moment..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="bg-card border-border text-sm font-body resize-none"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  data-ocid="note.cancel_button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAdding(false);
                    setTitle("");
                    setDescription("");
                  }}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="note.save_button"
                  size="sm"
                  onClick={handleAdd}
                  disabled={!title.trim() || isSaving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                      Saving...
                    </>
                  ) : (
                    "Save Memory"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollArea className="flex-1 max-h-[420px]">
        <div className="p-4 space-y-3">
          {filteredNotes.length === 0 ? (
            <div
              data-ocid="note.empty_state"
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <BookOpen className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="font-display text-muted-foreground/60 text-base">
                No memories yet
              </p>
              <p className="text-xs text-muted-foreground/40 font-body italic mt-1">
                Be the first to add one!
              </p>
            </div>
          ) : (
            filteredNotes.map((note, idx) => (
              <motion.div
                key={note.id}
                data-ocid={`note.item.${idx + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-warm transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Heart className="h-3 w-3 text-primary fill-current flex-shrink-0" />
                      <h4 className="font-display font-semibold text-foreground text-sm truncate">
                        {note.title}
                      </h4>
                    </div>
                    {note.description && (
                      <p className="text-xs text-muted-foreground font-body leading-relaxed">
                        {note.description}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-body">
                        ~ {note.author}
                      </span>
                    </div>
                  </div>
                  <Button
                    data-ocid={`note.delete_button.${idx + 1}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(note.id)}
                    disabled={isDeleting === note.id}
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all duration-150"
                  >
                    {isDeleting === note.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Treaty Page ──────────────────────────────────────────────────────────────

function TreatyPage({
  currentUser,
  signatures,
  onSign,
  isSigning,
}: {
  currentUser: User;
  signatures: Record<string, { signed: boolean; date: string }>;
  onSign: (user: User) => Promise<void>;
  isSigning: boolean;
}) {
  const bothSigned = signatures.Sidharth.signed && signatures.Sahitya.signed;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Treaty Confirmed Banner */}
      <AnimatePresence>
        {bothSigned && (
          <motion.div
            data-ocid="treaty.success_state"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 relative overflow-hidden rounded-2xl bg-primary px-8 py-6 text-center shadow-warm-lg"
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)",
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary-foreground fill-current" />
                <Heart className="h-4 w-4 text-primary-foreground/70 fill-current" />
                <Heart className="h-6 w-6 text-primary-foreground fill-current" />
              </div>
              <h2 className="font-display text-2xl font-bold text-primary-foreground">
                Treaty Confirmed ✦
              </h2>
              <p className="text-primary-foreground/80 font-body text-sm italic">
                Sealed with love by both hearts. This bond is eternal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parchment Scroll Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Scroll top curl decoration */}
        <div className="h-4 mx-6 rounded-t-full bg-gradient-to-r from-amber-200/60 via-amber-100/80 to-amber-200/60 border border-amber-300/40 shadow-sm" />

        <div
          className="relative bg-card/95 border border-border shadow-warm-lg overflow-hidden"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 27px, oklch(var(--border) / 0.3) 28px)",
            backgroundSize: "100% 28px",
          }}
        >
          {/* Aged paper overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 20% 20%, oklch(0.92 0.04 80 / 0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.90 0.03 70 / 0.3) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 px-10 py-10">
            {/* Treaty title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
                <ScrollText className="h-5 w-5 text-primary" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground leading-tight">
                Our Sacred Treaty
              </h2>
              <p className="font-body text-muted-foreground text-sm italic mt-2">
                A covenant of love between two souls
              </p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
                <Heart className="h-4 w-4 text-primary fill-current" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
              </div>
            </div>

            {/* Treaty clauses */}
            <div className="space-y-5 mb-10">
              {TREATY_CLAUSES.map((clause, idx) => (
                <motion.div
                  key={clause}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-display font-bold text-xs">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="font-body text-foreground/90 leading-relaxed text-base">
                    {clause}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
              <div className="flex gap-1">
                <Heart className="h-3 w-3 text-primary/50 fill-current" />
                <Heart className="h-3 w-3 text-primary fill-current" />
                <Heart className="h-3 w-3 text-primary/50 fill-current" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
            </div>

            {/* Signature section */}
            <div className="grid grid-cols-2 gap-8">
              {(["Sidharth", "Sahitya"] as User[]).map((person) => {
                const sig = signatures[person];
                const isCurrentUser = person === currentUser;
                return (
                  <div
                    key={person}
                    className="flex flex-col items-center gap-3"
                  >
                    {/* Signature slot */}
                    <div className="w-full min-h-[96px] border-b-2 border-dashed border-primary/40 flex flex-col items-center justify-end pb-2 relative">
                      {sig.signed ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 18,
                          }}
                          className="text-center"
                        >
                          <p
                            className="font-display italic text-primary leading-none"
                            style={{ fontSize: "2rem" }}
                          >
                            {person}
                          </p>
                          <p className="text-xs text-muted-foreground font-body mt-1">
                            {sig.date}
                          </p>
                        </motion.div>
                      ) : isCurrentUser ? (
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button
                            data-ocid="treaty.sign_button"
                            onClick={() => onSign(person)}
                            disabled={isSigning}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-display gap-2 shadow-warm rounded-xl px-6"
                          >
                            {isSigning ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing...
                              </>
                            ) : (
                              <>
                                <Heart className="h-4 w-4 fill-current" />
                                Sign the Treaty
                              </>
                            )}
                          </Button>
                        </motion.div>
                      ) : (
                        <div className="text-center pb-2">
                          <p className="font-body text-muted-foreground/50 text-sm italic">
                            Awaiting signature...
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Name label */}
                    <div className="text-center">
                      <p className="font-display font-semibold text-foreground text-sm">
                        {person}
                      </p>
                      <p className="text-xs text-muted-foreground font-body">
                        {sig.signed ? (
                          <span className="text-primary flex items-center gap-1 justify-center">
                            <Heart className="h-2.5 w-2.5 fill-current" />
                            Signed
                          </span>
                        ) : (
                          "Unsigned"
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll bottom curl decoration */}
        <div className="h-4 mx-6 rounded-b-full bg-gradient-to-r from-amber-200/60 via-amber-100/80 to-amber-200/60 border border-amber-300/40 shadow-sm" />
      </motion.div>

      {/* Motivational footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center font-body text-muted-foreground/50 text-xs italic mt-6"
      >
        &quot;A treaty written in love is sealed by the heart.&quot;
      </motion.p>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div data-ocid="app.loading_state" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-3">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

function MainApp({
  currentUser,
  onLogout,
}: { currentUser: User; onLogout: () => void }) {
  const today = new Date();
  const [view, setView] = useState<View>("calendar");
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(
    formatDate(today),
  );
  const [notes, setNotes] = useState<Note[]>([]);
  const [signatures, setSignatures] = useState<
    Record<string, { signed: boolean; date: string }>
  >({
    Sidharth: { signed: false, date: "" },
    Sahitya: { signed: false, date: "" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isDeletingNote, setIsDeletingNote] = useState<string | null>(null);
  const [isSigningTreaty, setIsSigningTreaty] = useState(false);
  const { actor, isFetching: isActorFetching } = useActor();

  // Load data from backend when actor is ready
  const loadData = useCallback(async () => {
    if (!actor) return;
    setIsLoading(true);
    try {
      const [backendNotes, backendSigs] = await Promise.all([
        actor.getNotes(),
        actor.getSignatures(),
      ]);

      const mappedNotes: Note[] = backendNotes.map((n) => ({
        id: n.id,
        date: n.date,
        title: n.title,
        description: n.description,
        author: n.author,
      }));
      setNotes(mappedNotes);

      const newSigs: Record<string, { signed: boolean; date: string }> = {
        Sidharth: { signed: false, date: "" },
        Sahitya: { signed: false, date: "" },
      };
      for (const [person, signedDate] of backendSigs) {
        if (person === "Sidharth" || person === "Sahitya") {
          newSigs[person] = { signed: true, date: signedDate };
        }
      }
      setSignatures(newSigs);
    } catch (err) {
      console.error("Failed to load data:", err);
      toast.error("Couldn't load your data. Please refresh to try again.");
    } finally {
      setIsLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (!isActorFetching && actor) {
      loadData();
    }
  }, [actor, isActorFetching, loadData]);

  const noteDates = new Set(notes.map((n) => n.date));

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const handleAddNote = async (note: Omit<Note, "id">) => {
    if (!actor) return;
    setIsSavingNote(true);
    try {
      const id = await actor.addNote(
        note.date,
        note.title,
        note.description,
        note.author,
      );
      setNotes((prev) => [...prev, { ...note, id }]);
      toast.success("Memory saved! ♥");
    } catch (err) {
      console.error("Failed to save note:", err);
      toast.error("Couldn't save your memory. Please try again.");
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!actor) return;
    setIsDeletingNote(id);
    try {
      await actor.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      toast.success("Memory removed.");
    } catch (err) {
      console.error("Failed to delete note:", err);
      toast.error("Couldn't remove the memory. Please try again.");
    } finally {
      setIsDeletingNote(null);
    }
  };

  const handleSign = async (user: User) => {
    setIsSigningTreaty(true);
    const signedDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!actor) {
      setIsSigningTreaty(false);
      return;
    }
    try {
      await actor.signTreaty(user, signedDate);
      setSignatures((prev) => ({
        ...prev,
        [user]: { signed: true, date: signedDate },
      }));
      toast.success(`${user} has signed the treaty! ♥`);
    } catch (err) {
      console.error("Failed to sign treaty:", err);
      toast.error("Couldn't sign the treaty. Please try again.");
    } finally {
      setIsSigningTreaty(false);
    }
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-amber-50/30 to-rose-100/40 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Heart className="h-5 w-5 text-primary fill-current" />
                <Heart className="h-3.5 w-3.5 text-primary/60 fill-current" />
                <Heart className="h-5 w-5 text-primary fill-current" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground leading-none">
                  Sidharth &amp; Sahitya
                </h1>
                <p className="text-xs text-muted-foreground font-body tracking-widest uppercase mt-0.5">
                  Sacred Treaty
                </p>
              </div>
            </div>

            {/* Nav tabs */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1 border border-border">
              <button
                type="button"
                data-ocid="nav.calendar.tab"
                onClick={() => setView("calendar")}
                className={[
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200",
                  view === "calendar"
                    ? "bg-card text-primary shadow-sm border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50",
                ].join(" ")}
              >
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">Our Calendar</span>
              </button>
              <button
                type="button"
                data-ocid="nav.treaty.tab"
                onClick={() => setView("treaty")}
                className={[
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200",
                  view === "treaty"
                    ? "bg-card text-primary shadow-sm border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50",
                ].join(" ")}
              >
                <ScrollText className="h-4 w-4" />
                <span className="hidden sm:inline">Our Treaty</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-display font-bold">
                    {currentUser[0]}
                  </span>
                </div>
                <span className="text-sm font-body text-foreground font-medium">
                  {currentUser}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-6 hidden sm:block"
              />
              <Button
                data-ocid="header.button"
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/8 gap-1.5 rounded-lg text-xs"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="font-display text-3xl font-semibold text-foreground">
            Welcome back, <span className="text-primary">{currentUser}</span> ♥
          </p>
          <p className="text-muted-foreground font-body italic text-sm mt-1">
            {view === "calendar"
              ? "Cherish every moment. Write your story together."
              : "Our promises, sealed forever in ink and love."}
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            {view === "calendar" ? (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-3">
                    <CalendarGrid
                      year={viewYear}
                      month={viewMonth}
                      selectedDate={selectedDate}
                      noteDates={noteDates}
                      onSelectDate={setSelectedDate}
                      onPrevMonth={handlePrevMonth}
                      onNextMonth={handleNextMonth}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <NotePanel
                      selectedDate={selectedDate}
                      notes={notes}
                      currentUser={currentUser}
                      onAdd={handleAddNote}
                      onDelete={handleDeleteNote}
                      isSaving={isSavingNote}
                      isDeleting={isDeletingNote}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="treaty"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <TreatyPage
                  currentUser={currentUser}
                  signatures={signatures}
                  onSign={handleSign}
                  isSigning={isSigningTreaty}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-12 py-6 text-center bg-card/40 backdrop-blur-sm">
        <p className="text-xs text-muted-foreground/60 font-body">
          © {new Date().getFullYear()}{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <>
      <Toaster richColors position="top-center" />
      <AnimatePresence mode="wait">
        {!currentUser ? (
          <motion.div
            key="login"
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <LoginPage onLogin={setCurrentUser} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <MainApp
              currentUser={currentUser}
              onLogout={() => setCurrentUser(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
