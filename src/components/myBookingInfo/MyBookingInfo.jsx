import styled from "styled-components";
import {
  allowedSeatAtom,
  optionAtom,
  postersAtom,
  seatCountAtom,
  seatInfoAtom,
  selectedPosterAtom
} from "../../store/atom";
import { useAtom, useAtomValue } from "jotai";

const Container = styled.div`
  border-radius: 8px;
  width: 400px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  font-family: "pretendardB";
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const InfoItem = styled.div`
  display: flex;
  margin: 10px 0;
`;
const InfoTitle = styled.span`
  color: var(--text-color);
  font-family: "pretendardB";
  font-size: 16px;
  flex: 1;
`;
const InfoText = styled.div`
  font-family: "pretendardB";
  font-size: 16px;
`;
const TotalAmount = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid var(--fill-color);
  padding: 20px 0;
`;

const AmountTitle = styled.div`
  font-family: pretendardB;
`;
const AmountContent = styled.div`
  font-family: pretendardB;
  font-size: 28px;
`;

const MyBookingInfo = () => {
  const allowedSeat = useAtomValue(allowedSeatAtom);
  const seatCount = useAtomValue(seatCountAtom);
  const seatInfo = useAtomValue(seatInfoAtom);
  const option = useAtomValue(optionAtom);

  const Info = [
    // 공연 날짜 및 시간
    { title: "일시", content: seatInfo.date },
    {
      title: "선택좌석(1석)",
      content: `${allowedSeat.row + 1}열-${allowedSeat.col + 1}`
    },
    { title: "티켓금액", price: `${seatCount ? seatInfo.price : 0}` },
    { title: "수수료", price: `${seatCount ? seatInfo.fee : 0}` },
    { title: "배송비", price: `${option.includes("배송") ? 3200 : 0}` },
    { title: "쿠폰할인", price: 0 }
  ];

  const totalAmount = Info.reduce((acc, currentValue) => {
    if (currentValue.price !== undefined) {
      return acc + Number(currentValue.price);
    }
    return acc;
  }, 0);

  return (
    <Container>
      <Title>내 예매 정보</Title>
      <InfoContainer>
        {Info.map((item, index) => (
          <InfoItem key={index}>
            <InfoTitle>{item.title}</InfoTitle>
            <InfoText>
              {item.price != undefined ? item.price + "원" : item.content}
            </InfoText>
          </InfoItem>
        ))}
      </InfoContainer>
      <TotalAmount>
        <AmountTitle>총 결제금액</AmountTitle>
        <AmountContent>{totalAmount.toLocaleString()}원</AmountContent>
      </TotalAmount>
    </Container>
  );
};

export default MyBookingInfo;
