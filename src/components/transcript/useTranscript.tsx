import transcriptData from "./transcriptData.json";
import summaryData from "./summaryData.json";
import { useState } from "react";

const useTranscript = () => {
    const [highlightRef, setHighlightRef] = useState<number[][]>([])

  const getHighlightedText = (text: string, highlight: string[]) => {
    highlight.forEach((item: string)=> {
        const regs = new RegExp(`${item}`, "giu")
        text = text.replaceAll(regs, (match) =>{             
            return `<span class="highlight">${match}</span>`})
    })
    
    return <p dangerouslySetInnerHTML={{__html: text}}/>
  };

  const getHiglightText = (element: number[][], text: string) =>{
    return element?.map((eachElem: number[]) => {
        return text.substring(eachElem[0], eachElem[1])
    })
  }

  return { getHighlightedText, transcriptData, summaryData, highlightRef, setHighlightRef, getHiglightText };
};
export default useTranscript;
