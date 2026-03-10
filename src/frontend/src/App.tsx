import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Heart,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Note {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  author: string;
}

type User = "Sidharth" | "Sahitya";

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

const INITIAL_NOTES: Note[] = [
  {
    id: "1",
    date: "2026-03-10",
    title: "Our Special Day ♥",
    description:
      "The day we signed our treaty with love and laughter under the mango tree.",
    author: "Sidharth",
  },
  {
    id: "2",
    date: "2026-03-10",
    title: "Movie Night Plan",
    description:
      "Watch Dilwale Dulhania Le Jayenge together at 8 PM with popcorn and chai!",
    author: "Sahitya",
  },
  {
    id: "3",
    date: "2026-03-14",
    title: "Promise Renewed",
    description:
      "We promise to always be honest with each other, no matter what.",
    author: "Sidharth",
  },
  {
    id: "4",
    date: "2026-03-20",
    title: "Evening Walk",
    description:
      "Stroll along the riverside at sunset. Don't forget the camera!",
    author: "Sahitya",
  },
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
    if (CREDENTIALS[username] && CREDENTIALS[username] === password) {
      onLogin(username as User);
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
                  data-ocid="login.username_input"
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
              "In love and loyalty, we stand together."
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

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-warm overflow-hidden">
      {/* Month nav */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-primary/5">
        <Button
          data-ocid="calendar.prev_button"
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
          data-ocid="calendar.next_button"
          variant="ghost"
          size="icon"
          onClick={onNextMonth}
          className="hover:bg-primary/10 rounded-full"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </Button>
      </div>

      {/* Day headers */}
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

      {/* Date cells */}
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
}: {
  selectedDate: string | null;
  notes: Note[];
  currentUser: User;
  onAdd: (note: Omit<Note, "id">) => void;
  onDelete: (id: string) => void;
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

  const handleAdd = () => {
    if (!selectedDate || !title.trim()) return;
    onAdd({
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
      {/* Panel header */}
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

      {/* Add form */}
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
                  data-ocid="note.title_input"
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
                  size="sm"
                  onClick={handleAdd}
                  disabled={!title.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
                >
                  Save Memory
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes list */}
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
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all duration-150"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
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

// ─── Main App ─────────────────────────────────────────────────────────────────

function MainApp({
  currentUser,
  onLogout,
}: { currentUser: User; onLogout: () => void }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(
    formatDate(today),
  );
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

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

  const handleAddNote = (note: Omit<Note, "id">) => {
    setNotes((prev) => [...prev, { ...note, id: String(Date.now()) }]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-amber-50/30 to-rose-100/40 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Heart className="h-5 w-5 text-primary fill-current" />
              <Heart className="h-3 w-3 text-accent fill-current" />
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
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <Button
              data-ocid="header.logout_button"
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
            Cherish every moment. Write your story together.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Calendar - wider */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <CalendarGrid
              year={viewYear}
              month={viewMonth}
              selectedDate={selectedDate}
              noteDates={noteDates}
              onSelectDate={setSelectedDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
          </motion.div>

          {/* Note panel - narrower */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <NotePanel
              selectedDate={selectedDate}
              notes={notes}
              currentUser={currentUser}
              onAdd={handleAddNote}
              onDelete={handleDeleteNote}
            />
          </motion.div>
        </div>
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
  );
}
