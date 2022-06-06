import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Loading, PrivatedScreen, SelectGameButton } from "@components";
import { IFormattedRecentGames, IRecentGames } from "@interfaces";
import { auth, db } from "@services";
import { formatRecentGames } from "@utils";

import * as S from "./styles";

export function Home() {
  const [recentGames, setRecentGames] = useState<IFormattedRecentGames[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  // const navigate = useNavigate();
  const cartCollection = collection(db, "cart");

  useEffect(() => {
    const getData = async () => {
      if (auth.currentUser?.uid) {
        try {
          const { cart } = (
            await getDoc(doc(cartCollection, auth.currentUser.uid))
          ).data() as { cart: IRecentGames[] };

          setRecentGames(formatRecentGames(cart));
        } catch {
          toast.error("An error has occurred.");
        } finally {
          setIsFetching(false);
        }
      }
    };
    getData();
  }, [auth.currentUser]);

  if (isFetching) {
    return (
      <PrivatedScreen
        navButtons={[
          { text: "New bet", path: "/new-bet", isHeader: false },
          { text: "Account", path: "/account", isHeader: true },
        ]}
      >
        <S.Container isLoading>
          <Loading size={80} />
        </S.Container>
      </PrivatedScreen>
    );
  }

  return (
    <PrivatedScreen
      navButtons={[
        { text: "New bet", path: "/new-bet", isHeader: false },
        { text: "Account", path: "/account", isHeader: true },
      ]}
    >
      <S.Container>
        <S.HeaderWrapper>
          <section>
            <h2>RECENT GAMES</h2>
            <p>Filters</p>
            <div>
              {recentGames.map((item) => (
                <SelectGameButton
                  key={item.name}
                  color={item.color}
                  isActive={false}
                  text={item.name}
                  onClick={() => null}
                />
              ))}
            </div>
          </section>

          <div>New Bet</div>
        </S.HeaderWrapper>
      </S.Container>
    </PrivatedScreen>
  );
}
