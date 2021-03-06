import { ArrowLeft } from "phosphor-react";

import { Logo, PublicScreen } from "@components";

import * as S from "./styles";

export function NotFound() {
  return (
    <PublicScreen>
      <S.Container>
        <Logo />
        <div>
          <S.NotFoundTitle>Page not found</S.NotFoundTitle>

          <S.HomeLink to="/" replace>
            <ArrowLeft weight="bold" />
            Home
          </S.HomeLink>
        </div>
      </S.Container>
    </PublicScreen>
  );
}
