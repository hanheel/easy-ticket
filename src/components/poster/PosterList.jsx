import React from "react";
import styled from "styled-components";
import Poster from "./Poster";
import { useAtom } from "jotai";
import {
  selectedPosterAtom,
  postersAtom,
  levelAtom,
  themeSiteAtom
} from "../../store/atom";
import { formatDateRange } from "../../util/date";
import AnimationArea from "../Animation";

// 공연 제목
const PosterTitle = styled.h2`
  font-family: "pretendardB";
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  height: 40px;
  margin: 8px 4px;
  transition: color 0.2s;
`;

// 공연 장소
const PosterVenue = styled.div`
  font-family: "pretendardR";
  font-size: 16px;
  color: var(--text-color);
  text-align: left;
  width: 100%;
  margin: 8px 4px;
  transition: color 0.2s;
`;

// 공연 시간
const PosterTime = styled.div`
  font-family: "pretendardR";
  font-size: 16px;
  margin: 8px 4px;
  color: var(--text-color);
  text-align: left;
  width: 100%;
  transition: color 0.2s;
`;

// 포스터 전체를 담는 컨테이너
const PosterListContainer = styled.div`
  width: 1320px;
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
  align-items: center;
`;

// 포스터 하나를 담는 컨테이너
const PosterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 470px;
  border-radius: 8px;
  background-color: var(--fill-color);
  padding: 4px 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  /* hover 시 색상 적절히 변하도록 css 적용 */
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    background-color: var(--sub-color);
  }

  &:hover ${PosterTitle}, &:hover ${PosterVenue}, &:hover ${PosterTime} {
  }
`;

const PosterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 230px;
`;

const PosterList = ({ onPosterClick }) => {
  const [posters] = useAtom(postersAtom);
  const [level] = useAtom(levelAtom);
  const [themeSite] = useAtom(themeSiteAtom);
  const [, setSelectedPoster] = useAtom(selectedPosterAtom);

  const handlePosterClick = (posterId) => {
    // 초급 및 중급 난이도
    if (level === "low" || level === "middle") {
      if (posterId !== 0) {
        alert("첫 번째 포스터를 선택하세요.");
        return;
      }
      // 첫 번째 포스터가 선택된 경우에만 포스터 클릭 동작
      onPosterClick(posterId);
      return;
    }

    if (level === "high") {
      // 연습 모드에서 고급 난이도
      if (themeSite === "practice") {
        if (posterId !== 0) {
          alert("선택하는 포스터가 맞는 지 다시 한 번 확인해주세요.");
          return;
        } else {
          setSelectedPoster(0); // 정답 고정
          onPosterClick(posterId); // 포스터 클릭 동작
          return;
        }
      } else {
        // 실전 모드에서 고급 난이도
        setSelectedPoster(posterId);
        onPosterClick(posterId); // 포스터 클릭 동작
        return;
      }
    }
  };

  return (
    <PosterListContainer>
      {posters.map((poster, index) => {
        // 초급 난이도에서 첫번째 포스터에만 애니메이션 적용
        const showAnimate = index === 0 && level === "low";

        return (
          <PosterContainer
            key={poster.id}
            onClick={() => handlePosterClick(poster.id)}
          >
            {showAnimate ? (
              <AnimationArea $focus>
                <Poster id={index} />
                <PosterInfo>
                  <PosterTitle>{poster.title_ko}</PosterTitle>
                  <PosterVenue>장소: {poster.venue}</PosterVenue>
                  <PosterTime>시간: {poster.date}</PosterTime>
                </PosterInfo>
              </AnimationArea>
            ) : (
              <>
                <Poster id={index} />
                <PosterInfo>
                  <PosterTitle>{poster.title_ko}</PosterTitle>
                  <PosterVenue>장소: {poster.venue}</PosterVenue>
                  <PosterTime>시간: {formatDateRange(poster.date)}</PosterTime>
                </PosterInfo>
              </>
            )}
          </PosterContainer>
        );
      })}
    </PosterListContainer>
  );
};

export default PosterList;