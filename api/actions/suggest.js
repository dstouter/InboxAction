import { ActionType, makeAction } from "../lib/actions.js";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const body =
    typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  const { text = "" } = body;

  const t = String(text).toLowerCase();
  const actions = [];

  if (/(approve|confirm|looks good|ok to proceed|go ahead)/.test(t)) {
    actions.push(makeAction({ type: ActionType.APPROVE, title: "Approve this", confidence: 0.85 }));
  }
  if (/(meet|schedule|call|calendar|tomorrow|next week)/.test(t)) {
    actions.push(makeAction({ type: ActionType.SCHEDULE, title: "Schedule a meeting", confidence: 0.8 }));
  }
  if (/(invoice|amount|due|address|order|receipt)/.test(t)) {
    actions.push(makeAction({
      type: ActionType.EXTRACT,
      title: "Extract key details",
      confidence: 0.75,
      payload: { fields: ["amount", "date", "counterparty"] },
    }));
  }

  if (!actions.length) {
    actions.push(makeAction({ type: ActionType.EXTRACT, title: "Extract highlights", confidence: 0.6 }));
  }

  return res.status(200).json({ actions });
}
