export function ProgressPips({ total, currentIndex, results }) {
  return (
    <div className="pips" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={currentIndex}>
      {Array.from({ length: total }).map((_, i) => {
        const answered = results[i];
        let cls = 'pip';
        if (answered === true) cls += ' right';
        else if (answered === false) cls += ' wrong';
        else if (i === currentIndex) cls += ' current';
        return <span key={i} className={cls} aria-hidden="true" />;
      })}
    </div>
  );
}
