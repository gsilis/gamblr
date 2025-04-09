import "./list-heading.css";

const ListHeading = ({
  children
}: {
  children: any
}) => {
  return <div className="list-heading">
    { children }
  </div>;
};

export default ListHeading;