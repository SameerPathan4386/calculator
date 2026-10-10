
"use client";

import { useState } from "react";

const denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Home() {
  const [notes, setNotes] = useState({});

  const total = denominations.reduce(
    (sum, denomination) =>
      sum + denomination * (Number(notes[denomination]) || 0),
    0
  );

  const totalNotes = denominations.reduce(
    (sum, denomination) =>
      sum + (Number(notes[denomination]) || 0),
    0
  );

  const updateNote = (denomination, value) => {
    if (value !== "" && !/^\d+$/.test(value)) return;

    setNotes((prev) => ({
      ...prev,
      [denomination]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-[#090d14] px-3 py-4 text-slate-100 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-2xl font-bold text-emerald-400">
              ₹
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                NEW BABA ELECTRICALS | CASH COUNTER
              </h1>
              <p className="mt-0.5 text-xs text-slate-400">
                Simple cash counting
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setNotes({})}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:bg-slate-800"
          >
            ↺ Reset
          </button>
        </header>

        {/* Total */}
        <section className="mb-4 rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-[#12271f] to-[#111d22] p-4 sm:p-5">
          <p className="text-[11px] font-semibold tracking-[0.15em] text-emerald-100/60">
            TOTAL CASH AMOUNT
          </p>

          <h2 className="mt-2 break-words text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
            {formatCurrency(total)}
          </h2>

          <div className="mt-4 flex gap-8 border-t border-white/10 pt-3">
            <div>
              <p className="text-xs text-slate-400">Total notes</p>
              <p className="mt-1 text-base font-semibold">
                {totalNotes.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Denominations used</p>
              <p className="mt-1 text-base font-semibold">
                {denominations.filter((d) => Number(notes[d]) > 0).length}
                <span className="text-slate-500"> / 9</span>
              </p>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="rounded-2xl border border-slate-800 bg-[#10151f] p-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold sm:text-base">
                Denominations
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Enter quantity for each note
              </p>
            </div>
            <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
              INR ₹
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {denominations.map((denomination) => {
              const quantity = Number(notes[denomination]) || 0;
              const amount = denomination * quantity;

              return (
                <div
                  key={denomination}
                  className="min-w-0 rounded-xl border border-slate-800 bg-[#151c28] p-3 transition focus-within:border-emerald-400/60 hover:border-slate-700"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-100">
                      ₹{denomination}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      NOTE
                    </span>
                  </div>

                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="0"
                    aria-label={`Quantity of ₹${denomination} notes`}
                    value={notes[denomination] ?? ""}
                    onChange={(e) =>
                      updateNote(denomination, e.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-slate-700/80 bg-[#0b1018] px-3 text-base font-medium text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
                  />

                  <div className="mt-2 flex items-center justify-between gap-1">
                    <span className="text-[10px] text-slate-500">
                      Amount
                    </span>
                    <span className="truncate text-xs font-semibold text-emerald-300">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom total */}
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Grand Total
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {totalNotes.toLocaleString("en-IN")} notes counted
              </p>
            </div>
            <p className="break-words text-right text-lg font-bold text-emerald-400 sm:text-xl">
              {formatCurrency(total)}
            </p>
          </div>
        </section>

        <p className="mt-3 text-center text-[11px] text-slate-600">
          --- NEW BABA ELECTRICALS --- | MADE WITH ❤️ BY SP
        </p>
      </div>
    </main>
  );
}