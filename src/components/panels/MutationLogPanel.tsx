'use client';

type Entry = { id: number; text: string };
const dummy: Entry[] = [
  { id: 1, text: 'Waiting for data…' },
  { id: 2, text: 'TEX: SOVEREIGN COGNITION' },
];

export default function MutationLogPanel() {
  return (
    <section className="space-y-1 text-xs leading-tight text-white">
      <h2 className="mb-2 text-[10px] font-semibold tracking-widest text-primary">
        COGNITIVE MUTATION LOG
      </h2>

      {dummy.map((e) => (
        <p key={e.id} className="truncate">
          {e.text}
        </p>
      ))}
    </section>
  );
}