type AudioPlayerProps = {
  src: string;
  title: string;
  duration: string;
};

export function AudioPlayer({ src, title, duration }: AudioPlayerProps) {
  return (
    <section className="audio-card" aria-labelledby="audio-heading">
      <div>
        <p className="eyebrow">Listen</p>
        <h2 id="audio-heading">Audio recording</h2>
        <p className="audio-card__meta">Read by Evan Jo · {duration}</p>
      </div>
      <audio controls preload="metadata" aria-label={`Audio recording of ${title}`}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support embedded audio. You can{" "}
        <a href={src}>download the recording</a> instead.
      </audio>
      <a className="text-link" href={src} download>
        Download MP3 <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
