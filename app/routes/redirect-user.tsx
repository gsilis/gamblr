import { use, useEffect, useTransition } from "react";
import { useNavigate } from "react-router";
import { CityContext } from "~/contexts/city-context";

export default function RedirectUser() {
  const cityContext = use(CityContext);
  const navigate = useNavigate();

  if (!cityContext) {
    throw new Error('Could not load profile context');
  }

  let goto = '';

  if (cityContext.city) {
    goto = '/play';
  } else {
    goto = '/city-picker';
  }

  if (goto) {
    useEffect(() => {
      navigate(goto);
    }, [goto, navigate]);
  }
}