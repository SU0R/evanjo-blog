type AudioPlayerProps = {
  src: string;
  title: string;
};

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <section className="audio-card" aria-labelledby="audio-heading">
      <div>
        <p className="eyebrow">Listen</p>
        <h2 id="audio-heading">Audio recording</h2>
      </div>
      <audio controls preload="metadata" aria-label={`Audio recording of ${title}`}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support embedded audio. You can{" "}
        <a href={src}>download the recording</a> instead.
      </audio>
    </section>
  );
}
