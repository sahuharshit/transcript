// @ts-nocheck
import transcriptData from './transcriptData.json';
import summaryData from './summaryData.json';
import { useState } from 'react';

const useTranscript = () => {
  const [highlightRef, setHighlightRef] = useState<number[][]>([]);

  function isSubstringInRange(
    text: string,
    substring: string,
    range: [number, number],
  ): boolean {
    const startIndex = text.indexOf(substring);
    if (startIndex >= range[0] && startIndex + substring.length <= range[1]) {
      return true;
    } else {
      return false;
    }
  }

  function replaceStringsInText(text: string, searchStrings: string[]): string {
    let modifiedText = text;
    for (const search of searchStrings) {
      const replace = `<span class="highlight">${search}</span>`;
      const replacedText = replace.replace('/', '').replace('/g', '');
      const regex = new RegExp(replacedText, 'g');
      const modifiedRegex = regex
        .toString()
        .replace(/(\/<span class="highlight">|span>\/g|<|\/|\\)/g, '');

      highlightRef.map((range) => {
        const [start, end] = range;
        const inRange = isSubstringInRange(text, modifiedRegex, range);
        if (inRange) modifiedText = modifiedText.replace(modifiedRegex, replacedText);
      });
    }

    return modifiedText;
  }

  const getHighlightedText = (text: string, highlight: string[]) => {
    const highlightedText: string[] = [];
    highlight.forEach((item: string) => {
      const regs = new RegExp(`${item}`, 'g');
      highlightedText.push(regs);
    });

    const newText = replaceStringsInText(text, highlightedText);

    return <p dangerouslySetInnerHTML={{ __html: newText }} />;
  };

  const getHiglightText = (element: number[][], text: string) => {
    return element?.map((eachElem: number[]) => {
      return text.substring(eachElem[0], eachElem[1]);
    });
  };

  return {
    getHighlightedText,
    transcriptData,
    summaryData,
    highlightRef,
    setHighlightRef,
    getHiglightText,
  };
};
export default useTranscript;
