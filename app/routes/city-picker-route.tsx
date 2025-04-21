import Picker, { type PickerOption } from '~/components/picker/picker';
import Cities from '~/constants/city';
import { type City } from '~/constants/city';
import { use, useCallback } from 'react';
import { CityContext } from '~/contexts/city-context';
import { useNavigate } from 'react-router';
import { AccountContext } from '~/contexts/account-context';

const options = Cities.map(city => {
  return {
    title: city,
    available: true,
    value: city,
  };
});

export default function CityPickerRoute() {
  const cityContext = use(CityContext);
  const accountContext = use(AccountContext);
  const navigate = useNavigate();

  if (!cityContext) {
    throw new Error('Could not load context.');
  }

  const onSelect = useCallback((option: PickerOption) => {
    const city = option.value as City;
    cityContext.travel(city);
    accountContext.deposit(1000);
    navigate('/play');
  }, [cityContext.travel, accountContext.withdraw, navigate]);

  return <>
    <Picker
      options={ options }
      prompt={ 'Where would you like to start?' }
      confirm={ 'Continue' }
      onSelect={ onSelect }
    />
  </>;
}