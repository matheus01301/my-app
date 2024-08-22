import React, { useEffect, useRef, useState, useMemo } from 'react';
import { styled } from "../../../stitches.config";
import Card from '../Card/Card';
import { IndicatorProps } from '../../interfaces/indicator';
import { useIndicators } from '../Context/IndicatorsContext';

const WrapperContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  overflow: "scroll",
  gap: "8px",
  paddingRight: "10px",
  height:'100%',
  paddingLeft: "10px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const LIMIT = 100;

const calculateIndicatorSpace = (indicator: IndicatorProps) => {
  switch (indicator.type) {
    case "gauge":
      return 2;
    case "level":
      return 3;
    default:
      return 1;
  }
};

const GridView = React.memo(({ ...props }) => {
  const { indicatorsData, setIndicatorsData, updateIndicator } = useIndicators();
  const ref = useRef<HTMLDivElement>(null);

  const [cardsPerPage, setCardsPerPage] = useState(LIMIT);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const calculateTotalSpace = (indicators: IndicatorProps[]) => {
    return indicators.reduce((total, indicator) => total + calculateIndicatorSpace(indicator), 0);
  };


  const currentIndicators = useMemo(() => {
    const startIndex = offset;
    const indicatorsOnPage = [];
    let spaceUsed = 0;

    for (let i = startIndex; i < indicatorsData.length && spaceUsed < cardsPerPage; i++) {
      const indicator = indicatorsData[i];
      const indicatorSpace = calculateIndicatorSpace(indicator);

      if (spaceUsed + indicatorSpace <= cardsPerPage) {
        indicatorsOnPage.push(indicator);
        spaceUsed += indicatorSpace;
      } else {
        break;
      }
    }

    return indicatorsOnPage;
  }, [indicatorsData, offset, cardsPerPage]);

  //console.log('current', currentIndicators)

  return (
    <div style={{ position: "relative", width: "100%", height: '100%' }}>
      <WrapperContainer ref={ref}>
        {currentIndicators?.map((indicator: IndicatorProps, index: number) => (
          <Card
            size={indicator.size ?? "sm"}
            indicator={indicator}
            key={indicator.id}
            onDelete={(indicatorToDelete: IndicatorProps) => {
              console.log('Deleting Indicator:', indicatorToDelete);
              setIndicatorsData(prevData => prevData.filter(ind => ind.id !== indicatorToDelete.id));
            }}
            onUpdate={updateIndicator}
          />
        ))}
      </WrapperContainer>
      {/* <Pagination
        limit={cardsPerPage}
        total={calculateTotalSpace(indicatorsData)}
        offset={offset}
        setOffset={setOffset}
        setCurrentPage={setCurrentPage} /> */}
    </div>
  );
});

export default GridView;