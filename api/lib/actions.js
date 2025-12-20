export const ActionType = Object.freeze({
  APPROVE: "APPROVE",
  SCHEDULE: "SCHEDULE",
  EXTRACT: "EXTRACT",
});

export function makeAction({ type, title, confidence = 0.7, payload = {} }) {
  const id =
    (globalThis.crypto?.randomUUID?.()) ||
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return { id, type, title, confidence, payload };
}
