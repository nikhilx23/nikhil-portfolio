import { splitNumbers } from '../lib/highlightNumbers';

export default function HighlightedText({ text }: { text: string }) {
  return <>{splitNumbers(text).map((part, index) => part.numeric
    ? <span className="metric-highlight" key={index}>{part.text}</span>
    : part.text)}</>;
}
