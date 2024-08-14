import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import posters from "../components/poster/poster.json";
import getRandomInt from "../util/getRandomInt";

const storage = createJSONStorage(() => sessionStorage);
// 초 단위 타이머 상태
export const secondCountAtom = atomWithStorage("second", 0, storage);
// export const readSecondCount = atom((get) => get(secondCountAtom));
// export const writeSecondCount = atom(null, (get, set, update) =>
//   set(secondCountAtom, update(get(secondCountAtom)))
// );

// 분 단위 타이머 상태
export const minuteCountAtom = atomWithStorage("minute", 0, storage);
// export const readMinuteCount = atom((get) => get(minuteCountAtom));
// export const writeMinuteCount = atom(null, (get, set, update) =>
//   set(minuteCountAtom, update(get(minuteCountAtom)))
// );
// const someAtom = atomWithStorage('some-key', someInitialValue, storage)

//난이도 상태 (low, middle, high)
export const levelAtom = atomWithStorage("level", "low", storage);

//단계 별 상태 (0,1,2,3,4,5)
export const progressAtom = atom(0);

// 포스터 json 데이터
export const postersAtom = atom(posters);

// 선택된 포스터의 id 상태(고급, 실전만 해당)
export const selectedPosterAtom = atomWithStorage("posterId", 0, storage);

//카드번호 정답
export const cardAnswerAtom = atom([]);

//보라색 좌석 위치 상태
export const allowedSeatAtom = atomWithStorage(
  "allowedSeat",
  {
    gridIndex: getRandomInt(0, 3),
    row: getRandomInt(0, 4),
    col: getRandomInt(0, 4)
  },
  storage
);

//좌석 선택 여부 상태
export const isSeatSelectedAtom = atomWithStorage(
  "isSeatSelected",
  false,
  storage
);

//구역 선택 여부 상태
export const isSectionSelectedAtom = atomWithStorage(
  "isSectionSelected",
  false,
  storage
);

//구역 선택
export const allowedSectionAtom = atomWithStorage(
  "allowedSection",
  getRandomInt(1, 4),
  storage
);

//사용자 이름
export const userNameAtom = atomWithStorage("userName", "");

//연습모드 완료 횟수
export const practiceCountAtom = atomWithStorage("practiceCount", 0);

//좌석 매수 개수
export const seatCountAtom = atomWithStorage("seatCount", 0, storage);

//좌석 등급, 가격
export const seatInfoAtom = atomWithStorage(
  "seatInfo",
  {
    grade: "",
    price: 0,
    date: ""
  },
  storage
);

//단계별 텍스트
export const stepTextNumberAtom = atomWithStorage("stepTextNumber", 0, storage);
