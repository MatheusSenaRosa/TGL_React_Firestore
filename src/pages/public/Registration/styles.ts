import { rem } from "polished";
import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;
  align-items: center;
  flex: 1;

  justify-content: space-evenly;

  @media (max-width: ${rem(768)}) {
    flex-direction: column;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
  display: flex;
`;

export const Input = styled.input`
  ${({ theme }) => css`
    height: ${rem(80)};
    width: 100%;
    padding-left: ${rem(30)};
    background-color: transparent;

    border: none;
    border-bottom: ${rem(2)} solid ${theme.colors.border.primary};

    color: ${theme.colors.text.placeholder};
    font-size: ${rem(17)};
    margin-bottom: ${rem(2)};

    font-weight: bold;

    &&::placeholder {
      color: ${theme.colors.text.placeholder};
      font-size: ${rem(17)};
      font-weight: bold;
    }
  `}
`;

export const EyeButton = styled.button`
  ${({ theme }) => css`
    cursor: pointer;
    background-color: transparent;
    color: ${theme.colors.text.placeholder};
    border: none;
    position: absolute;
    right: 3%;
    align-self: center;

    &:hover {
      color: ${theme.colors.text.primary};
    }
  `}
`;
