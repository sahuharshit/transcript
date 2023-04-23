import useTranscript from "./useTranscript";

const Transcript = () => {
  const { getHighlightedText, transcriptData, summaryData, highlightRef, setHighlightRef, getHiglightText } = useTranscript();
  return (
    <div className="transwrapper">
      <div className="summary">
        <h3>Summary</h3>
        {summaryData.map((eachSum) => {
          return <span className="summary-elem" onClick={() => setHighlightRef(eachSum.references)}>{eachSum.text}</span>;
        })}
      </div>
      <div className="transcript">
        {getHighlightedText(
          transcriptData.transcript,
        getHiglightText(highlightRef, transcriptData.transcript)
        )}
      </div>
    </div>
  );
};
export default Transcript;
