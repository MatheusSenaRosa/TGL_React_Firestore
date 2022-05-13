import styled, { css } from "styled-components";
import { rem } from "polished";
import { spinLoading } from "@animations";

export const Container = styled.main<{ size: number }>`
  ${({ theme, size }) => css`
    width: ${rem(size)};
    height: ${rem(size)};
    border: ${rem(10)} solid ${theme.colors.footer.border};
    border-top-color: ${theme.colors.primary};
    border-radius: 50%;

    animation: ${spinLoading} 1s ease-in-out infinite;
  `}
`;
