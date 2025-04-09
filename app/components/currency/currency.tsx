import { useMemo } from "react";
import { currency } from "~/utilities/currency";

const Currency = ({
  amount,
  className
}: {
  amount: number,
  className?: string
}) => {
  const formatted = useMemo(() => {
    // TODO call formatting function
    return currency(amount);
  }, [amount]);

  return <span className={ className }>{ formatted }</span>;
};

export default Currency;