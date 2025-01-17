import styled from "styled-components";
import Input from "../input/Input";
import { InputContainer, InputField, Label } from "../input/InputStyle";
import AnimationArea from "../Animation";
import { FormWrap } from "./FormStyle";
import { useAtomValue } from "jotai";
import { levelAtom } from "../../store/atom";
import ErrorText from "../errorText/ErrorText";

//에러텍스트 + 컨텐츠
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const CardInputFied = styled(InputField)`
  width: 40px;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CardForm = ({ focusNum, handleChange, hasErrorArray }) => {
  const level = useAtomValue(levelAtom);
  const cardInputField = ["cardNum1", "cardNum2", "cardNum3", "cardNum4"];
  const hasError = hasErrorArray.length !== 0;

  return (
    <Wrap>
      {hasError && <ErrorText text="카드 정보를 정확하게 입력해 주세요" />}
      <FormWrap>
        {/*카드 번호 */}
        <AnimationArea $focus={level === "low" && focusNum == 0}>
          <InputContainer>
            <Label>카드 번호</Label>
            {cardInputField.map((field, index) => (
              <InputWrap key={index}>
                <CardInputFied
                  name={field}
                  type="number"
                  onChange={handleChange}
                  $hasError={hasErrorArray.includes(field)}
                />
                {index !== 3 && <div>-</div>}
              </InputWrap>
            ))}
          </InputContainer>
        </AnimationArea>
        <Input
          $focus={level === "low" && focusNum == 1}
          text="카드 비밀번호"
          name="cardPassword"
          onChange={handleChange}
          isNumber={true}
          $hasError={hasErrorArray.includes("cardPassword")}
        />
        <Input
          $focus={level === "low" && focusNum == 2}
          text="cvc 번호"
          name="cvc"
          onChange={handleChange}
          isNumber={true}
          $hasError={hasErrorArray.includes("cvc")}
        />
      </FormWrap>
    </Wrap>
  );
};

export default CardForm;
