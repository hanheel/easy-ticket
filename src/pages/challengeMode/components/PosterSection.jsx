import React from "react";
import styled from "styled-components";
import Poster from "../../../components/poster/Poster";
import { useAtom, useAtomValue } from "jotai";
import { postersAtom, levelAtom } from "../../../store/atom";
import { formatDateRange } from "../../../util/date";

// 전체 요소를 담는 컨테이너
const PosterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  flex-shrink: 0;
`;

// 포스터 이미지만 담는 섹션
const LeftSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

// 타이틀과 공연 정보를 담는 섹션
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

// 공연 제목
const PosterTitle = styled.h2`
  font-family: "pretendardB";
  font-size: 24px;
  margin-bottom: 20px;
  align-self: flex-start;
`;

// 테이블 스타일
const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "pretendardR";
  font-size: 16px;
  padding: 4px 8px;
  color: var(--text-color);
`;

const InfoRow = styled.tr``;

const InfoLabel = styled.td`
  padding: 8px;
  font-weight: bold;
`;

const InfoValue = styled.td`
  padding: 8px;
`;

const PosterSection = ({ id }) => {
  const posters = useAtomValue(postersAtom);
  const level = useAtomValue(levelAtom);
  const poster = posters[id];

  return (
    <PosterContainer>
      <LeftSection>
        <Poster id={id} />
      </LeftSection>
      <RightSection>
        <PosterTitle>{poster.title_ko}</PosterTitle>
        <InfoTable>
          <tbody>
            <InfoRow>
              <InfoLabel>장소</InfoLabel>
              <InfoValue>{poster.venue}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>공연기간</InfoLabel>
              <InfoValue>{formatDateRange(poster.date)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>관람연령</InfoLabel>
              <InfoValue>{poster.age}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>가격</InfoLabel>
              <InfoValue>
                <table>
                  <tbody>
                    {Object.entries(poster.price).map(([seatType, price]) => (
                      <InfoRow key={seatType}>
                        <InfoLabel>{seatType}</InfoLabel>
                        <InfoValue>{price}</InfoValue>
                      </InfoRow>
                    ))}
                  </tbody>
                </table>
              </InfoValue>
            </InfoRow>
          </tbody>
        </InfoTable>
      </RightSection>
    </PosterContainer>
  );
};

export default PosterSection;