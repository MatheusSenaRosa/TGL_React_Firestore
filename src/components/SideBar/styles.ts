import styled, { css } from "styled-components";
import { rem, rgba } from "polished";

import { fadeIn, slideIn, slideOut, fadeOut } from "@animations";

export const Overlay = styled.div<{ isClosing: boolean }>`
  ${({ isClosing }) => css`
    background-color: ${rgba("#000", 0.5)};
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 1;

    animation: ${isClosing ? fadeOut : fadeIn} 0.6s forwards;
  `}
`;

export const ActionButtons = styled.div`
  ${({ theme }) => css`
    margin: ${rem(21)} ${rem(9)} 0 ${rem(9)};
    margin-top: ${rem(21)};

    display: flex;
    justify-content: space-between;

    button {
      color: ${theme.colors.logo.primary};
      background-color: transparent;
      border: none;
    }

    button:nth-child(2) {
      color: ${theme.colors.error};
    }
  `}
`;

export const Aside = styled.aside<{ isClosing: boolean }>`
  ${({ theme, isClosing }) => css`
    width: ${rem(200)};
    height: 100vh;
    position: fixed;
    z-index: 2;

    background-color: ${theme.colors.background};
    border-right: ${rem(2)} solid ${theme.colors.primary};
    border-radius: 0 ${rem(20)} ${rem(20)} 0;

    animation: ${isClosing ? slideOut : slideIn} 0.6s forwards;
  `}
`;

export const Nav = styled.nav`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: ${rem(10)};

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;

      gap: ${rem(15)};
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: ${theme.colors.logo.primary};
      font-size: ${rem(20)};
      font-weight: bold;

      display: flex;

      gap: ${rem(10)};
    }
  `}
`;